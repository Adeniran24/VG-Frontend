import { Link, NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Csatahajók
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                end
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active fw-semibold text-white' : 'text-white-50'}`
                }
              >
                Csatahajók
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/denmark-strait"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active fw-semibold text-white' : 'text-white-50'}`
                }
              >
                A Denmark Strait csata
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
