import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import { useUser } from "./useUser";

const ProtectionComponent = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null; // In case the component renders before redirecting
};

export default ProtectionComponent;
