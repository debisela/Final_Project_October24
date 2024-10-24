import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/user">User</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  );
};

export default Header;