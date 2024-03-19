import React, { useState } from "react";
import "../../pages/UserManagement.css";

const ChangePasswordModal = ({
  isOpen,
  onRequestClose,
  onSubmit,
  selectedUserId,
  title,
}) => {
  const [actualPassword, setActualPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    if (!actualPassword || !newPassword || !confirmNewPassword) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New password and confirm password must match.");
      return;
    }
    // Call onSubmit function with password data
    onSubmit(selectedUserId, actualPassword, newPassword, confirmNewPassword);
    // Clear form and close modal
    setActualPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setErrorMessage("");
    onRequestClose();
  };

  const handleCancel = () => {
    // Clear form and close modal
    setActualPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setErrorMessage("");
    onRequestClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <h2>{title}</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <label htmlFor="actualPassword">Actual Password:</label>
            <input
              type="password"
              id="actualPassword"
              value={actualPassword}
              onChange={(e) => setActualPassword(e.target.value)}
            />
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label htmlFor="confirmNewPassword">Confirm New Password:</label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleSubmit}>Confirm</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePasswordModal;
