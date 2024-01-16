import type { TableColumn } from '@/components/core/dynamic-table';
import type { UpdateReceiverDto } from '@/service';
import PcasCode from '@/utils/pcas-code';

export type TableListItem = UpdateReceiverDto;
export type TableColumnItem = TableColumn<TableListItem>;

export const extendAreaCode = (areaCode) =>
  areaCode ? [areaCode.slice(0, 2), areaCode.slice(0, 4), areaCode] : [];

export const collapseAreaCode = (areaCode) =>
  areaCode.length > 0 ? areaCode[areaCode.length - 1] : '';

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
      defaultValue: '',
      required: false,
    },
  },
  {
    title: '所在地区',
    dataIndex: 'area_code',
    align: 'center',
    sorter: true,
    resizable: true,
    formItemProps: {
      defaultValue: [],
      required: false,
      component: 'Cascader',
      componentProps: () => ({
        filterOption: false,
        fieldNames: { label: 'name', value: 'code' },
        options: PcasCode,
        // placeholder: '请选择所在地区',
        onChange(value: string) {
          console.log('onChange', value);
          return collapseAreaCode(value);
        },
      }),
    },
    customRender: ({ record }) => {
      const { province, city, area } = record;
      return `${province}-${city}-${area}`;
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
];
