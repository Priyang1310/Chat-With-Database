import React, { useContext, useState, useEffect } from 'react';
import { curr_context } from '../../contexts/Central';
import './UserProfile.css';

const UserProfileModal = ({ isOpen, onClose }) => {
  const { user = {}, set_user } = useContext(curr_context);
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);

  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditPhone(user.phone || '');
      setEditAddress(user.address || '');
      setIsLoading(false);
    }
  }, [user]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setShowConfirmation(true);
    setConfirmationAction(() => () => {
      set_user({ ...user, name: editName, phone: editPhone, address: editAddress });
      setEditMode(false);
      setShowConfirmation(false);
    });
  };

  const handleCancelClick = () => {
    setShowConfirmation(true);
    setConfirmationAction(() => () => {
      setEditMode(false);
      setShowConfirmation(false);
    });
  };

  const handleConfirm = () => {
    confirmationAction();
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        {isLoading ? (
          <div className="loader"></div>
        ) : user ? (
          <>
            <img className="user-profile-avatar" src={user.picture} alt="User Avatar" />
            {editMode ? (
              <div className="user-profile-edit-form">
                <div className="form-group">
                  <label htmlFor="editName">Name:</label>
                  <input
                    type="text"
                    id="editName"
                    value={editName}
                    style={{color:"black"}}
                    onChange={(e) => setEditName(e.target.value)}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editPhone">Phone:</label>
                  <input
                    type="text"
                    id="editPhone"
                    value={editPhone}
                    style={{color:"black"}}
                    onChange={(e) => setEditPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editAddress">Address:</label>
                  <input
                    type="text"
                    id="editAddress"
                    value={editAddress}
                    style={{color:"black"}}
                    onChange={(e) => setEditAddress(e.target.value)}
                  />
                </div>
                <button className="save-button" onClick={handleSaveClick}>Save</button>
                <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
              </div>
            ) : (
              <div className="user-profile-details">
                <h3>{user.name}</h3>
                <p>{user.address || '215 Vine St, Scranton PA 18503, United States'}</p>
                <p>{user.phone || '+1 555-555-5555'}</p>
                <p>{user.email}</p>
                <button className="edit-button" onClick={handleEditClick}>Edit information</button>
              </div>
            )}
          </>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>

      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure?</p>
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={handleCloseConfirmation}>No</button>
        </div>
      )}
    </div>
  );
};

export default UserProfileModal;