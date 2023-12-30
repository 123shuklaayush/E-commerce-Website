import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

const user = { _id: "df", role: "adfmin" };

const Header = () => {
    const logoutHandler = () => {
        setIsOpen(false)
    }
    const [isOpen, setIsOpen] = useState<boolean>(false) ;
  return (
    <nav className="header" >
      <Link onClick={() => setIsOpen(false)} to={"/"}> Home </Link>
      <Link onClick={() => setIsOpen(false)} to={"/search"}>
        {" "}
        <FaSearch />{" "}
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/cart"}>
        {" "}
        <FaShoppingBag />
      </Link>

      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" ? (
                <Link to="/admin/dashboard">Admin</Link>
              ) : null}
              <Link onClick={() => setIsOpen(false)} to="/orders">Orders</Link>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link onClick={() => setIsOpen(false)} to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
