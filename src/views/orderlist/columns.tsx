import { debounce } from 'lodash-es';
import { Space, Typography } from 'ant-design-vue';

import type { TableColumn } from '@/components/core/dynamic-table';
import type { PageSearchOrderInfo, UpdateReceiverDto } from '@/service';
import { services } from '@/utils/request';

export type TableListItem = PageSearchOrderInfo & { receiverInfo: UpdateReceiverDto };
export type TableColumnItem = TableColumn<TableListItem>;

const { Paragraph } = Typography;
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
      component: 'Select',
      componentProps: ({ formInstance, schema }) => ({
        showSearch: true,
        filterOption: false,
        onSearch: debounce(async (keyword) => {
          schema.loading = true;

          const params = {
            limit: 10,
            page: 1,
            nick_name: keyword,
          };
          const { data } = await services
            .receiverControllerPage(params)
            .finally(() => (schema.loading = false));
          // @ts-ignore
          const { list = [] } = data;
          const options = (list || []).map((option) => ({
            label: option.nick_name,
            value: option.id,
          }));
          const newSchema = {
            field: schema.field,
            componentProps: {
              options,
            },
          };
          formInstance?.updateSchema([newSchema]);
        }, 500),
      }),
    },
    customRender: ({ record }) => {
      const { receiverInfo, receiver_id: receiverId } = record;

      if (receiverInfo) {
        return (
          <Space direction="vertical ">
            <Paragraph copyable>{receiverInfo.nick_name}</Paragraph>
            <Paragraph copyable>收件人id：{receiverId}</Paragraph>
          </Space>
        );
      }
      return <Paragraph copyable>收件人id：{receiverId}</Paragraph>;
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
      component: 'Select',
      componentProps: () => ({
        options: Object.keys(statusType).map((i) => {
          return {
            label: statusType[i],
            value: i,
          };
        }),
      }),
    },
    customRender: ({ record }) => {
      const { status } = record;

      return statusType[status];
    },
  },
];
