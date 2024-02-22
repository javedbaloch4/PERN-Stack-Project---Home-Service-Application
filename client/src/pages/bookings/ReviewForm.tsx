import { Button, Rate, Result } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { createReview } from "../../redux/features/reviews/slice";
import { useAppDispatch } from "../../redux/hooks";

interface ReviewFormProps {
  reviewData: {
    isOpen: boolean;
    userId: number;
    serviceId: number;
  };
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  reviewData,
}: ReviewFormProps) => {
  // States
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewStatus, setReviewStatus] = useState(false);

  // Hooks
  const dispatch = useAppDispatch();

  const data = {
    rating: rating,
    comment: comment,
    serviceId: reviewData.serviceId,
    userId: reviewData.userId,
  };

  const postReview = () => {
    console.log("Review Data", reviewData);
    console.log("POST Review Data", data);

    dispatch(createReview(data));
    setReviewStatus(true);
  };

  return (
    <div style={{ display: reviewData.isOpen ? "block" : "none" }}>
      {!reviewStatus ? (
        <div>
          <Rate
            allowHalf
            onChange={(v) => setRating(v)}
            style={{ marginBottom: 15 }}
          />
          <TextArea
            rows={4}
            placeholder="Write a review"
            onChange={(v) => setComment(v.target.value)}
          />

          <div style={{ marginTop: "10px" }}>
            <small>Post review and mark booking complete</small> <br />
            <Button onClick={postReview}>Submit Review</Button>
          </div>
        </div>
      ) : (
        <Result status="success" title="Your review has been posted" />
      )}
    </div>
  );
};

export default ReviewForm;
