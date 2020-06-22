// 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
// 示例 1: 输入: "aba"
// 输出: True
// 示例 2:
// 输入: "abca"
// 输出: True
// 解释: 你可以删除c字符。
// 注意: 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。

/**
 * 这里依次写了三个函数validPalindrome1，validPalindrome2，validPalindrome3，其中validPalindrome1是错误的示范。
 */

/**
 *validPalindrome1,是在实现过程中的一个错误的示范，一开始想在一个while中完成。
 *但是这里跳指针如果左指针跳之后检测不回文，本应右指针在左指针跳之前的基础上跳，但是没有缓存指针就直接跳了。某些情况会出现问题
 *
 *例如: str = 'abcddcbca' 应该返回true,却返回false
 */
const validPalindrome1 = (str) => {
  const len = str.length;
  // 左指针
  let j = 0;
  // 右指针
  let k = len - 1;
  // 跳过的次数，删除可以视作跳过操作，要求最多删除一个字符，所以flag不能 > 1.
  let flag = 0;
  const check = function (j, k) {
    while (j < k) {
      if (str[j] === str[k]) {
        // 如果相等则继续检查
        j++;
        k--;
      } else if (flag < 1) {
        // 左指针跳
        if (j + 1 !== k && str[j + 1] === str[k]) {
          flag += 1;
          j += 2;
          k--;
        } else if (j !== k - 1 && str[j] === str[k - 1]) {
          // 右指针跳
          flag += 1;
          j++;
          k -= 2;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  };
  return check(j, k);
};

/**
 *validPalindrome2,参数按值传递，所以将当前的指针通过参数传递给子函数数去判断，两个跳指针的子函数（左指针，右指针），可以互不影响。
 */

const validPalindrome2 = (str) => {
  const len = str.length;
  // 左指针
  let j = 0;
  // 右指针
  let k = len - 1;
  // 这里传入的指针是已经跳过一次的指针，所以如果里面有不回文，则直接返回false.
  function checkNext(j, k) {
    while (j < k) {
      if (str[j] === str[k]) {
        j++;
        k--;
      } else {
        return false;
      }
    }
    return true;
  }
  const check = function (j, k) {
    while (str[j] === str[k]) {
      // 这里如果从一开始到最后都是两两相等，像这种情况'abcba'，在str[2]也就是'c'的位置j===k，那么是回文。
      // j > k的情况是 'aaccbb'，这个时候，j到最后会变成str[3],k到最后会变成str[2]，它们都是c，也都是回文。
      // 其实这里两个判断都可以放到checkNext中去，但为了方便理解，就放到这里。
      if (j === k || j > k) {
        return true;
      }
      j++;
      k--;
    }
    // 如果遇到不匹配了，则退出上面while循环，到这里。
    // 左指针右移一位，传入checkNext中继续判断，checkNext如果还有没匹配上的，就去下一个判断，让右指针左移一位。这里指针值通过参数传递给另一个函数。相当于缓存了当前的指针值。
    // 两个子函数有一个为真，说明就可以通过删除一个字符成为回文字符串
    return checkNext(j + 1, k) || checkNext(j, k - 1);
  };
  return check(j, k);
};

/**
 *validPalindrome3,如果上述方法不好理解，那可以看这个。
 */
const validPalindrome3 = function (s) {
  // 缓存字符串的长度
  const len = s.length;

  // i、j分别为左右指针
  let i = 0,
    j = len - 1;

  // 当左右指针均满足对称时，一起向中间前进
  while (i < j && s[i] === s[j]) {
    i++;
    j--;
  }

  // 尝试判断跳过左指针元素后字符串是否回文
  if (isPalindrome(i + 1, j)) {
    return true;
  }
  // 尝试判断跳过右指针元素后字符串是否回文
  if (isPalindrome(i, j - 1)) {
    return true;
  }

  // 工具方法，用于判断字符串是否回文
  function isPalindrome(st, ed) {
    while (st < ed) {
      if (s[st] !== s[ed]) {
        return false;
      }
      st++;
      ed--;
    }
    return true;
  }

  // 默认返回 false
  return false;
};
