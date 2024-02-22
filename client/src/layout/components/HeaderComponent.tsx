import React, { useEffect } from "react";
import { Button, Menu, Dropdown, Tag } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { INavProps } from "./Interfaces";
import useAuth from "../../hooks/auth";
import { useAppDispatch } from "../../redux/hooks";
import { logoutUser } from "../../redux/features/auth/slice";

const HeaderComponent: React.FC<INavProps> = ({
  collapsed,
  colorBgContainer,
  setCollapsed,
}) => {
  const accountMenu = (
    <Menu>
      <Menu.Item key="profile">
        <UserOutlined />
        <span>Profile</span>
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  const auth = useAuth();
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(logoutUser())
  };

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />

      <div style={{ float: "right", marginRight: "20px" }}>
        <Tag>Welcome {auth?.name}</Tag>
        <Tag color="cyan">
          {auth?.role} | {auth?.id}
        </Tag>

        <Dropdown overlay={accountMenu} trigger={["click"]}>
          <Button type="text" style={{ fontSize: "16px" }}>
            Account
          </Button>
        </Dropdown>

        <Button
          type="text"
          style={{ fontSize: "16px", marginLeft: "20px" }}
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default HeaderComponent;
