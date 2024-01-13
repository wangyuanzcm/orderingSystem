<template>
  <div>
    <!-- <context-holder /> -->
    <Card title="订单列表">
      <DynamicTable
        size="small"
        row-key="id"
        bordered
        :data-request="loadTableData"
        :columns="columns"
      >
        <template #toolbar>
          <a-button type="primary" :disabled="!$auth('sys.menu.add')" @click="handleExport">
            导出订单
          </a-button>
        </template>
      </DynamicTable>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  import { find } from 'lodash-es';
  import { message, Card } from 'ant-design-vue';
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { useTable } from '@/components/core/dynamic-table';
  import { services } from '@/utils/request';

  const router = useRouter();
  const [DynamicTable, dynamicTableInstance] = useTable();

  const delRowConfirm = async (record: TableListItem) => {
    // await deleteMenu({ menuId: record.id });
    await services.orderControllerDelete({ ids: [record.id] });
    message.success('删除成功');
    dynamicTableInstance.reload();
  };
  // 处理订单导出事件
  const handleExport = () => {};
  /**
   * 加载列表数据
   * @param params
   */
  const loadTableData = async (params): Promise<API.TableListResult> => {
    const {
      receiver_id: receiverId,
      status,
      goods_type: goodsType,
      goods_name: goodsName,
      limit,
      page,
      ...others
    } = params;
    const result = await services.orderControllerPage({
      receiver_id: receiverId,
      status,
      goods_type: goodsType,
      goods_name: goodsName,
      limit,
      page,
      ext: { ...others },
    });

    console.log(result, 'result');
    // @ts-ignore
    const { list, pagination } = result.data;
    const reveiveIds = list.map((i) => i.receiver_id);
    const { data: receiverInfoData } = await services.receiverControllerSearch({ ids: reveiveIds });
    const listData = list.map((i) => {
      const receiverInfo = find(receiverInfoData as unknown as Array<Record<string, any>>, {
        id: i.receiver_id,
      });
      return {
        ...i,
        receiverInfo,
      };
    });
    return { list: listData, pagination };
  };

  const columns: TableColumnItem[] = [
    ...baseColumns,
    {
      title: '操作',
      width: 350,
      dataIndex: 'ACTION',
      hideInSearch: true,
      align: 'center',
      fixed: 'right',
      actions: ({ record }) => [
        {
          label: '编辑',
          auth: {
            perm: 'sys.menu.update',
            effect: 'disable',
          },
          onClick: () => {
            const { id, goods_id: goodsId, receiverInfo } = record;
            console.log(record, 'id, goods_id');
            router.push({
              path: '/buygoods',
              query: { orderId: id, id: goodsId, receiverNickName: receiverInfo.nick_name },
            });
          },
        },
        {
          label: '查看详情',
          auth: {
            perm: 'sys.menu.update',
            effect: 'disable',
          },
          onClick: () => {
            const { id, goods_id: goodsId, receiverInfo } = record;
            console.log(record, 'id, goods_id');
            router.push({
              path: '/buygoods',
              query: { orderId: id, id: goodsId, receiverNickName: receiverInfo.nick_name },
            });
          },
        },
        {
          label: '删除',
          type: 'default',
          danger: true,
          auth: 'sys.menu.delete',
          popConfirm: {
            title: '你确定要删除吗？',
            onConfirm: () => delRowConfirm(record),
          },
        },
      ],
    },
  ];
</script>

<style lang="less" scoped></style>
