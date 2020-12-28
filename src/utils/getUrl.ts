export const getUrl = (url: string) => {
  const trim = url.split(' ').filter((res) => res.includes('src='))[0]
  const final = trim.substring(trim.indexOf('=') + 1)
  const urls = final.substring(final.indexOf('"') + 1, final.lastIndexOf('"'))
  return urls
}
