/** 生成一个随机 id */
export const randomId = () =>
  Number(
    Math.random()
      .toString()
      .substr(3, length) + Date.now()
  ).toString(36);
