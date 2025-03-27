import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { authToken } = useContext(AuthContext);
  const isAuthenticated = !!authToken; // Check if the user object exists

  return { authToken, isAuthenticated };
};

//export default useAuth;
