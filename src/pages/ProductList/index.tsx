import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card } from 'antd';

const { Meta } = Card;

import "./index.less";

export default function HomePageContainer(): JSX.Element {
  const navigate = useNavigate();

  // 跳转到商品详情页
  const handleJump = () => {
    navigate("/productDetail")
  }
  return (
    <div className="page-home all_nowarp">
      <div className="container" >
        <Card
        onClick={handleJump}
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="童年眼睛" description="防雾免洗" />
        </Card>
      </div>
    </div>
  );
}
