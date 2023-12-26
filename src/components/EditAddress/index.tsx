/** 通用动态面包屑 **/
import React from "react";
import { Divider, Form, Input, Modal, message } from "antd";
import smart from "address-smart-parse";
import { PhoneNumberValidation } from "@/util/utils";
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
            console.log(smart(e.target.value));
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
              message: "请输入收货人地址",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="city"
          label="所在地区"
          rules={[
            {
              required: true,
              message: "请选择所在地区",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="详细地址"
          rules={[
            {
              required: true,
              message: "请输入详细地址",
            },
          ]}
        >
          <Input placeholder="请输入详细地址" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="手机号码"
          rules={[
            {
              required: true,
              message: "请输入手机号码",
            },
            { validator: PhoneNumberValidation },
          ]}
        >
          <Input placeholder="请输入手机号码" />
        </Form.Item>
     
        <Form.Item
          name="email"
          label="邮箱地址"
          rules={[
            {
              required: true,
              message: "请输入邮箱地址",
            },
            { type: 'email', message: '请输入有效的邮箱!' }
          ]}
        >
          <Input placeholder="请输入邮箱地址" />
        </Form.Item>
        <Form.Item name="description" label="地址别名">
          <Input placeholder="默认为城市名称加收货人姓名" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAddress;
