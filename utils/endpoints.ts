export const apiURI = 'http://localhost:1337/api'
export const aboutURI = '/about'

const getEndpoint = async (endpoint: string) => {
  let url = apiURI + endpoint
  const response = await fetch(url, {
    cache: 'no-cache'
  })
  return (await response.json()).data.attributes as unknown
}

export const getAbout = async () => {
  const about = await getEndpoint(aboutURI)
  return about as { Text1: string; Title: string }
}
