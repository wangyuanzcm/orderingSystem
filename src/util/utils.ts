/**
 * 校验电话号码格式
 */
export const PhoneNumberValidation = (
  _rule: any,
  value: string,
  callback: (arg0?: string | undefined) => void
) => {
  const pattern = /^1\d{10}$/;
  if (!value) {
    callback("请输入手机号码");
  } else if (!pattern.test(value)) {
    callback("请输入正确的手机号码");
  } else {
    callback();
  }
};
