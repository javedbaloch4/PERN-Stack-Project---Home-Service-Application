import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchServices,
  serviceSelector,
} from "../../redux/features/services/slice";
import { Rate, Spin, Typography } from "antd";

const { Text, Title, Paragraph } = Typography;

const SingleService = () => {
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const selectService = useAppSelector(serviceSelector);

  useEffect(() => {
    setLoading(selectService.loading);
    dispatch(fetchServices());
    setService(
      [
        ...selectService.services.filter(
          (service) => service.id === parseInt(id)
        ),
      ][0]
    );
  }, [selectService.services]);

  return loading ? (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Spin size="large" />
    </div>
  ) : (
    <div style={{ padding: "20px" }}>
      <Text>Single Service</Text>

      {service ? (
        <div>
          <Title level={2}>Service Title: {service.title}</Title>

          <div style={{ marginBottom: "20px" }}>
            <Title level={2}>Reviews</Title>
            {service.reviews && service.reviews.length > 0 ? (
              service.reviews.map((review, index) => (
                <div key={index} style={{ marginBottom: "15px" }}>
                  <Paragraph strong>Review: {review.comment}</Paragraph>
                  <Paragraph>Rating: {review.rating}</Paragraph>
                  <Rate disabled defaultValue={review.rating} />
                </div>
              ))
            ) : (
              <Paragraph>No reviews available for this service.</Paragraph>
            )}
          </div>
        </div>
      ) : (
        <Paragraph>Service details not available.</Paragraph>
      )}
    </div>
  );
};

export default SingleService;
