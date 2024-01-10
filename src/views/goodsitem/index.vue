<template>
  <Form :form="form" v-bind="formLayout">
    <SchemaField :schema="schema" />
    <FormButtonGroup align-form-item>
      <Reset validate force-clear :on-reset-validate-success="onReset">重置</Reset>
      <Submit @submit="onSubmit">提交</Submit>
    </FormButtonGroup>
  </Form>
</template>

<script lang="tsx" setup>
  import { createForm } from '@formily/core';
  import { createSchemaField } from '@formily/vue';
  import {
    Form,
    FormItem,
    Upload,
    Input,
    Radio,
    InputNumber,
    Submit,
    FormButtonGroup,
  } from '@formily/antdv';
  // const token = ref('');

  // const getToken = async () => {
  //   const data = await services.netDiskManageControllerToken();
  //   console.log(data, 'data===');
  //   token.value = data.data.token;
  // };
  // onMounted(() => {
  //   // 在组件挂载后执行的操作
  //   console.log('Component mounted');
  //   getToken();
  //   // 可以执行其他操作，如发送请求、订阅事件等
  // });

  const schema = {
    type: 'object',
    properties: {
      thl1aattyh2: {
        type: 'string',
        title: '商品名称',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        required: true,
        'x-designable-id': 'thl1aattyh2',
        'x-index': 0,
      },
      '8r86z5hra3o': {
        type: 'string',
        title: '商品编号',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        required: true,
        'x-designable-id': '8r86z5hra3o',
        'x-index': 1,
      },
      vyu1lu31nbk: {
        type: 'string',
        title: '商品说明',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        required: true,
        'x-designable-id': 'vyu1lu31nbk',
        'x-index': 2,
      },
      pt8v1yru72g: {
        type: 'string | number',
        title: '商品类型',
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        enum: [
          {
            children: [],
            label: '500瓶以下',
            value: 1,
          },
          {
            children: [],
            label: '500到1000瓶',
            value: 2,
          },
          {
            children: [],
            label: '1000瓶以上',
            value: '3',
          },
        ],
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        required: true,
        'x-designable-id': 'pt8v1yru72g',
        'x-index': 3,
      },
      '9nqh6olnwg5': {
        type: 'number',
        title: '商品价格',
        'x-decorator': 'FormItem',
        'x-component': 'InputNumber',
        'x-validator': 'number',
        'x-component-props': {
          decimalSeparator: '2',
        },
        'x-decorator-props': {},
        required: true,
        'x-designable-id': '9nqh6olnwg5',
        'x-index': 4,
      },
      '4v93n2m4hd2': {
        type: 'string | number',
        title: '是否为定制商品',
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        enum: [
          {
            children: [],
            label: '是',
            value: 1,
          },
          {
            children: [],
            label: '否',
            value: 2,
          },
        ],
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        required: true,
        'x-designable-id': '4v93n2m4hd2',
        'x-index': 5,
      },
      ykpi7u2xtwl: {
        type: 'string',
        title: '备注',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        'x-designable-id': 'ykpi7u2xtwl',
        'x-index': 6,
      },
    },
    'x-designable-id': '6q156kbks3m',
  };
  const formLayout = {
    labelCol: 6,
    wrapperCol: 12,
    feedbackLayout: 'terse',
    style: {
      display: 'block',
    },
  };
  const form = createForm();
  const { SchemaField } = createSchemaField({
    components: {
      Upload,
      Input,
      InputNumber,
      Radio,
      FormItem,
    },
  });

  const onSubmit = (value) => {
    console.log(value);
  };
  const onReset = (value) => {
    console.log(value);
  };
</script>
