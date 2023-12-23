import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  TreeSelect,
  Upload,
} from "antd";

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
export default function ProductItemSetting(): JSX.Element {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="是否定制">
          <Radio.Group>
            <Radio value="apple"> 定制类产品 </Radio>
            <Radio value="pear"> 非定制产品 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="商品名称">
          <Input />
        </Form.Item>
        <Form.Item label="商品说明">
          <Input />
        </Form.Item>
        <Form.Item label="查看详情文案">
          <Input />
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="商品图片"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="商品价格">
          <InputNumber />
        </Form.Item>
        <Form.Item label="优惠规则">
          <TreeSelect
            treeData={[
              {
                title: "定价规则",
                value: "price",
                children: [{ title: "满200单价两元", value: "bamboo" }],
              },
              {
                title: "买赠规则",
                value: "sent",
                children: [
                  { title: "买20送2", value: "bamboo" },
                  { title: "买30送4", value: "bamboo" },
                ],
              },
              {
                title: "优惠券",
                value: "Discount",
                children: [
                  { title: "30元券", value: "bamboo" },
                  { title: "97折", value: "bamboo" },
                  { title: "95折", value: "bamboo" },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="商品类别">
          <TextArea rows={4} placeholder="输入内容使用,分割开" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">保存设置</Button>
        </Form.Item>
      </Form>
    </>
  );
}
