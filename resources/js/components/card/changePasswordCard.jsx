import React, { useState } from 'react';
import '../../../css/card.css';
import inputText from '../input/inputText.jsx'
import InputText from '../input/inputText.jsx';

export default function ChangePasswordCard({ onClose }) {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      alert('password not match');
      return;
    }
    console.log('Password successfully changed:', form);
    onClose();
  };

  return (
    <div className="passwordCardOverlay">
      <div className="passwordCard">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Current Password</label>
            <div className='input'>
            <InputText
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              required
            />
            </div>
          </div>
          <div className="formGroup">
            <label>New Password</label>
            <div className='input'>
            <InputText
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
            </div>
          </div>
          <div className="formGroup">
            <label>Confirm Password</label>
            <div className='input'>
            <InputText
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            </div>
          </div>
          <div className="buttonGroup">
            <button type="button" className="cancelButton" onClick={onClose}>Cancel</button>
            <button type="submit" className="saveButton">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
