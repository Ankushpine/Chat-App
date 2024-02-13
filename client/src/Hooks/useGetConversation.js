import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const url = import.meta.env.VITE_APP_URL;

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(`${url}/api/user`, { headers });

        const data = await res.data;

        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
