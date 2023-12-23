/* Footer 页面底部 */
import React from "react";
import { Layout } from "antd";
import "./index.less";

const { Footer } = Layout;

interface Props {
  className?: string;
}

export default function FooterCom(props: Props) {
  return (
    <Footer className={`footer ${props.className}`}>
      © 2018-{new Date().getFullYear() + " "}
      <a>瞳年视界</a>, Inc.
    </Footer>
  );
}
