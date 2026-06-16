import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between">
        <Link to="/">
          <h1 className="text-xl font-bold">
            E-Commerce
          </h1>
        </Link>

        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;