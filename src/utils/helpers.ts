export const isIframe = () => window.parent !== window.self

export const getHashValue = (name: string) => {
  const hashes = new Proxy(new URLSearchParams(window.location.hash.replace('#', '')), {
    get: (searchParams, prop: string) => searchParams.get(prop),
  })
  // @ts-ignore
  return decodeURIComponent(hashes[name] || '')
}

export const getUrlToJoin = (roomCode: string) => (isIframe() ? window.document.referrer : window.location.origin) + '/#r=R' + roomCode
