// 真题描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

// 示例: 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]

const sumTwo = (arr, target) => {
  const map = new Map();
  const result = [];
  arr.forEach((num, index) => {
    map.set(num, index);
    const key = target - num;
    if (map.get(key) !== undefined) {
      result.push([map.get(key), index]);
    }
  });
  return result;
};

sumTwo([2, 7, 11, 15], 9);
