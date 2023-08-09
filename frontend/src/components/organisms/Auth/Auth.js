import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetAuthMe } from "api/auth";
import { Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export function checkSession(validPath, invalidPath) {
  const isAuthenticated = localStorage.getItem("jwtToken");

  if (isAuthenticated) {
    return <Navigate to={validPath} />;
  }

  return null;
}
