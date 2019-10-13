export function sleep(timeout: any) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export async function asyncForEach(array: Array<any>, callback: Function) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
