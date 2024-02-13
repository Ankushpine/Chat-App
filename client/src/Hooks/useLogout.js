import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const url = import.meta.env.VITE_APP_URL;

  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${url}/api/auth/signout`, {
        "Content-Type": "application/json",
      });

      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      localStorage.removeItem("jwt");
      setAuthUser(null);
      toast.success("Successfully Signed Out!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
