import React, { useState, useEffect } from 'react';
import styles from './ProductAddPage.module.css';
import { ItemInfoForm, UploadImages } from '../ui-elements/owner/productpage';
import Product2d from '../shared/product2d';
import ProductGif from '../shared/productgif';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductAddPage = () => {
  const { isOwner, shopName } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOwner || !shopName) {
      navigate('/'); // Redirect if not an owner or no shop associated
    }
  }, [isOwner, shopName, navigate]);

  if (!isOwner || !shopName) {
    return null; // Or a loading spinner
  }
  const [productInfo, setProductInfo] = useState({
    name: '',
    price: '',
    description: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleImageUpload = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  };

  const handleUploadProduct = (e) => {
    e.preventDefault();
    console.log('Product Info:', productInfo);
    console.log('Selected Image:', selectedImage);
  };

  return (
    <div className={styles.container} style={{ backgroundColor: '#111123' }}>
      <div className={styles.leftColumn}>
        <div className={styles.uploadSection}>
          <h2>Upload Product Pictures</h2>
          <UploadImages onImageUpload={handleImageUpload} />
        </div>
        <div className={styles.gifPreview}>
          <h2>360° GIF Preview</h2>
          <ProductGif product={{ gif: "https://placehold.co/600x400/000000/FFFFFF?text=360%C2%B0+View" }} />
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.detailsSection}>
          <h2>Product Details</h2>
          <ItemInfoForm productInfo={productInfo} setProductInfo={setProductInfo} />
          <div className={styles.actionButtons}>
            <button className={styles.generateButton}>Generate</button>
            <button className={styles.tryAgainButton}>Try Again</button>
          </div>
        </div>
        <div className={styles.demoSection}>
          <div className={styles.clickableDemo}>
            {imagePreviewUrl ? (
              <img src={imagePreviewUrl} alt="Product Preview" className={styles.imagePreview} />
            ) : (
              <div className={styles.placeholder}>Clickable Demo</div>
            )}
          </div>
          <button onClick={handleUploadProduct} className={styles.uploadButton}>
            Upload Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductAddPage;
