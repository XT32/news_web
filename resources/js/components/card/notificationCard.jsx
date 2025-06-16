import React from 'react';
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import '../../../css/card.css'

export default function NotificationCard({ type = 'info', title, message, time }) {
  const getIcon = () => {
    switch (type) {
      case 'success': return <FaCheckCircle />;
      case 'warning': return <FaExclamationTriangle />;
      case 'error': return <FaTimesCircle />;
      default: return <FaInfoCircle />;
    }
  };

  return (
    <div className={`notification-card ${type}`}>
      <div className="icon">{getIcon()}</div>
      <div className="content">
        <h4>{title}</h4>
        <p>{message}</p>
        <span className="time">{time}</span>
      </div>
    </div>
  );
}
