import React, { useState, useCallback } from 'react';
import styles from './uploadimages.module.css';

const UploadImages = ({ onImageUpload, id, accept }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onImageUpload(files);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    onImageUpload(files);
  }, [onImageUpload]);

  return (
    <div 
      className={`${styles.container} ${isDragging ? styles.dragging : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        id={id} 
        multiple 
        accept={accept || "image/*"} 
        onChange={handleFileChange} 
        className={styles.fileInput}
      />
      <label htmlFor={id} className={styles.uploadLabel}>
        <div className={styles.uploadIcon}>☁️</div>
        <div>Choose files to Upload</div>
        <div className={styles.dragDropText}>or drag and drop</div>
      </label>
    </div>
  );
};

export default UploadImages;