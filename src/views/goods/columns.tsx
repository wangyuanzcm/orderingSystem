import { Image, ImagePreviewGroup } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import type { UpdateGoodsDto } from '@/service';

export type TableListItem = UpdateGoodsDto['ext'] & Pick<UpdateGoodsDto, 'id'>;
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
    hideInSearch: true,
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
      const { image_list: imageList = [] } = record as any;
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
    title: '商品说明',
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
    dataIndex: 'remark',
    align: 'center',
    sorter: true,
    resizable: true,
    formItemProps: {
      defaultValue: '',
      required: false,
    },
  },
  {
    title: '商品类型和价格',
    dataIndex: 'type_price',
    align: 'center',
    sorter: true,
    resizable: true,
    hideInSearch: true,
    customRender: ({ record }) => {
      const { type_price: typePrice = [] } = record as any;
      return (
        <div>
          {typePrice.map(({ type, price }) => {
            return <div>{`${type}:${price}元`}</div>;
          })}
        </div>
      );
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
    customRender: ({ record }) => {
      const { universal } = record as any;
      return universal ? '是' : '否';
    },
  },
];
