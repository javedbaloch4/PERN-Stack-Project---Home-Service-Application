import { useEffect, useState } from "react";
import { User } from "../redux/features/auth/slice";

const useAuth = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setAuthenticatedUser(parsedUser);
    }
  }, []); 

  return authenticatedUser;
};

export default useAuth;
