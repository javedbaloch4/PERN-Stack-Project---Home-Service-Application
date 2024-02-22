import useAuth from "../../hooks/auth";
import BookService from "../services/BookService";
import BookingList from "./BookingList";

const BookingIndexPage: React.FC = () => {
  const auth = useAuth();
  // return auth?.role === "customer" ? <BookService /> : <BookingList />;
  return <BookingList />;
};

export default BookingIndexPage;
