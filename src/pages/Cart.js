import React from 'react';
import { useCart } from './../store/CartContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import defaultImage from './../assets/default-image.jpg'; 

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const totalCost = () => {
    let total = 0;

    if (cart && cart.length > 0) {
      cart.forEach((c) => {
        total += c.quantity * c.product.price;
      });
    }
  
    return total;
  }

  const handleError = (event) => {
    // Set the source of the image to the default image if the original image fails to load
    event.target.src = defaultImage;
  };

  return (
    <div>
      <h1 className="search-header">Cart</h1>
      {cart.length > 0 ? cart.map((item, index) => (
        <Card key={index} className='mb-3'>
          <div className='d-flex w-100'>
              <Card.Body className='pb-0 flex-column'>
                        <Card.Title className='pb-0'>{item.product.title}</Card.Title>
                        
                        <div className='pb-3'>            
                          <p>Quantity: {item.quantity} <span className='px-3'>Price: ${item.product.price}</span></p>
                          <Button variant="primary" onClick={() => handleRemove(item.product.id)}>
                            Remove         
                          </Button>
                        </div>
                </Card.Body>
                <img className="d-block w-150 card-img-cart ml-auto" src={item.product.images[0]} alt={`Slide`} onError={handleError}/>
          </div>
           
        </Card>
      )) : <h4 className="search-header text-center">Cart is Empty</h4>}

      {cart.length > 0 ? <h4 className='text-center search-header mb-12'>Total : ${totalCost()}</h4> : ""}
    </div>
  );
};

export default CartPage;
