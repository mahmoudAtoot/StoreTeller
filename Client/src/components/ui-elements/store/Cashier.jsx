import React, { useState } from 'react';
import styles from './Cashier.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cashier = ({ hoveredProduct }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // DeepSeek chat function inside the component
  const sendToDeepSeek = async (userMessage) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: "deepseek/deepseek-chat-v3-0324:free", 
          messages: [
            { role: 'system', content: 'You are a helpful cashier assistant.' },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7
        },
        {
          headers: {
            Authorization: "Bearer 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",
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('❌ DeepSeek API Error:', error);
      if (error.response?.status === 401) {
        return 'Unauthorized: Please check your API key configuration.';
      } else if (error.response?.status === 429) {
        return 'Rate limit exceeded. Please try again later.';
      } else if (error.response?.status === 400) {
        return 'Bad request. Please check the message format.';
      }
      return `Error: ${error.response?.data?.error?.message || 'Something went wrong with the assistant.'}`;
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const reply = await sendToDeepSeek(chatInput);
    if (reply) {
      setChatResponse(reply);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleChat();
    }
  };

  return (
    <div className={styles.cashierContainer}>
      <h2 className={styles.cashierTitle}>Cashier</h2>

      {/* Hovered Product Info */}
      <div className={styles.displaySection}>
        {hoveredProduct ? (
          <div className={styles.hoveredProductInfo}>
            {hoveredProduct.image && <img src={`http://localhost:8000${hoveredProduct.image}`} alt={hoveredProduct.name} className={styles.hoveredProductImage} />}

            <h3>{hoveredProduct.name}</h3>
            <p className={styles.productPrice}>${hoveredProduct.price}</p>
          </div>
        ) : (
          null
        )}
      </div>

      {/* DeepSeek Assistant */}
      <div className={styles.chatAssistant}>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask the assistant..."
          disabled={loading}
        />
        <button onClick={handleChat} disabled={loading || !chatInput.trim()}>
          {loading ? 'Thinking...' : 'Ask'}
        </button>
        {chatResponse && <p className={styles.response}>{chatResponse}</p>}
      </div>

      {/* Cart Summary */}
      <div className={styles.cartSummary}>
        <h4>Cart Summary</h4>
        {/* Placeholder for cart items */}
        <p>No items in cart yet.</p>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button className={styles.cartButton} onClick={() => navigate('/cart')}>View Cart</button>
        <button className={styles.checkoutButton} onClick={() => navigate('/checkout')}>Checkout</button>
      </div>
    </div>
  );
};

export default Cashier;