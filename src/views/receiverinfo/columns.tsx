import type { TableColumn } from '@/components/core/dynamic-table';

export type TableListItem = API.MenuListResultItem;
export type TableColumnItem = TableColumn<TableListItem>;

export const extendAreaCode = (areaCode) =>
  areaCode ? [areaCode.slice(0, 2), areaCode.slice(0, 4), areaCode] : [];

export const collapseAreaCode = (areaCode) =>
  areaCode.length > 0 ? areaCode[areaCode.length - 1] : '';

export const getClothesByGender = (gender: number) => {
  if (gender === 1) {
    // 男
    return [
      {
        label: '西装',
        value: 1,
      },
      {
        label: '领带',
        value: 0,
      },
    ];
  } else if (gender === 0) {
    //女
    return [
      {
        label: '裙子',
        value: 1,
      },
      {
        label: '包包',
        value: 0,
      },
    ];
  }
  return [];
};

export const baseColumns: TableColumnItem[] = [
  {
    title: '昵称',
    dataIndex: 'nick_name',
    align: 'center',
    sorter: true,
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
  },
  {
    title: '姓名',
    dataIndex: 'name',
    align: 'center',
    resizable: true,
    formItemProps: {
      component: 'Select',
    },
  },
  {
    title: '所在地区',
    dataIndex: 'area_code',
    align: 'center',
    sorter: true,
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
  },
  {
    title: '地址',
    dataIndex: 'detail',
    hideInSearch: true,

    align: 'center',
    sorter: true,
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
  },
  {
    title: '电话',
    dataIndex: 'phone',
    align: 'center',
    sorter: true,
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    align: 'center',
    sorter: true,
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    align: 'center',
    hideInSearch: true,
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
  },

  // {
  //   title: '价格',
  //   align: 'center',
  //   dataIndex: 'price',
  //   formItemProps: {
  //     component: 'Select',
  //   },
  //   customRender: ({ record }) => `${record.price}元`,
  // },
  // {
  //   title: '状态',
  //   align: 'center',
  //   dataIndex: 'status',
  //   formItemProps: {
  //     component: 'Select',
  //     componentProps: ({ formInstance, schema }) => ({
  //       showSearch: true,
  //       filterOption: false,
  //       request: () => {
  //         return fetchStatusMapData();
  //       },
  //       onSearch: debounce(async (keyword) => {
  //         schema.loading = true;
  //         const newSchema = {
  //           field: 'status',
  //           componentProps: {
  //             options: [] as LabelValueOptions,
  //           },
  //         };
  //         formInstance?.updateSchema([newSchema]);
  //         console.log('onSearch keyword', keyword);
  //         const result = await fetchStatusMapData(keyword).finally(() => (schema.loading = false));
  //         newSchema.componentProps.options = result;
  //         formInstance?.updateSchema([newSchema]);
  //       }, 500),
  //       onChange(value: string) {
  //         console.log('onChange', value);
  //       },
  //     }),
  //   },
  //   customRender: ({ record }) => (
  //     <Tag color={record.status == 1 ? 'red' : 'default'}>
  //       {['已售罄', '热卖中'][record.status]}
  //     </Tag>
  //   ),
  // },
];
