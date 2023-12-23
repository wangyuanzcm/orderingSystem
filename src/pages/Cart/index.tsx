import React from "react";
import { Table, Typography, Card, InputNumber } from "antd";
import type { ColumnsType } from "antd/es/table";
const { Title } = Typography;
const { Meta } = Card;

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "商品",
    dataIndex: "name",
    render: (text: string) => (
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
    ),
  },
  {
    title: "单价",
    dataIndex: "age",
    render: (text: string) =><span> $199</span>,
  },
  {
    title: "数量",
    dataIndex: "age",
    render: (text: string) => (
      <InputNumber
        defaultValue={1000}
        formatter={(value) =>
          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
      />
    ),
  },
  {
    title: "小计",
    dataIndex: "age",
    render: (text: string) =><span> $199</span>,
  },
  {
    title: "操作",
    dataIndex: "address",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Disabled User",
    age: 99,
    address: "Sydney No. 1 Lake Park",
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};

const Cart: React.FC = () => {
  return (
    <div>
      <Title level={3}>
        全部商品: <span>139</span>
      </Title>
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      />
    </div>
  );
};

export default Cart;
