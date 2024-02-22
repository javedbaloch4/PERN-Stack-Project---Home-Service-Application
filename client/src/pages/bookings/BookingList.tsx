import React, { useEffect, useState } from "react";
import CustomTable from "../../components/common/tables/CustomTable";
import { bookingColumns } from "./columns";
import { Spin, Modal, Card, Row, Col } from "antd";
import {
  ExclamationCircleFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Booking,
  bookingSelector,
  deleteBooking,
  fetchBookings,
  toggleShowForm,
  isEditForm,
  toggleReviewForm,
  updateBooking,
} from "../../redux/features/bookings/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import BookingForm from "./BookingForm";
import useAuth from "../../hooks/auth";
import ReviewForm from "./ReviewForm";

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<Array<Booking>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [reviewData, setReviewData] = useState({
    isOpen: false,
    serviceId: null,
    userId: null,
  });

  const auth = useAuth();

  const { confirm } = Modal;
  const dispatch = useAppDispatch();

  const selectBooking = useAppSelector(bookingSelector);

  useEffect(() => {
    dispatch(fetchBookings());
  }, []);

  useEffect(() => {
    setLoading(selectBooking.loading);
    setError(selectBooking.error);

    let data;

    if (auth?.role === "admin") {
      data = [...selectBooking.bookings];
    } else if (auth?.role === "customer") {
      data = [
        ...selectBooking.bookings.filter(
          (booking) => booking.userId == auth?.id
        ),
      ];
    } else {
      data = [
        ...selectBooking.bookings.filter(
          (booking) => booking.service.userId == auth?.id
        ),
      ];
    }

    setBookings(
      data.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    );
  }, [selectBooking]);

  const handleDelete = (id: number) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk() {
        dispatch(deleteBooking(id));
      },
    });
  };

  const handleEdit = (id: number) => {
    dispatch(toggleShowForm());
    dispatch(isEditForm(id));
  };

  const handleMarkComplete = (serviceId: any, bookingId: number) => {
    setReviewData({
      isOpen: true,
      serviceId: serviceId,
      userId: auth?.id,
    });

    dispatch(toggleReviewForm({}));

    const data = {
      id: bookingId,
      completeStatus: "completed",
    };

    dispatch(updateBooking(data));
  };

  return loading ? (
    <Spin />
  ) : (
    <>
      <h1>
        <UnorderedListOutlined /> Bookings
      </h1>

      <div>
        <BookingForm />
      </div>

      <CustomTable
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (record) => (
            <Card title="Details" style={{ margin: 0 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="User Details">
                    <p>
                      <strong>Name:</strong> {record.user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {record.user.email}
                    </p>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Service Details">
                    <p>
                      <strong>Service ID:</strong> {record.service.id}
                    </p>
                    <p>
                      <strong>Service Title:</strong> {record.service.title}
                    </p>
                    <p>
                      <strong>Service Description:</strong>{" "}
                      {record.service.description}
                    </p>
                    <p>
                      <strong>Service Location:</strong>{" "}
                      {record.service.location}
                    </p>
                    <p>
                      <strong>Service Price:</strong> {record.service.price}
                    </p>
                  </Card>
                </Col>
              </Row>
            </Card>
          ),
          rowExpandable: (record) => record.id !== "Not Expandable",
        }}
        columns={bookingColumns(
          handleDelete,
          handleEdit,
          auth!,
          handleMarkComplete
        )?.filter((e) => Object.keys(e).length)}
        dataSource={bookings}
      />
      <ReviewForm reviewData={reviewData} />
    </>
  );
};

export default BookingList;
