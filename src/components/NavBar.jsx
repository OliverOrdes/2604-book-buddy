import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { token, logout } = useAuth();

  return (
    <nav>
      <Link to="/books">Books</Link>
      <Link to="/account">Account</Link>
      {token ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
