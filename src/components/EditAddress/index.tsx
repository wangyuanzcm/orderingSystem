/** 通用动态面包屑 **/
import React, { useState } from "react";
import { Button, Divider, Form, Input, Modal, message } from "antd";
import smart from "address-smart-parse";

import "./index.less";
const { TextArea } = Input;

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface EditAddressProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  isEdit?: boolean; // true为编辑，false为新建
}

const EditAddress: React.FC<EditAddressProps> = ({
  open,
  onCreate,
  onCancel,
  isEdit,
}) => {
  const [form] = Form.useForm();
  const title = isEdit ? "编辑收货地址" : "新增收货地址";
  return (
    <Modal
      open={open}
      title={title}
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
            message.success("提交成功");
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <div>
        地址粘贴板：
        <TextArea
          onChange={(e) => {
            console.log(e.target.value);
            console.log(
              smart("浙江省杭州市西湖区盘山路28号幸福茶庄 陈红 13593464918")
            );
          }}
          placeholder="试试粘贴收件人姓名、手机号、收货地址，可快速识别您的收货信息"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </div>
      <Divider />

      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="title"
          label="收货人"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="所在地区">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="详细地址">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="手机号码">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="邮箱地址">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="地址别名">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAddress;
