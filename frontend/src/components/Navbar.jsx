import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
const { userInfo, logout } = useContext(AuthContext);

return ( 
<nav className="bg-black text-white p-4"> 
    <div className="max-w-6xl mx-auto flex justify-between items-center"> 
        <Link to="/"> <h1 className="text-xl font-bold">E-Commerce </h1> </Link>

    <div className="space-x-4">
      <Link to="/">Home</Link>

      {userInfo ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
          <span>
            {userInfo.user.name}
          </span>

          <button
            onClick={logout}
            className="cursor-pointer"
          >Logout</button>
        </> ) : (
        <>
          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

        </>
      )}
    </div>
  </div>
</nav>

);
}

export default Navbar;
