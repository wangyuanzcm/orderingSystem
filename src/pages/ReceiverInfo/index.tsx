/* 收件地址 */
import React, { useState } from "react";
import { Button, Descriptions, Modal, message, Typography } from "antd";
import EditAddress from "@/components/EditAddress";

const { Paragraph } = Typography;

const AddressInfo = () => {
  const [open, setOpen] = useState(false);
  const [editableStr, setEditableStr] = useState("唐孟西");

  const handleDelete = () => {
    Modal.warning({
      title: "确定删除该地址吗?",
      okText: "确认",
      onOk: () => {
        message.success("This is a success message");
      },
      cancelText: "取消",
    });
  };
  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };
  return (
    <div className="border-1 border-solid border-gray-300 p-10">
      <EditAddress
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        isEdit
      />
      <Descriptions
        title={
          <Paragraph editable={{ onChange: setEditableStr }} className="w-1/2">
            {editableStr}
          </Paragraph>
        }
        column={1}
        extra={
          <Button.Group>
            <Button
              className="mr-4"
              type="primary"
              onClick={() => {
                setOpen(true);
              }}
            >
              修改
            </Button>
            <br />
            <Button danger onClick={handleDelete}>
              删除
            </Button>
          </Button.Group>
        }
      >
        <Descriptions.Item label="收件人">唐孟西</Descriptions.Item>
        <Descriptions.Item label="所在地区">
          北京海淀区中关村街道
        </Descriptions.Item>
        <Descriptions.Item label="地址">
          知春路101号大泥湾2号楼1单元201
        </Descriptions.Item>
        <Descriptions.Item label="手机">152****7628</Descriptions.Item>
        <Descriptions.Item label="固定电话">010-00000000</Descriptions.Item>
        <Descriptions.Item label="电子邮箱">
          wangyuanssh@sina.com
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default function ReceiveInfo(): JSX.Element {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };
  return (
    <div className="all_nowarp ">
      <EditAddress
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <div className="flex-row pb-10">
        <Button
          className="mr-4"
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          新增收货地址
        </Button>
        您已创建<span>11</span>个收货地址
      </div>
      <div className="border">
        <AddressInfo />
      </div>
    </div>
  );
}
