import Logo from './../assets/logo.svg';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className="top-row">
      <div className="d-flex mx-5">
         <img className="logo" src={Logo} alt="not-found" /> 
        
        <div className="header-list">
          <NavLink to="/Product" className="px-3 cursor-pointer link" exact activeClassName="active">
            Product
          </NavLink>
          <NavLink to="/cart" className="px-3 cursor-pointer link" exact activeClassName="active">
            Cart
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
