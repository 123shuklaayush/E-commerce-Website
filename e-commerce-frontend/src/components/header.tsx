import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";


interface PropsType{
  user: User | null;
}

const Header = ({ user } : PropsType) => {
    const logoutHandler = async () => {
      try{
        await signOut(auth);
        toast.success("Sign Out Successfully")
        setIsOpen(false)
      }
      catch(err){
        toast.error("Something went wrong")
      }
    }
    const [isOpen, setIsOpen] = useState<boolean>(false) ;
  return (
    <nav className="header" >
      <Link onClick={() => setIsOpen(false)} to={"/"}> HOME </Link>
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
