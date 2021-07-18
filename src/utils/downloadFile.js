/**
 * 下载接口返回的文件流
 * @param {*} data 文件流
 * @param {*} type 文件类型
 * @param {*} fileName 下载文件名
 */

export const downloadFile = (
  data,
  type = "vnd.ms-excel", // vnd.ms-excel || zip || ...
  fileName
) => {
  const blob = new Blob([data], { type: `application/${type}` });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download =
    fileName || formatTime(new Date(), "YYYYMMDDHHmmss") + "下载文件";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}