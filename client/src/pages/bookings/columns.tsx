import type { TableProps } from "antd";
import { Button, Space, Tag } from "antd";
import { Booking } from "../../redux/features/bookings/slice";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { User } from "../../redux/features/auth/slice";
import moment from "moment";

export const bookingColumns = (
  handleDelete: (id: number) => void,
  handleEdit: (id: number) => void,
  auth: User,
  handleMarkComplete: (id: any) => void
): TableProps<Booking>["columns"] => [
  {
    title: "Id",
    dataIndex: "id",
    key: 1,
    render: (id) => <p>{id}</p>,
  },
  {
    title: "Booking Date",
    dataIndex: "bookingDate",
    key: 2,
    render: (_, record) => (
      <>{moment(record.bookingDate).format("D MMM YYYY h:mm A")}</>
    ),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: 3,
    render: (_, record) => <>{moment(new Date(record.createdAt)).fromNow()}</>,
  },
  {
    title: "Payment Status",
    key: 5,
    render: (_, record) => (
      <Tag
        color={
          record.paymentStatus === "completed"
            ? "blue"
            : record.paymentStatus === "pending"
            ? "red"
            : "orange"
        }
      >
        {record.paymentStatus.charAt(0).toUpperCase() +
          record.paymentStatus.slice(1)}
      </Tag>
    ),
  },
  {
    title: "Completation Status",
    key: 5,
    render: (_, record) =>
      record.completeStatus === "pending" ? (
        <>
          <Tag color="orange-inverse">In Progress</Tag>
          {auth.role !== "seller" ? (
            <Button
              size="small"
              onClick={() => handleMarkComplete(record.service.id, record.id)}
            >
              Mark as completed
            </Button>
          ) : null}
        </>
      ) : (
        <Tag>Completed</Tag>
      ),
  },
  auth?.role === "admin"
    ? {
        title: "Action",
        key: 6,
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
