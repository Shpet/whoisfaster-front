export const getTimeInSec = (time: number) => {
  let result = 0

  if (!time) {
    result.toFixed(2)
  }

  result = time / 100

  return result.toFixed(2)
}
