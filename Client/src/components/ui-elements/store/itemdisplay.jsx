import ProductGif from '../../shared/productgif';
import styles from './itemdisplay.module.css';
import { useCart } from '../../../context/CartContext';

const ItemDisplay = ({ product, onClose }) => {
    const { addItemToCart } = useCart();

    const handleAddToCart = () => {
        addItemToCart(product);
        onClose(); // Close the modal after adding to cart
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.row}>
                    <div className={styles.productGif}>
                        <ProductGif product={product} />
                    </div>
                    <div className={styles.colMd6}>
                        <h2>{product.name}</h2>
                        <h3>${product.price}</h3>
                        <p>{product.description || 'No description available.'}</p>
                        <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDisplay;
