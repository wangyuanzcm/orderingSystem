<template>
  <Form :form="form" v-bind="formLayout">
    <SchemaField :schema="schema" />
    <FormButtonGroup align-form-item align="center">
      <a-space size="small">
        <Reset>重置</Reset>
        <Submit @submit="onSubmit">提交</Submit>
      </a-space>
    </FormButtonGroup>
  </Form>
</template>

<script lang="tsx" setup>
  import { createForm } from '@formily/core';
  import { createSchemaField } from '@formily/vue';
  import {
    Form,
    FormItem,
    Input,
    Radio,
    InputNumber as NumberPicker,
    Submit,
    Reset,
    FormButtonGroup,
    ArrayItems,
  } from '@formily/antdv';
  import { services } from '@/utils/request';
  import { ImageUpload as Upload } from '@/components/business/image-upload';

  const schema = {
    type: 'object',
    properties: {
      title: {
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
        name: 'title',
      },
      code_hs: {
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
        name: 'code_hs',
      },
      image_list: {
        type: 'Array<object>',
        title: '商品图片',
        'x-decorator': 'FormItem',
        'x-component': 'Upload',
        'x-component-props': {
          textContent: '上传图片',
          listType: 'picture-card',
          accept: 'png',
        },
        'x-validator': [],
        'x-decorator-props': {},
        required: true,
        'x-designable-id': '0qlktipeqtg',
        'x-index': 2,
        name: 'image_list',
      },
      description: {
        type: 'string',
        title: '商品说明',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        required: true,
        'x-designable-id': 'vyu1lu31nbk',
        'x-index': 3,
        name: 'description',
      },
      universal: {
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
        name: 'universal',
      },
      remark: {
        type: 'string',
        title: '备注',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        'x-designable-id': 'ykpi7u2xtwl',
        'x-index': 6,
        name: 'remark',
      },
      type_price: {
        type: 'array',
        'x-component': 'ArrayItems',
        'x-decorator': 'FormItem',
        title: '商品类型及价格',
        name: 'type_price',
        'x-designable-id': 'ji1ahmaj0g5',
        items: {
          type: 'object',
          'x-designable-id': 'y16dzg3ao5b',
          properties: {
            space: {
              type: 'void',
              'x-component': 'Space',
              name: 'space',
              'x-designable-id': 'vzulo585p33',
              properties: {
                remove: {
                  type: 'void',
                  'x-decorator': 'FormItem',
                  'x-component': 'ArrayItems.Remove',
                  name: 'remove',
                  'x-designable-id': '27n5ci2169h',
                  'x-index': 4,
                },
                type: {
                  name: 'type',
                  type: 'string',
                  title: '商品类型',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-validator': [],
                  'x-component-props': {},
                  'x-decorator-props': {},
                  required: true,
                  'x-designable-id': 'thl1aattyh2',
                  'x-index': 0,
                },
                price: {
                  name: 'price',
                  type: 'number',
                  title: '商品价格',
                  'x-decorator': 'FormItem',
                  'x-component': 'NumberPicker',
                  'x-validator': 'number',
                  'x-component-props': {},
                  'x-decorator-props': {},
                  required: true,
                  'x-designable-id': '9nqh6olnwg5',
                  'x-index': 1,
                },
              },
              'x-index': 0,
            },
          },
        },
        'x-index': 7,
        properties: {
          add: {
            type: 'void',
            title: '添加条目',
            'x-component': 'ArrayItems.Addition',
            name: 'add',
            'x-designable-id': '8t5asjxtj5a',
            'x-index': 0,
          },
        },
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
      NumberPicker,
      Radio,
      FormItem,
      ArrayItems,
    },
  });

  const onSubmit = async (value) => {
    console.log(value);

    // const { id, ...otherValues } = values;
    // if (id) {
    //   await services.goodsControllerUpdate({
    //     ...otherValues,
    //     id,
    //   });
    // } else {
    await services.goodsControllerAdd({
      ext: value,
    });
    // }
    form.reset();
    // props.dynamicTable.reload();
  };
</script>
