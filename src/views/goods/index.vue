<template>
  <div>
    <FormModal ref="formModalRef" :dynamic-table="dynamicTableInstance"></FormModal>
    <!-- <context-holder /> -->
    <Card title="商品列表">
      <DynamicTable
        size="small"
        row-key="id"
        bordered
        :data-request="loadTableData"
        :columns="columns"
      >
        <template #toolbar>
          <a-button type="primary" :disabled="!$auth('sys.menu.add')" @click="openFormModal({})">
            新增商品
          </a-button>
        </template>
      </DynamicTable>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, type Ref } from 'vue';

  import { Card } from 'ant-design-vue';
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import FormModal from './form-modal.vue';
  import { useTable } from '@/components/core/dynamic-table';
  import { services } from '@/utils/request';

  type FormModalProps = typeof FormModal;

  const [DynamicTable, dynamicTableInstance] = useTable();

  const formModalRef: Ref<FormModalProps | null> = ref(null); // 定义子组件引用
  const openFormModal = (record: Partial<TableListItem>) => {
    if (formModalRef.value) {
      formModalRef.value?.openModal(record);
    }
  };
  const delRowConfirm = async (record: TableListItem) => {
    await services.goodsControllerDelete({ ids: [record.id] });
    dynamicTableInstance.reload();
  };
  /**
   * 加载列表数据
   * @param params
   */
  const loadTableData = async (params): Promise<API.TableListResult> => {
    const { ...others } = params;
    const result = await services.goodsControllerPage({
      ...others,
    });
    console.log(result, 'result');
    // @ts-ignore
    const { list, pagination } = result.data;

    return { list, pagination };
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
            if (formModalRef.value) {
              formModalRef.value?.openModal(record);
            }
          },
        },
        {
          label: '查看详情',
          auth: {
            perm: 'sys.menu.update',
            effect: 'disable',
          },
          onClick: () => {
            if (formModalRef.value) {
              formModalRef.value?.openModal(record);
            }
          },
        },
        {
          label: '购买',
          auth: {
            perm: 'sys.menu.update',
            effect: 'disable',
          },
          onClick: () => {
            if (formModalRef.value) {
              formModalRef.value?.openModal(record);
            }
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
