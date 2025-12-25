import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white px-6 py-3 flex justify-between">
      <div className="flex gap-4">
        <Link to="/products">Products</Link>
        <Link to="/inventory">Inventory</Link>
      </div>
      <button onClick={logout} className="bg-red-500 px-3 rounded">
        Logout
      </button>
    </div>
  );
}
