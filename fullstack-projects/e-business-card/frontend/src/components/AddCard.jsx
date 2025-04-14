import React, { useState } from 'react';
import '../styles/AddCard.css'; // Import CSS for modal styles

export function AddCard() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div>
      <button onClick={openModal} className="add-card-btn">
        Add Business Card <span className="plus-icon">+</span>
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Electronic Business Card</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
                <dd>
                    Enter Name
                </dd>
                <dt>
                    <input type="text" />
                </dt>
                <dd>
                    Enter Description
                </dd>
                <dt>
                    <input type="text" />
                </dt>

                <dd>
                    Enter Interest(Separate them using ",")
                </dd>
                <dt>
                    <input type="text" />
                </dt>

                
            </div>
            <div className="modal-footer">
              <button onClick={closeModal}>Cancel</button>
              <button>Save Card</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
