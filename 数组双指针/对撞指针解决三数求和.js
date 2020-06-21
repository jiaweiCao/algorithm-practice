// 真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。
// 示例： 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]

// 涉及双指针问题，数列必须是有序数列，否则没有意义，所以第一步会进行排序。

nums = nums.sort((a, b) => {
  a - b;
});

const threeSum = (arr) => {
  const res = [];
  arr = arr.sort((a, b) => a - b);
  const len = arr.length;
  // 遍历倒数第三个数就足够了，左右指针会遍历后面两个数
  for (let i = 0; i < len - 2; i++) {
    // 左指针
    let j = i + 1;
    // 右指针
    let k = len - 1;
    // 如果遇到重复的数字则跳过
    if (i > 0 && arr[i] === arr[i - 1]) {
      continue;
    }
    // 三数之和
    const threeSumResult = arr[i] + arr[j] + arr[k];
    while (j < k) {
      // 三数之和小于0，左指针前进
      if (threeSumResult < 0) {
        j++;
        // 左指针重复
        while (j < k && arr[j] === arr[j - 1]) {
          j++;
        }
      } else if (threeSumResult > 0) {
        // 三数之和大于0，右指针后退
        k--;
        while (j < k && arr[k] === arr[k + 1]) {
          k--;
        }
      } else {
        // 三数之和等于0的情况下，推入数组
        res.push([arr[i], arr[j], arr[k]]);
        // 左右指针一起前进(因为不可以包含重复)
        j++;
        k++;
        //  若左指针或者右指针重复，则跳过
        while (j < k && arr[j] === arr[j - 1]) {
          j++;
        }
        while (j < k && arr[k] === arr[k + 1]) {
          k--;
        }
      }
    }
    return res;
  }
};
