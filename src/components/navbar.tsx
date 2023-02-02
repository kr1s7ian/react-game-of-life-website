import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <li>
        <Link to="/"> Home </Link>
        <Link to="editor"> Editor </Link>
      </li>
    </nav>
  );
};
