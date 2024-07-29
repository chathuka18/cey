import { Link } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  return (
    <div className="bbdoy">
    <div className="admin-page">
      <header className="admin-header">
        <h1>Welcome to the Ceyline Group ADMIN Portal</h1>
      </header>
      <main className="admin-main">
        <nav className="admin-nav">
          <ul>
            <li>
              <Link to="/register" className="nav-link">Register</Link>
            </li>
            <li>
              <Link to="/companylist" className="nav-link">Admin Dashboard</Link>
            </li>
          </ul>
        </nav>
      </main>
      <footer className="admin-footer">
        <p>© 2024 Ceyline Group. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
};

export default Admin;
