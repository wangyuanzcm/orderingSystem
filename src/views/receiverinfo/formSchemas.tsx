import type { FormSchema } from '@/components/core/schema-form/';
import type { CreateReceiverDto } from '@/service';
import PcasCode from '@/utils/pcas-code';

import { PhoneNumberValidation, EmailValidation } from '@/utils/validate';

export const useReceiverSchemas = (): FormSchema<CreateReceiverDto>[] => [
  {
    field: 'name',
    component: 'Input',
    label: '收件人姓名',
    defaultValue: '',
    rules: [{ required: true, type: 'string', message: '请输入收件人姓名' }],
  },
  {
    field: 'area_code',
    component: 'Cascader',
    label: '所在地区',
    rules: [{ required: true, type: 'array', message: '请选择权限' }],
    componentProps: {
      fieldNames: { label: 'name', value: 'code' },
      options: PcasCode,
      placeholder: '请选择所在地区',
    },
  },
  {
    field: 'detail',
    component: 'InputTextArea',
    label: '详细地址',
    defaultValue: '',
    rules: [{ required: true, type: 'string', message: '请输入收件人详细地址' }],
  },
  {
    field: 'phone',
    component: 'Input',
    label: '手机号码',
    defaultValue: '',
    rules: [
      { required: true, message: '请输入收件人手机号码' },
      { validator: PhoneNumberValidation, trigger: 'change' },
    ],
  },
  {
    field: 'email',
    component: 'Input',
    label: '邮箱地址',
    defaultValue: '',
    rules: [{ validator: EmailValidation, trigger: 'change' }],
  },
  {
    field: 'nick_name',
    component: 'Input',
    label: '昵称',
    defaultValue: '',
    componentProps: {
      placeholder: '如果不填，自动填充，默认为城市+收件人姓名+手机后四位,',
    },
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
    defaultValue: '',
    componentProps: {
      placeholder: '请输入备注内容',
    },
  },
  // {
  //   field: 'province',
  //   component: 'Input',
  //   label: '省份',
  //   defaultValue: '',
  //   componentProps: {
  //     hidden: true,
  //     placeholder: '自动填充',
  //   },
  // },
  // {
  //   field: 'city',
  //   component: 'Input',
  //   label: '城市',
  //   defaultValue: '',
  //   componentProps: {
  //     hidden: true,
  //     placeholder: '自动填充',
  //   },
  // },
  // {
  //   field: 'area',
  //   component: 'Input',
  //   label: '市县',
  //   defaultValue: '',
  //   componentProps: {
  //     hidden: true,
  //     placeholder: '自动填充',
  //   },
  // },
  // {
  //   field: 'postal_code',
  //   component: 'Input',
  //   label: '邮编',
  //   defaultValue: '',
  //   componentProps: {
  //     hidden: true,
  //     placeholder: '自动填充',
  //   },
  // },
];
