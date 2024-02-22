import { TableProps, Tag } from "antd";
import { Button, Space } from "antd";
import { Service } from "../../redux/features/services/slice";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import moment from "moment";

export const ServiceColumnsColumns = (
  handleDelete: (id: number) => void,
  handleEdit: (id: number) => void
): TableProps<Service>["columns"] => [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (id) => <p>{id}</p>,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, record) => (
      <>
        {record.status === true ? (
          <Tag color="cyan">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        )}
      </>
    ),
  },
  {
    title: "Service Status",
    dataIndex: "statusService",
    key: "status",
    render: (_, record) => (
      <>
        {record.statusService === "pending" ? (
          <Tag color="orange">Pending</Tag>
        ) : record.statusService === "approved" ? (
          <Tag color="green">Approved</Tag>
        ) : record.statusService === "rejected" ? (
          <Tag color="red">Rejected</Tag>
        ) : (
          <Tag color="gray">Inactive</Tag>
        )}
      </>
    ),
  },
  {
    title: "Categry",
    dataIndex: "category",
    key: "category",
    render: (_, record) => (
      <>
        <Tag color="blue">{record.category.name}</Tag>
      </>
    ),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, record) => <>{moment(new Date(record.createdAt!)).fromNow()}</>,
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (_, record) => <>{moment(new Date(record.createdAt!)).fromNow()}</>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          onClick={() => handleEdit(record.id!)}
          icon={<EditOutlined />}
        ></Button>
        <Button
          onClick={() => handleDelete(record.id!)}
          danger
          icon={<DeleteFilled />}
        ></Button>
      </Space>
    ),
  },
];
