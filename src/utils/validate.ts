/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
/**
 * 校验电话号码格式
 */
export const PhoneNumberValidation = (
  _rule: any,
  value: string,
  callback: (arg0?: string | undefined) => void,
) => {
  const pattern = /^1\d{10}$/;
  if (!pattern.test(value)) {
    callback('请输入正确的手机号码');
  } else {
    callback();
  }
};
/**
 * 校验邮箱格式
 */
export const EmailValidation = (
  _rule: any,
  value: string,
  callback: (arg0?: string | undefined) => void,
) => {
  const pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!value) {
    callback();
    return;
  }
  if (!pattern.test(value)) {
    callback('请输入正确的邮箱地址');
  } else {
    callback();
  }
};
