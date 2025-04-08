import {Link} from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav style={{ background: '#eee', padding: '10px', display: 'flex', gap: '20px' }}>
  <Link to="/" style={{ textDecoration: 'none', color: '#555' }}>Home</Link>
  <Link to="/saved" style={{ textDecoration: 'none', color: '#555' }}>Potential Candidates</Link>
</nav>
  );
};

export default Nav;
