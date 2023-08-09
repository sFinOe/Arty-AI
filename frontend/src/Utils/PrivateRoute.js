import { Outlet, Navigate } from "react-router-dom";
import { GetAuthMe } from "api/auth";
import { useEffect, useState } from "react";

export const PrivateRoute = ({ element, ...rest }) => {
  let token = localStorage.getItem("jwtToken");

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export const FlexRoute = ({ element, ...rest }) => {
  let token = localStorage.getItem("jwtToken");
  if (!token) token = localStorage.getItem("GuestJwt");

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export const AdminRoute = ({ element, ...rest }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const res = await GetAuthMe();
        if (res.status === 200) {
          const role = res.body.role.name;
          if (role === "Admin") {
            setIsAdmin(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    if (token) {
      checkAdminRole();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (token && isAdmin) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};
