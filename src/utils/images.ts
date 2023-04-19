// ------------------- IMAGE PROXY
export const getImageProxyUrl = (
  imgProxyUrl: string,
  src: string,
  width = 980
) => {
  const urlEncoded = Buffer.from(src, 'base64');
  const urlProxyEncoded = Buffer.from(imgProxyUrl, 'base64');

  const url = `${imgProxyUrl}/${urlProxyEncoded}/rs:fill:${width}::0/${urlEncoded}.webp`;
  return url;
};
