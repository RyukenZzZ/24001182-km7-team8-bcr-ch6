import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";

const Protected = ({ children, roles }) => {
    const navigate = useNavigate();
    const { token, user } = useSelector((state) => state.auth);
    if (!token) {
        navigate("/login");
        return;
    }

    if (user && !roles.includes(user.role_id)) {
        const  isCanAccess = roles.includes(user.role_id);
        if(!isCanAccess){
            navigate("/");
            return;
        }
    }
    return children;
};
export default Protected;