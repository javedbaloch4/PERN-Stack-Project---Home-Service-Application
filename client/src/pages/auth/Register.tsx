import { Card, Form, Input, Button, Radio, Select, InputNumber } from "antd";
import {
  LockOutlined,
  MailOutlined,
  IdcardOutlined,
  ManOutlined,
  WomanOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { registerUser, userSelector } from "../../redux/features/auth/slice";
import NotificationToast from "../../components/notifications/NotificationToast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const { Option } = Select;

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectUser = useAppSelector(userSelector);

  const onFinish = (values: {
    name: string;
    gender: string;
    email: string;
    password: string;
    role: string;
  }) => {
    dispatch(registerUser(values));
  };

  useEffect(() => {
    if (selectUser.user) {
      setTimeout(() => navigate("/dashboard"), 1000);
    }
  }, [dispatch, selectUser.user]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <NotificationToast />

      <Card
        title="Register"
        style={{
          width: 500,
          backgroundColor: "#f0f2f5",
          padding: 20,
          borderRadius: 8,
        }}
      >
        <Form
          name="normal_register"
          className="register-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>

          <Form.Item
            name="gender"
            rules={[{ required: true, message: "Please select your Gender!" }]}
          >
            <Radio.Group>
              <Radio value="male">
                <ManOutlined /> Male
              </Radio>
              <Radio value="female">
                <WomanOutlined /> Female
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="age"
            rules={[{ required: true, message: "Please input your Age!" }]}
          >
            <InputNumber
              min="1"
              prefix={<NumberOutlined className="site-form-item-icon" />}
              placeholder="Age"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
            className="mb-4"
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="role"
            rules={[{ required: true, message: "Please select your Role!" }]}
          >
            <Select placeholder="Select your Role">
              <Option value="customer">Customer</Option>
              <Option value="seller">Seller</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Register
            </Button>
            &nbsp; Or <Link to="/login">Login</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
