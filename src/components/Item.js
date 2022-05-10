import React from 'react';
import "../styles/Item.css";

export default function Item({ item, itemPopupTrigger, setItemPopupTrigger }) {
  return itemPopupTrigger ? (
    <div className="item-popup">
      <div className="item-popup-inner">
        <p>Item id: {item.id}</p>
        <p>Tracking code: {item.tracking_code.code}</p>
        <p>Location: 
            {` ${item.city}, 
            ${item.state},
            ${item.country.name}
            `}
        </p>
        <button onClick={() => setItemPopupTrigger(false)}>
          Close
        </button>
      </div>
    </div>
  ) : (
    ''
  );
}
