/** 通用动态面包屑 **/
import { Button, Form, Input, Modal, message } from "antd";

import "./index.less";
import React from "react";

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
  return (
    <Modal
      open={open}
      title="Create a new collection"
      okText={isEdit ? "编辑收货地址" : "新增收货地址"}
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
