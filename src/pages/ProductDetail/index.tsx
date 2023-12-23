import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Carousel,
  Space,
  Tag,
  TreeSelect,
  InputNumber,
  Button,
} from "antd";

const { Title, Text } = Typography;

import "./index.less";
const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-1",
      },
      {
        title: "Child Node2",
        value: "0-0-2",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
  },
];

export default function HomePageContainer(): JSX.Element {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };
  // 跳转到商品详情页
  const handleJump = () => {
    navigate("/cart");
  };

  const handleChange = (value: number) => {
    console.log("changed", value);
  };
  return (
    <div className="page-home all_nowarp">
      <div className="container">
        <div className="left">
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </div>
        <div className="right">
          <Title level={4}>商品名称</Title>
          <Text type="secondary">商品描述</Text>
          <div>
            <Text strong>价格：</Text>
            <span>100</span>
          </div>
          <div>
            可用优惠：
            <Space size={[0, 8]} wrap>
              <Tag color="magenta">满20减1</Tag>
              <Tag color="red">3折券</Tag>
            </Space>
          </div>
          <div>
            配送地址：{" "}
            <TreeSelect
              style={{ width: "100%" }}
              value={value}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              treeData={treeData}
              placeholder="Please select"
              treeDefaultExpandAll
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <div>
        <InputNumber
          min={1}
          max={10}
          defaultValue={3}
          onChange={handleChange}
        />
        <Button type="primary" onClick={handleJump}>
          加入购物车
        </Button>
      </div>
    </div>
  );
}
