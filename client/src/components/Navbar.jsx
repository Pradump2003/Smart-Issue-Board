import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../hooks/useUser";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/api/v1/user/logout`, {
        method: "GET",
        credentials: "include",
      });

      toast.success("Logged out successfully 👋");
      setUser(null);
      navigate("/");
    } catch (error) {
      toast.error("Logout failed", error.message);
    }
  };

  return (
    <div className="fixed w-full bg-white shadow-md h-[70px] flex items-center justify-between px-6">
      <h1 className="text-xl font-bold">Welcome, {user?.email}</h1>
      <button
        onClick={handleLogout}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
