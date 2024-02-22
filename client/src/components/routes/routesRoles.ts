import Dashboard from "../../pages/dashboard/dashboard";
import CategoryList from "../../pages/categories/CategoryList";
import BookingList from "../../pages/bookings/BookingList";
import ServiceList from "../../pages/services/ServiceList";

export const routeRoles = [
  {
    path: "/dashboard",
    element: Dashboard,
    role: ["admin", "customer", "seller"],
  },
  {
    path: "/category",
    element: CategoryList,
    role: ["customer", "seller"],
  },
  {
    path: "/bookings",
    element: BookingList,
    role: ["admin", "customer", "seller"],
  },
  {
    path: "/services",
    element: ServiceList,
    role: ["admin", "customer", "seller"],
  },
];
