import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './item.scss';

const Item = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/inventory/itemMedium/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItemData(data);
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };

    fetchItemData();
  }, [id]);

  if (!itemData) {
    return <div>Loading...</div>;
  }

  const { ITEM, MEDIUM, QUANTITY, TYPE, START_CONSUMPTION_DATE, END_CONSUMPTION_DATE } = itemData;
  const { NAME: itemName, DESCRIPTION: itemDescription, BRAND: itemBrand } = ITEM;
  const { NAME: mediumName, DESCRIPTION: mediumDescription, PARENT_LOCATION, PARENT_MEDIUM } = MEDIUM;

  const renderParentLocation = (location) => {
    if (!location) return null;

    const { NAME, DESCRIPTION, PARENT_LOCATION: parentLocation } = location;

    return (
      <div className="parent-location">
        <p><strong>Name:</strong> {NAME}</p>
        <p><strong>Description:</strong> {DESCRIPTION}</p>
        {renderParentLocation(parentLocation)}
      </div>
    );
  };

  const renderParentMedium = (medium) => {
    if (!medium) return null;

    const { NAME, DESCRIPTION, PARENT_MEDIUM: parentMedium } = medium;

    return (
      <div className="parent-medium">
        <p><strong>Name:</strong> {NAME}</p>
        <p><strong>Description:</strong> {DESCRIPTION}</p>
        {renderParentMedium(parentMedium)}
      </div>
    );
  };

  return (
    <div className="item">
      <h1>Item Details</h1>
      <div className="item-details">
        <h2>Item Information</h2>
        <p><strong>Name:</strong> {itemName}</p>
        <p><strong>Description:</strong> {itemDescription}</p>
        <p><strong>Brand:</strong> {itemBrand}</p>
      </div>

      <div className="medium-details">
        <h2>Medium Information</h2>
        <p><strong>Name:</strong> {mediumName}</p>
        <p><strong>Description:</strong> {mediumDescription}</p>
        {renderParentLocation(PARENT_LOCATION)}
        {renderParentMedium(PARENT_MEDIUM)}
      </div>

      <div className="additional-details">
        <h2>Additional Information</h2>
        <p><strong>Type:</strong> {TYPE}</p>
        {TYPE === "C" && (
          <>
            <p><strong>Start Consumption Date:</strong> {START_CONSUMPTION_DATE ? new Date(START_CONSUMPTION_DATE).toLocaleString() : 'N/A'}</p>
            <p><strong>End Consumption Date:</strong> {END_CONSUMPTION_DATE ? new Date(END_CONSUMPTION_DATE).toLocaleString() : 'N/A'}</p>
          </>
        )}
      </div>

      {TYPE !== "U" && (
        <div className="quantity">
          <h2>Quantity</h2>
          <p>{QUANTITY}</p>
        </div>
      )}
    </div>
  );
};

export default Item;
