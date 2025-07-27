import React, { useState, useEffect } from 'react';
import styles from './ProductAddPage.module.css';
import { ItemInfoForm, UploadImages } from '../ui-elements/owner/productpage';
import Product2d from '../shared/product2d';
import ProductGif from '../shared/productgif';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductAddPage = () => {
  const { isOwner, shopName } = useAuth();
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState({
    name: '',
    price: '',
    description: '',
    category: '', // Initialize category
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [selectedGif, setSelectedGif] = useState(null);
  const [gifPreviewUrl, setGifPreviewUrl] = useState(null);

  if (!isOwner || !shopName) {
    return (
      <div className={styles.container} style={{ backgroundColor: '#111123', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>You must be an owner and have an associated shop to add products.</p>
      </div>
    );
  }

  const handleImageUpload = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    } else {
      setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  };

  const handleGifUpload = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedGif(file);
      setGifPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedGif(null);
      setGifPreviewUrl(null);
    }
  };

  const handleUploadProduct = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert('Please upload a 2D image for the product.');
      return;
    }

    const formData = new FormData();
    formData.append('name', productInfo.name);
    formData.append('price', productInfo.price);
    formData.append('description', productInfo.description);
    formData.append('category', productInfo.category);
    formData.append('shopName', shopName); // Assuming shopName is available from useAuth()
    formData.append('image', selectedImage);
    if (selectedGif) {
      formData.append('gif', selectedGif);
    }

    try {
      const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product uploaded successfully:', response.data);
      navigate('/'); // Redirect to shop page after successful upload
      // Optionally clear form or redirect
      setProductInfo({ name: '', price: '', description: '', category: '' });
      setSelectedImage(null);
      setImagePreviewUrl(null);
      setSelectedGif(null);
      setGifPreviewUrl(null);
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Error uploading product. Please try again.');
    }
  };

  return (
    <div className={styles.container} style={{ backgroundColor: '#111123' }}>
      <div className={styles.leftColumn}>
        <div className={styles.uploadSection}>
          <h2>Upload 2D Product Image</h2>
          <UploadImages onImageUpload={handleImageUpload} id="imageUpload2D" />
        </div>
        <div className={styles.uploadSection}>
          <h2>Upload 360° GIF (Optional)</h2>
          <UploadImages onImageUpload={handleGifUpload} accept="image/gif" id="imageUploadGif" />
        </div>
        <div className={styles.gifPreview}>
          <h2>360° GIF Preview</h2>
          {gifPreviewUrl ? (
            <ProductGif product={{ gif: gifPreviewUrl }} />
          ) : (
            <div className={styles.placeholder}>No GIF selected</div>
          )}
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
