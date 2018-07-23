export const fromObjToLinkParams = (data) =>
  Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
