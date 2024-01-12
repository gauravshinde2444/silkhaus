
import { Routes, Route, Outlet } from 'react-router-dom';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import Header from './Header';

const Layout = (props) => {
  return (
   <Routes>
   <Route
     path="/"
     element={
         <div className='w-100'>
                 <Header />
                 <div className='mx-5 my-3 main-content'>
                     <Outlet />
                 </div>
                 <div className="footer">
                    <span>T&Cs and Cancellation Policy    |     Privacy Policy</span>
                    <span className='float-r copyright'>&copy; © 2023 Silkhaus | All Rights Reserved</span>
                </div>
         </div>
     }
   >
      <Route exact path="/"  element={
             <Product/>
           }/>
        <Route exact path="/Product"  element={
             <Product/>
           }/>
      <Route exact path="/cart" element={
           <Cart />
      }/>

   </Route>
</Routes>
  );
};

export default Layout;
