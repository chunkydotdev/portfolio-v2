export const sleep = async (s: number) => {
  return new Promise(res => {
    setTimeout(res, s * 1000)
  })
}

export const getRandomNumber = (max: number) => Math.floor(Math.random() * max)
