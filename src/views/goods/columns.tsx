import { Image, ImagePreviewGroup } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import type { UpdateGoodsDto } from '@/service';
import type { ImageFileType } from '@/components/business/image-upload';

export type TableListItem = UpdateGoodsDto;
export type TableColumnItem = TableColumn<TableListItem>;

export const extendAreaCode = (areaCode) =>
  areaCode ? [areaCode.slice(0, 2), areaCode.slice(0, 4), areaCode] : [];

export const collapseAreaCode = (areaCode) =>
  areaCode.length > 0 ? areaCode[areaCode.length - 1] : '';

export const baseColumns: TableColumnItem[] = [
  {
    title: '商品名称',
    dataIndex: 'title',
    align: 'center',
    sorter: true,
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
  },
  {
    title: '商品编号',
    dataIndex: 'code_hs',
    align: 'center',
    sorter: true,
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
  },
  {
    title: '商品图片',
    dataIndex: 'image_list',
    hideInSearch: true,
    align: 'center',
    resizable: true,
    customRender: ({ record }) => {
      const imageList = (record.image_list || []) as unknown as ImageFileType[];
      return (
        <ImagePreviewGroup>
          {imageList.map((item) => (
            <Image width={100} src={item.url} />
          ))}
        </ImagePreviewGroup>
      );
    },
  },
  {
    title: '商品描述',
    dataIndex: 'description',
    align: 'center',
    sorter: true,
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
  },
  {
    title: '详细信息',
    dataIndex: 'detail_info',
    align: 'center',
    sorter: true,
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
  },
  {
    title: '商品价格',
    dataIndex: 'price',
    align: 'center',
    sorter: true,
    resizable: true,
    hideInSearch: true,
    formItemProps: {
      defaultValue: 0,
      required: false,
    },
  },
  {
    title: '商品类型',
    dataIndex: 'types',
    align: 'center',
    sorter: true,
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
  },
  {
    title: '是否为定制商品',
    dataIndex: 'universal',
    align: 'center',
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
  },
];
