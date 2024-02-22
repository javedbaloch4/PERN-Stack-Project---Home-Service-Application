// BaseLayout.tsx
import React, { useState } from "react";
import { Layout, theme } from "antd";
import SidebarComponent from "./components/Sidebar";
import HeaderComponent from "./components/HeaderComponent";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const BaseLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarComponent collapsed={collapsed} />
      <Layout>
        <HeaderComponent
          colorBgContainer={colorBgContainer}
          setCollapsed={() => setCollapsed(!collapsed)}
        />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
