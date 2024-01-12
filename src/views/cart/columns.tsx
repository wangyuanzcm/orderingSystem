import type { TableColumn } from '@/components/core/dynamic-table';
import type { UpdateReceiverDto } from '@/service';

export type TableListItem = UpdateReceiverDto;
export type TableColumnItem = TableColumn<TableListItem>;

export const extendAreaCode = (areaCode) =>
  areaCode ? [areaCode.slice(0, 2), areaCode.slice(0, 4), areaCode] : [];

export const collapseAreaCode = (areaCode) =>
  areaCode.length > 0 ? areaCode[areaCode.length - 1] : '';

export const baseColumns = [
  // {
  //   title: '商品名称',
  //   dataIndex: 'goods_name',
  //   align: 'center',
  //   sorter: true,
  //   resizable: true,
  //   hideInSearch: true,
  //   formItemProps: {
  //     defaultValue: '',
  //     required: false,
  //   },
  // },
  // {
  //   title: '商品价格',
  //   dataIndex: 'goods_price',
  //   align: 'center',
  //   sorter: true,
  //   resizable: true,
  //   hideInSearch: true,
  //   formItemProps: {
  //     defaultValue: '',
  //     required: false,
  //   },
  // },
  // {
  //   title: '商品数量',
  //   dataIndex: 'goods_count',
  //   hideInSearch: true,
  //   align: 'center',
  //   sorter: true,
  //   resizable: true,
  //   formItemProps: {
  //     defaultValue: '',
  //     required: false,
  //   },
  // },
];
