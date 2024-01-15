<template>
  <div>
    <!-- <context-holder /> -->
    <Card title="商品列表">
      <DynamicTable
        size="small"
        row-key="id"
        bordered
        :data-request="loadTableData"
        :columns="columns"
        :row-selection="rowSelection"
      >
        <template #toolbar>
          <a-button type="primary" :disabled="!$auth('sys.menu.add')" @click="handleExport">
            导出订单
          </a-button>
          <a-button
            type="primary"
            :disabled="!$auth('sys.menu.add')"
            @click="handleJumpCreatePage()"
          >
            新增商品
          </a-button>
        </template>
      </DynamicTable>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { Card, message } from 'ant-design-vue';
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import type { TableProps } from 'ant-design-vue';
  import { useTable } from '@/components/core/dynamic-table';
  import { services } from '@/utils/request';
  import { getConfig } from '@/core/permission';
  import { decodeColumns, handleDefineValues } from '@/utils/transform';
  import { exportDocx } from '@/utils/doc';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();
  const exportList = ref<Array<any>>([]);
  const userInfo = computed(() => userStore.userInfo);
  // 处理订单导出事件
  const handleExport = () => {
    if (exportList.value.length === 0) {
      message.error('请选择需要导出的订单');
      return;
    }
    console.log(exportList.value, 'exportList.value');
    const data = {
      form: exportList.value,
    };
    exportDocx('/template.docx', data, `订单-${userInfo.value.name}-${Date.now()}.docx`);
  };

  const rowSelection: TableProps['rowSelection'] = {
    onChange: (selectedRowKeys: string[], selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      exportList.value = handleDefineValues(selectedRows, goodsEditDefineColumn);
    },
  };

  const router = useRouter();

  const [DynamicTable, dynamicTableInstance] = useTable();
  const goodsEditDefineColumn = decodeColumns(getConfig('GOODS_EDIT_DEFINE_COLUMN'));

  const handleJumpCreatePage = () => {
    router.push({
      path: '/creategoods',
    });
  };

  const delRowConfirm = async (record: TableListItem) => {
    console.log(record, 'record');
    await services.goodsControllerDelete({ ids: [record.id] });
    dynamicTableInstance.reload();
  };
  /**
   * 加载列表数据
   * @param params
   */
  const loadTableData = async (params): Promise<API.TableListResult> => {
    const { limit, page, ...ext } = params;
    const result = await services.goodsControllerPage({
      limit,
      page,
      ext,
    });
    // @ts-ignore
    const { list, pagination } = result.data;
    const resultList = list.map((i) => {
      const { id, ext = {} } = i;
      return { ...ext, id };
    });
    return { list: resultList, pagination };
  };

  const columns: TableColumnItem[] = [
    ...baseColumns,
    ...goodsEditDefineColumn,
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
            router.push({
              path: '/creategoods',
              query: { id: record.id },
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
            router.push({
              path: '/goodsdetail',
              query: { id: record.id },
            });
          },
        },
        {
          label: '购买',
          auth: {
            perm: 'sys.menu.update',
            effect: 'disable',
          },
          onClick: () => {
            router.push({
              path: '/buygoods',
              query: { id: record.id },
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
