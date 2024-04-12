export function CheckEmail(data: string) {
  const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return !reg.test(data);
}

export function CheckPassword(data: string) {
  const reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,15}$/; // 验证密码 6至15位的字母+数字
  return !reg.test(data);
}
