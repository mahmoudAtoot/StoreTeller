import React, { useState } from 'react';
import styles from './Cashier.module.css';
import axios from 'axios';

const Cashier = ({ hoveredProduct }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [loading, setLoading] = useState(false);
  // DeepSeek chat function inside the component
  const sendToDeepSeek = async (userMessage) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: "deepseek/deepseek-chat", // OpenRouter model format
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
            <img
              src={hoveredProduct.image || 'https://placehold.co/600x400'}
              alt={hoveredProduct.name}
              className={styles.hoveredProductImage}
            />
            <h3>{hoveredProduct.name}</h3>
            <p className={styles.productPrice}>${hoveredProduct.price}</p>
          </div>
        ) : (
          <p className={styles.welcomeMessage}>Hover over an item to see details</p>
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
        <p>No items in cart yet.</p>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button className={styles.cartButton}>View Cart</button>
        <button className={styles.checkoutButton}>Checkout</button>
      </div>
    </div>
  );
};

export default Cashier;