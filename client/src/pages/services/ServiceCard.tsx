import { Col, Card, Button, Modal, Rate, Affix } from "antd";
import { Service } from "../../redux/features/services/slice";
import {
  DollarOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { StripeElements } from "../../hooks/stripeHook";
import PaymentForm from "../../stripe/PaymentForm";
import { useState } from "react";
import { Link } from "react-router-dom";

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const calculateReviewAverage = () => {
    if (service.reviews.length === 0) {
      return 0; // Return 0 if there are no reviews to avoid division by zero
    }

    const totalRating = service.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const average = totalRating / service.reviews.length;

    return average.toFixed(1);
  };

  return (
    <>
      <Col>
        <Card
          hoverable
          style={{ width: 290, marginBottom: 20 }}
          cover={<div className={`serviceCard`}>{service.title}</div>}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <InfoCircleOutlined style={{ marginRight: 8 }} />
            <Card.Meta description={service.description} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DollarOutlined style={{ marginRight: 8 }} />
            <p
              style={{ fontSize: 16, fontWeight: "bold" }}
            >{`$${service.price}`}</p>
          </div>
          <div>
            <StarOutlined /> Rating: {calculateReviewAverage()}{" "}
            <Link to={`/services/${service.id}`}>
            <Rate
              style={{ fontSize: 15, color: "black" }}
              disabled
              allowHalf
              defaultValue={calculateReviewAverage()}
            />
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <EnvironmentOutlined style={{ marginRight: 8 }} />
            <p style={{ marginTop: 15, fontSize: 16 }}>{service.location}</p>
          </div>
          <Button
            type="primary"
            block
            style={{ background: "black", borderColor: "black" }}
            onClick={showModal}
          >
            Book Service
          </Button>
        </Card>
      </Col>
      <Modal
        title="Payment"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <StripeElements>
          <PaymentForm service={service} />
        </StripeElements>
      </Modal>
    </>
  );
};

export default ServiceCard;
