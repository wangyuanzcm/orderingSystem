<template>
  <div>
    <context-holder />
    <Card title="收件信息">
      <DynamicTable
        size="small"
        bordered
        :data-request="loadData"
        :columns="columns"
        row-key="id"
        @resize-column="handleResizeColumn"
      >
        <template #toolbar>
          <a-typography-text>您已创建11个收货地址</a-typography-text>
          <FormModal></FormModal>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'name'">
            {{ record.name }} <a class="text-red-500">[测试bodyCell]</a>
          </template>
        </template>
      </DynamicTable>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { message, Card } from 'ant-design-vue';
  import FormModal from './form-modal.vue';
  import { columns, tableData } from './columns';
  import { useTable, type OnChangeCallbackParams } from '@/components/core/dynamic-table';
  import { services } from '@/utils/request';

  const [messageApi, contextHolder] = message.useMessage();
  const [DynamicTable, dynamicTableInstance] = useTable();

  const loadData = async (
    params,
    onChangeParams: OnChangeCallbackParams,
  ): Promise<API.TableListResult> => {
    console.log('params', params);
    console.log('onChangeParams', onChangeParams);
    const result = await services.receiverControllerPage({
      ...params,
    });
    console.log(result, 'result');
    // @ts-ignore
    const { list, pagination } = result.data;
    return {
      list,
      pagination,
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          list: tableData,
          ...params,
        });
        // 手动设置搜索表单的搜索项
        dynamicTableInstance?.getQueryFormRef()?.updateSchema?.([
          {
            field: 'price',
            componentProps: {
              options: [
                {
                  label: '0-199',
                  value: '0-199',
                },
                {
                  label: '200-999',
                  value: '200-999',
                },
              ],
            },
          },
        ]);
      }, 500);
    });
  };

  const handleResizeColumn = (w, col) => {
    // console.log('w', w, col);
    col.width = w;
  };
</script>

<style lang="less" scoped></style>
