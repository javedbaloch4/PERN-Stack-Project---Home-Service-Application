import { Link } from "react-router-dom";
import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { INavProps } from "./Interfaces";
import useAuth from "../../hooks/auth";

const { Sider } = Layout;

const SidebarComponent: React.FC<INavProps> = ({ collapsed }) => {
  const authUser = useAuth();

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
        <h2 style={{ color: "white", textAlign: "center" }}>
          <img
            src="https://www.cdnlogo.com/logos/r/63/reddcoin.svg"
            width={20}
          />{" "}
          CraftHub
        </h2>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/bookings">Bookings</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<VideoCameraOutlined />}>
          <Link to="/category">Category</Link>
        </Menu.Item>

        <Menu.Item key="4" icon={<UploadOutlined />}>
          <Link to="/services">Services</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarComponent;
