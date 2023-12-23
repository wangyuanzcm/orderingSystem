/* 主页 */

import React from "react";
import ImgLogo from "@/assets/react-logo.jpg";

import "./index.less";
/**
 * 如果折扣策略支持自定义的话，前端和后端都需要添加一批自定义设置的逻辑，这个对项目的复杂度和工作量影响很大，暂时搁置。
 * 目前使用的方案是直接在后端代码中将折扣策略写死，如果需要的时候再添加
 */

export default function DiscountSetting(): JSX.Element {
  return (
    <div className="page-home all_nowarp">
      <div className="box">
        <img src={ImgLogo} />
        <div className="title">React-admin</div>
        <div className="info">
          标准后台管理系统解决方案，react18、router6、rematch、antd4、vite4、ES6+
        </div>
        <div className="info">动态菜单配置，权限精确到按钮</div>
      </div>
    </div>
  );
}
