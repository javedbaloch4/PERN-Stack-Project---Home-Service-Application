import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import "./App.scss";
import Dashboard from "./pages/dashboard/dashboard";
import UserList from "./pages/users/UserList";
import Login from "./pages/auth/Login";
import PrivateRoutes from "./components/routes/ProtectectRoute";
import CategoryIndexPage from "./pages/categories";
import BookingIndexPage from "./pages/bookings";
import ServiceIndexPage from "./pages/services";
import Register from "./pages/auth/Register";
import SingleService from "./pages/services/SingleService";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/dashboard" index element={<Dashboard />} />
            <Route path="/bookings" element={<BookingIndexPage />} />
            <Route path="/category" element={<CategoryIndexPage />} />
            <Route path="/services" element={<ServiceIndexPage />} />
            <Route path="/services/:id" element={<SingleService />} />
            <Route path="/users" element={<UserList />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
