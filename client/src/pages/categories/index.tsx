import useAuth from "../../hooks/auth";
import CategoryList from "./CategoryList";

const CategoryIndexPage: React.FC = () => {
  const auth = useAuth();
  return auth?.role === "admin" ? (
    <CategoryList />
  ) : auth?.role === "seller" ? (
    <CategoryList />
  ) : (
    <CategoryList />
  );
};

export default CategoryIndexPage;
