import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const url = import.meta.env.VITE_APP_URL;

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const SignIn = async (userName, password) => {
    const success = handleInputErrors(userName, password);
    if (!success) return;
    setLoading(true);

    try {
      const res = await fetch(`${url}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      const data = await res.json();

      localStorage.setItem("jwt", data.token);

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Successfully Signed In!");

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, SignIn };
};
export default useSignIn;

function handleInputErrors(userName, password) {
  if (!userName || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
