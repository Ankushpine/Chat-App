import { useState } from "react";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const userSignUpHook = () => {
  const [loading, setLoading] = useState();
  const url = import.meta.env.VITE_APP_URL;

  const navigate = useNavigate();

  const signUp = async ({
    fullName,
    userName,
    password,
    cnfpassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      userName,
      password,
      cnfpassword,
      gender,
    });

    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch(`${url}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          cnfpassword,
          gender,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Successfully Signed Up!");
      navigate("/signin");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signUp };
};

export default userSignUpHook;

function handleInputErrors({
  fullName,
  userName,
  password,
  cnfpassword,
  gender,
}) {
  if (!fullName || !userName || !password || !cnfpassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== cnfpassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
