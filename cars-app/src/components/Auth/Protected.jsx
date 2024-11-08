import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";

const Protected = ({ children, roles }) => {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!token) {
    navigate({ to: "/login" });
    return;
  }

  if (token && user && roles.length) {
    if (!roles.includes(user.role_id)) {
      navigate({ to: "/" });
      return;
    }
  }

  return children;
};

export default Protected;
