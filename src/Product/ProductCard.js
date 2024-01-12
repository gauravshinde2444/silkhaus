import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Carousel } from 'react-bootstrap';
import { useState } from 'react';
import MessageCardClick from '../common/MessageCardClick';
import { useCart } from './../store/CartContext'; 
import defaultImage from './../assets/default-image.jpg'; 


const ProductCard = ({product}) => {
    const [quantity, setQuantity] = useState(1);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [showMessage, setShowMessage] = useState(false); 
    const { addToCart } = useCart();

    const handleShowMessage = () =>{
        setShowMessage(true);
    };

    const handleCloseMessage = () =>{
        setShowMessage(false);
    };

    const isArrayString = arr => {
        if (typeof arr[0] === 'string') {
          try {
            const firstItemArray = JSON.parse(arr);
            return Array.isArray(firstItemArray);
          } catch (error) {
            return false; // The string is not valid JSON
          }
        }
        return false; // Not an array or the first item is not a string
      };

    const getImages = images => {
            if(isArrayString(images[0])){
               return JSON.parse(images[0]);
            }
            else{
                return images;
            }
    };

    const handleAdd = () => {
        const updatedQuantity = quantity + 1;
        setQuantity(updatedQuantity);
        addToCart(product, updatedQuantity);
    };

    const handleSubtract = () => {
      if (quantity > 0) {
        const updatedQuantity = quantity - 1;
        setQuantity(updatedQuantity);
        addToCart(product, updatedQuantity);
      }
    };

    const handleAddToCart = () => {
      // Perform any necessary actions when adding to cart (e.g., update the cart state)
      addToCart(product, quantity);
      setIsAddedToCart(true);
    };

    const handleError = (event) => {
        // Set the source of the image to the default image if the original image fails to load
        event.target.src = defaultImage;
      };

    return (
    <>
      <div>
          <Card onClick={handleShowMessage}>
                <Carousel>
                {getImages(product.images).map((image, index) => (
                    <Carousel.Item key={index}>
                    <img className="d-block  card-img-top" src={image} alt={`Slide ${index}`} onError={handleError}/>
                    </Carousel.Item>
                ))}
                </Carousel>
                <Card.Body >
                    <Card.Title>{product.title}</Card.Title>

                    <div className='card-body-desc'>
                        <div>
                            Category
                            <p>{product.category.name}</p>
                        </div>
                        <div>
                            Description
                            <p className='desc' title={product.description}>{product.description}</p>
                        </div>
                        <div>
                            Price
                            <p>${product.price}</p>
                        </div>
                    </div>
                    <div className='d-flex'>
                        {!isAddedToCart ? (
                            <Button variant="primary" className='ml-auto' onClick={handleAddToCart}>
                            Add to Cart
                            </Button>
                        ) : (
                           ""
                        )}
                        {isAddedToCart && (
                            <div className='quantity-controls ml-auto'>
                                <Button variant="primary mx-3" onClick={handleSubtract}>
                                    -
                                </Button>
                                <span className='quantity'>{quantity}</span>
                                <Button variant="primary mx-3" onClick={handleAdd}>
                                    +
                                </Button>
                            </div>
                        )}
                 </div>
                </Card.Body>
           </Card>
      </div>

      <MessageCardClick show={showMessage} closeModal={handleCloseMessage}/>
      
    </>
    );
  };
  
  export default ProductCard;
  