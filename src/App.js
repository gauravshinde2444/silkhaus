import Layout from './common/Layout';
import './scss/main.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './store/CartContext';

export default function App() {
  return (
    <div className="App">
       <CartProvider>
          <Router>
            <Layout />
          </Router>
       </CartProvider>

    </div>
  );
}
