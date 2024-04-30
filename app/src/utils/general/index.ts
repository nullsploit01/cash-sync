export const generateRandomId = (length = 8) => {
  return Math.floor(Math.random() * Date.now())
    .toString(16)
    .substring(0, length)
}
