import type { TableColumn } from '@/components/core/dynamic-table';
import type { PageSearchOrderInfo, UpdateReceiverDto } from '@/service';

export type TableListItem = PageSearchOrderInfo & { receiverInfo: UpdateReceiverDto };
export type TableColumnItem = TableColumn<TableListItem>;

enum STATUS_MAP {
  PENDINGPAYMENT = 10,
  PENDINGREVIEW = 20,
  WAITFORORDER = 30,
  AWAITINGSHIPMENT = 40,
  SHIPPED = 50,
}
export const statusType = {
  [STATUS_MAP.PENDINGPAYMENT]: '待付款',
  [STATUS_MAP.PENDINGREVIEW]: '待审核',
  [STATUS_MAP.WAITFORORDER]: '待下单',
  [STATUS_MAP.AWAITINGSHIPMENT]: '代发货',
  [STATUS_MAP.SHIPPED]: '已发货',
};
export const baseColumns: TableColumnItem[] = [
  {
    title: '商品名称',
    dataIndex: 'goods_name',
    align: 'center',
    sorter: true,
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
  },
  {
    title: '商品类型',
    dataIndex: 'goods_type',
    align: 'center',
    sorter: true,
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
  },
  {
    title: '收件人id',
    dataIndex: 'receiver_id',
    align: 'center',
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
    customRender: ({ record }) => {
      const { receiverInfo } = record;
      if (receiverInfo) {
        console.log(receiverInfo, 'receiverInfo');
        return `${receiverInfo.nick_name ? receiverInfo.nick_name : ''}`;
      }
      return '';
    },
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    align: 'center',
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
    customRender: ({ record }) => {
      const { status } = record;

      return statusType[status];
    },
  },
];
