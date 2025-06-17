import '../../../css/dashboard.css';
import NavbarUser from '../../components/layout/navbarUser.jsx';
import ProfilePhoto from '../../components/card/profilePhoto.jsx';
import InputText from '../../components/input/inputText.jsx';
import ChangePasswordCard from '../../components/card/changePasswordCard.jsx';
import React, { useState, useEffect } from 'react';

export default function ProfileUser() {
  const [showPasswordCard, setShowPasswordCard] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    birthDate: '',
    phone: '',
    address: '',
  });

  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setFormData({
      name: 'Author ',
      email: 'Author@gmail.com',
      gender: 'male',
      birthDate: '2000-06-15',
      phone: '085749353016',
      address: 'Indonesia',
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditable(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data disimpan:', formData);
    setIsEditable(false);
    console.log("Ubah Profil diklik");
  };

  return (
    <div className='dashboardAdmin'>
      <aside>
        <NavbarUser />
      </aside>
      <main className="admin">
        <article className='profile'>
          <ProfilePhoto />
          <form className="profileForm" onSubmit={handleSubmit}>
            <div className="formRow">
              <InputText
                label="Full Nam"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                required
                type="text"
                name="name"
                disabled={!isEditable}
              />
              <InputText
                label="Email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                type="email"
                name="email"
                disabled={!isEditable}
              />
            </div>

            <div className="formRow">
              <div className="inputText">
                <label>Gender</label>
                {!isEditable ? (
                  <input type="text" value={formData.gender === 'male' ? 'Male' : 'Female'} disabled />
                ) : (
                  <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">-- Select Gender --</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                )}
              </div>

              <InputText
                label="Birth Date"
                value={formData.birthDate}
                onChange={handleChange}
                placeholder="DD/MM/YYYY"
                required
                type="date"
                name="birthDate"
                disabled={!isEditable}
              />
            </div>

            <div className="formRow">
              <InputText
                label="No Handphone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                type="text"
                name="phone"
                disabled={!isEditable}
              />
              <InputText
                label="Address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                required
                type="text"
                name="address"
                disabled={!isEditable}
              />
            </div>
            <div className="buttonContainer">
              <button type="button" className='deleteButton' onClick={() => setShowPasswordCard(true)}>
                 Change password
              </button>
              {!isEditable && (
                  <button type="button" className="editBtn" onClick={handleEdit}>
                  Change Profil
                  </button>
              )}
              {isEditable && (
                  <button type="submit" className="saveBtn">
                  Save Profil
                  </button>
              )}
            </div>
          </form>
          {showPasswordCard && (
  <ChangePasswordCard onClose={() => setShowPasswordCard(false)} />
)}
        </article>
      </main>
    </div>
  );
}
