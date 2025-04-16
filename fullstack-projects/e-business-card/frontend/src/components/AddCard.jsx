import React, { useState, useRef } from "react";
import "../styles/AddCard.css"; // Import CSS for modal styles
import { createRef } from "react";

export function AddCard({ cards, setCards }) {
  const [showModal, setShowModal] = useState(false);
  
  const nameRef = useRef();
  const descRef = useRef();
  const interestRef = useRef();

  const [socials, setSocials] = useState([
      { id:1, urlRef: createRef(), platformRef: createRef() },
  ]);
  

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  function addCard() {
    const name = nameRef.current.value;
    const description = descRef.current.value;
    const interests = interestRef.current.value.split(",");

    let socialHandles = [];

    socials.forEach((social) => {
      socialHandles.push({ url: social.urlRef.current.value, name: social.platformRef.current.value });
    });
    setCards([...cards, {
      id: cards.length + 1,
      name,
      description,
      interests,
      socialHandles
    }])
    closeModal();
  } 


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
              <button className="close-btn" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <dt>Enter Name</dt>
              <dd>
                <input type="text" ref={nameRef}/>
              </dd>
              <dt>Enter Description</dt>
              <dd>
                <input type="text" ref={descRef}/>
              </dd>

              <dt>Enter Interest(Separate them using ",")</dt>
              <dd>
                <input type="text" ref={interestRef}/>
              </dd>

              <dt>Enter social handles</dt>
              <dd>
                {socials.map((x) => <SocialInput key={x.id} platformRef={x.platformRef} urlRef={x.urlRef}></SocialInput>)}
                <button
                  className="bi bi-plus"
                  onClick={() =>
                    setSocials([
                      ...socials,
                      { id:socials.length + 1, urlRef: createRef(), platformRef: createRef() },
                    ])
                  }
                >
                  Add more
                </button>
              </dd>
            </div>
            <div className="modal-footer">
              <button onClick={closeModal}>Cancel</button>
              <button onClick={addCard}>Save Card</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SocialInput({urlRef, platformRef}) {
  return (
    <>
      <input type="url" placeholder="enter url" ref={urlRef}/>
      <select ref={platformRef}>
        <option value="">Choose platform</option>
        <option value="facebook">Facebook</option>
        <option value="github">Github</option>
        <option value="instagram">Instagram</option>
        <option value="twitter">Twitter</option>
        <option value="linkedin">LinkedIn</option>
      </select>
    </>
  );
}
