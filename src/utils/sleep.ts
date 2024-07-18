export const sleep = (interval: number) => {
  return new Promise(res => setTimeout(() => res(true), interval));
};
