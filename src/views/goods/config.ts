// 商品编辑schema
export const GoodsEditDefaultSchema = {
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
      'x-pattern': '{{viewPattern}}',
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
                'x-pattern': '{{viewPattern}}',
                'x-display': '{{Visible}}',
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
                'x-pattern': '{{viewPattern}}',
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
                'x-pattern': '{{viewPattern}}',
              },
            },
            'x-index': 1,
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
          'x-pattern': '{{viewPattern}}',
          'x-display': '{{Visible}}',
        },
      },
    },
  },
  'x-designable-id': '6q156kbks3m',
};

// 商品编辑schema
export const GoodsEditDefineSchema = {
  code_hs: {
    type: 'string',
    title: '商品编号',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-validator': [],
    'x-component-props': {},
    'x-decorator-props': {},
    'x-designable-id': '8r86z5hra3o',
    'x-index': 2,
    name: 'code_hs',
    'x-pattern': '{{viewPattern}}',
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
    'x-index': 3,
    name: 'image_list',
    'x-pattern': '{{viewPattern}}',
  },
  description: {
    type: 'string',
    title: '商品说明',
    'x-decorator': 'FormItem',
    'x-component': 'Input.TextArea',
    'x-validator': [],
    'x-component-props': {},
    'x-decorator-props': {},
    'x-designable-id': 'vyu1lu31nbk',
    'x-index': 4,
    name: 'description',
    'x-pattern': '{{viewPattern}}',
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
    'x-pattern': '{{viewPattern}}',
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
    'x-pattern': '{{viewPattern}}',
  },
};

// 商品购买固定schema
export const GoodsBuyDefaultSchema = {
  type: 'object',
  properties: {
    goods_type: {
      title: '商品类型',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-validator': [],
      'x-component-props': {
        style: {
          width: '300px',
        },
      },
      'x-decorator-props': {},
      name: 'goods_type',
      'x-designable-id': 'zxqpxduv59l',
      'x-index': 0,
      'x-reactions': ['{{useAsyncDataSource(loadData)}}'],
      required: true,
      'x-pattern': '{{viewPattern}}',
    },
    goods_price: {
      type: 'string',
      title: '商品价格(单位:元）',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-validator': [],
      'x-component-props': {
        addonAfter: '元',
      },
      'x-decorator-props': {},
      'x-designable-id': '8varz6rxr2q',
      'x-index': 1,
      name: 'goods_price',
      'x-pattern': 'readPretty',
    },
    goods_count: {
      type: 'number',
      title: '购买数量',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-validator': 'integer',
      'x-component-props': {},
      'x-decorator-props': {},
      name: 'goods_count',
      'x-designable-id': 'w4yqp7gc0ks',
      'x-index': 2,
      required: true,
      'x-pattern': '{{viewPattern}}',
    },
    receiver_id: {
      title: '收件人信息',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-validator': [],
      'x-component-props': {
        showSearch: true,
        filterOption: false,
        onSearch: '{{handleReceiverInfoSearch}}',
        style: {
          width: '100%',
        },
      },
      'x-decorator-props': {},
      'x-designable-id': '0j5xazu4egd',
      'x-index': 3,
      name: 'receiver_id',
      required: true,
      'x-pattern': '{{viewPattern}}',
    },
    coupon: {
      title: '优惠券',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-validator': [],
      'x-component-props': {
        mode: 'multiple',
        style: {
          width: '300px',
        },
      },
      'x-decorator-props': {},
      'x-reactions': ['{{getCouponOptions()}}'],

      'x-designable-id': 'uas13op066m',
      'x-index': 4,
      name: 'coupon',
      'x-pattern': '{{viewPattern}}',
    },
  },
  'x-designable-id': '6q156kbks3m',
};

// 商品购买自定义schema
export const GoodsBuyDefineSchema = {};

export const CouponOptions = [
  {
    children: [],
    label: '50元券',
    value: '-50',
  },
  {
    children: [],
    label: '30元券',
    value: '-30',
  },
  {
    children: [],
    label: '97折券',
    value: '*0.97',
  },
];
