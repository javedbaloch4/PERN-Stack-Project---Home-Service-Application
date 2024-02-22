import { useEffect } from "react";
import useAuth from "../../hooks/auth";
import { useAppDispatch } from "../../redux/hooks";
import BookService from "../services/BookService";
import ServiceList from "./ServiceList";
import { fetchServices } from "../../redux/features/services/slice";
import { fetchCategories } from "../../redux/features/category/slice";

const ServiceIndexPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchCategories());
  }, []);

  const auth = useAuth();
  return auth?.role === "customer" ? <BookService /> : <ServiceList />;
};

export default ServiceIndexPage;
