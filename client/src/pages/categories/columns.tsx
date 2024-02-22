import type { TableProps } from "antd";
import { Button, Space, Tag } from "antd";
import { Category } from "../../redux/features/category/slice";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { User } from "../../redux/features/auth/slice";
import moment from "moment";

export const categoryColumns = (
  handleDelete: (id: number) => void,
  handleEdit: (id: number) => void,
  auth: User
): TableProps<Category>["columns"] => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, record) => <Tag color="purple">{record.name}</Tag>,
    sorter: {
      compare: (a, b) => a.id - b.id,
      multiple: 3,
    },
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, record) => <>{moment(new Date(record.createdAt)).fromNow()}</>,
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (_, record) => <>{moment(new Date(record.createdAt)).fromNow()}</>,
  },
  auth?.role === "admin"
    ? {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button
              onClick={() => handleEdit(record.id)}
              icon={<EditOutlined />}
            ></Button>
            <Button
              onClick={() => handleDelete(record.id)}
              danger
              icon={<DeleteFilled />}
            ></Button>
          </Space>
        ),
      }
    : {},
];
