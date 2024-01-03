<template>
  <div>
    <context-holder />
    <Card title="收件信息">
      <DynamicTable
        size="small"
        bordered
        :data-request="loadTableData"
        :columns="columns"
        row-key="id"
        @resize-column="handleResizeColumn"
      >
        <template #toolbar>
          <a-button type="primary" :disabled="!$auth('sys.menu.add')" @click="openMenuModal({})">
            新增收货人信息
          </a-button>
        </template>
        <!-- <template #toolbar>
          <a-typography-text>您已创建{{ total }}个收货地址</a-typography-text>
          <FormModal></FormModal>
        </template> -->
      </DynamicTable>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { message, Card } from 'ant-design-vue';
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { useFormModal } from '@/hooks/useModal/useFormModal';
  import { updateMenu, createMenu, deleteMenu } from '@/api/system/menu';
  import { useReceiverSchemas } from './formSchemas';

  import { useTable, type OnChangeCallbackParams } from '@/components/core/dynamic-table';
  import { services } from '@/utils/request';

  const [messageApi, contextHolder] = message.useMessage();
  const [DynamicTable, dynamicTableInstance] = useTable();
  const [showModal] = useFormModal();

  const openMenuModal = async (record: Partial<TableListItem>) => {
    const [formRef] = await showModal({
      modalProps: {
        title: `${record.id ? '编辑' : '新增'}收货人信息`,
        width: 700,
        onFinish: async (values) => {
          console.log('新增/编辑收货人信息', values);
          // record.id && (values.menuId = record.id);
          // if (values.type === 1 && values.viewPath?.length) {
          //   values.viewPath = values.viewPath.join('/');
          // }
          // if (values.type === 2 && values.perms?.length) {
          //   values.perms = values.perms.map((n) => n.join(':')).toString();
          // }
          // await (record.id ? updateMenu : createMenu)(values);
          // dynamicTableInstance.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: useReceiverSchemas(),
      },
    });

    // formRef?.updateSchema([
    //   {
    //     field: 'parentId',
    //     componentProps: {
    //       treeDefaultExpandedKeys: [-1].concat(record?.keyPath || []),
    //       treeData: ref([{ id: -1, name: '一级菜单', children: menuTree.value }]),
    //     },
    //   },
    // ]);

    // formRef?.setFieldsValue({
    //   ...record,
    //   icon: record.icon ?? '',
    //   perms: record.perms
    //     ?.split(',')
    //     .filter(Boolean)
    //     .map((n) => n.split(':')),
    //   viewPath: record.viewPath?.split('/'),
    //   parentId: record.parentId ?? -1,
    // });
  };
  const delRowConfirm = async (record: TableListItem) => {
    await deleteMenu({ menuId: record.id });
    dynamicTableInstance.reload();
  };

  const loadTableData = async (params): Promise<API.TableListResult> => {
    const result = await services.receiverControllerPage({
      ...params,
    });
    console.log(result, 'result');
    // @ts-ignore
    const { list, pagination } = result.data;

    return { list };
  };

  const handleResizeColumn = (w, col) => {
    // console.log('w', w, col);
    col.width = w;
  };

  const columns: TableColumnItem[] = [
    ...baseColumns,
    {
      title: '操作',
      width: 160,
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
          onClick: () => openMenuModal(record),
        },
        {
          label: '删除',
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
