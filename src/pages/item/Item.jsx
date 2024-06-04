import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './item.scss';

const Item = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  const [mediums, setMediums] = useState([]);
  const [filteredMediums, setFilteredMediums] = useState([]);
  const [showMediumSuggestions, setShowMediumSuggestions] = useState(false);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/inventory/itemMedium/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItemData(data);
        setEditedData({
          MEDIUM: data.MEDIUM.MEDIUM_ID,
          QUANTITY: data.QUANTITY ? data.QUANTITY : '',
          TYPE: data.TYPE,
          START_CONSUMPTION_DATE: data.START_CONSUMPTION_DATE ? data.START_CONSUMPTION_DATE : '',
          END_CONSUMPTION_DATE: data.END_CONSUMPTION_DATE ? data.END_CONSUMPTION_DATE : ''
        });
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };

    const fetchAllMediums = async () => {
      try {
        const response = await fetch(`http://localhost:8080/inventory/medium/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch all mediums');
        }
        const data = await response.json();
        setMediums(data);
      } catch (error) {
        console.error('Error fetching all mediums:', error);
      }
    };

    fetchItemData();
    fetchAllMediums();
  }, [id]);

  if (!itemData) {
    return <div className="loading">Loading...</div>;
  }

  const { ITEM, MEDIUM, QUANTITY, TYPE, START_CONSUMPTION_DATE, END_CONSUMPTION_DATE} = itemData;
  const { ITEM_ID: itemId, NAME: itemName, DESCRIPTION: itemDescription, BRAND: itemBrand } = ITEM;
  const { MEDIUM_ID: mediumId, NAME: mediumName, DESCRIPTION: mediumDescription, PARENT_LOCATION, PARENT_MEDIUM } = MEDIUM;

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = async () => {
    console.log(editedData)
    const formData = new FormData();
    Object.entries(editedData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    console.log(formData)

    try {
      const response = await fetch(`http://localhost:8080/inventory/itemMedium/update/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedData = await response.json();
      setItemData(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving item data:', error);
    }
  };

  const handleCancelButtonClick = () => {
    setIsEditing(false);
    setEditedData({
      MEDIUM: itemData.MEDIUM.MEDIUM_ID,
      QUANTITY: itemData.QUANTITY,
      TYPE: itemData.TYPE,
      START_CONSUMPTION_DATE: itemData.START_CONSUMPTION_DATE ? itemData.START_CONSUMPTION_DATE : '',
      END_CONSUMPTION_DATE: itemData.END_CONSUMPTION_DATE ? itemData.END_CONSUMPTION_DATE : ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleMediumChange = (e) => {
    const input = e.target.value;
    setShowMediumSuggestions(true);
    if (input) {
      const filtered = mediums.filter(medium =>
        medium.NAME.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredMediums(filtered);
    } else {
      setFilteredMediums([]);
    }
    setEditedData({ ...editedData, MEDIUM: input });
  };

  const handleMediumSelect = (mediumId) => {
    setEditedData({ ...editedData, MEDIUM: mediumId });
    setShowMediumSuggestions(false);
  };

  const renderParentLocation = (location) => {
    if (!location) return null;

    const { NAME, DESCRIPTION, PARENT_LOCATION: parentLocation } = location;

    return (
      <div className="parent-location">
        <p><strong>Parent Location Name:</strong> {NAME}</p>
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
        <p><strong>Parent Medium Name:</strong> {NAME}</p>
        <p><strong>Description:</strong> {DESCRIPTION}</p>
        {renderParentMedium(parentMedium)}
      </div>
    );
  };

  return (
    <div className="itemsingle">
      <h1>Item Details</h1>
      <div className="itemsingle-details">
        <h2>Item Information</h2>
        <p><strong>Name:</strong> {itemName}</p>
        <p><strong>Description:</strong> {itemDescription}</p>
        <p><strong>Brand:</strong> {itemBrand}</p>
      </div>

      <div className="medium-details">
        <h2>Medium Information</h2>
        {isEditing ? (
          <p><strong>Name:</strong>
            <div className="auto-suggest-container">
              <input
                type="text"
                name="MEDIUM"
                value={editedData.MEDIUM}
                onChange={handleMediumChange}
              />
              {showMediumSuggestions && filteredMediums.length > 0 && (
                <ul className="suggestions">
                  {filteredMediums.map(medium => (
                    <li
                      key={medium.MEDIUM_ID}
                      onClick={() => handleMediumSelect(medium.MEDIUM_ID)}
                    >
                      {medium.NAME}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </p>
        ) : (
          <p><strong>Name:</strong> {mediumName}</p>
        )}
        <p><strong>Description:</strong> {mediumDescription}</p>
        {renderParentLocation(PARENT_LOCATION)}
        {renderParentMedium(PARENT_MEDIUM)}
      </div>

      {TYPE !== "U" && (
        <div className="additional-details">
        <h2>Additional Information</h2>
        {isEditing ? (
          <p><strong>Type:</strong>
            <select
              name="TYPE"
              value={editedData.TYPE}
              onChange={handleChange}
            >
              <option value="R">Regular</option>
              <option value="C">Consumable</option>
            </select>
          </p>
        ) : (
          <p><strong>Type:</strong> {TYPE === "R" ? "Regular" : "Consumable"}</p>
        )}
        {editedData.TYPE === "C" && isEditing && (
          <>
            <p><strong>Start Consumption Date:</strong>
              <input
                type="date"
                name="START_CONSUMPTION_DATE"
                value={editedData.START_CONSUMPTION_DATE || ''}
                onChange={handleChange}
              />
            </p>
            <p><strong>End Consumption Date:</strong>
              <input
                type="date"
                name="END_CONSUMPTION_DATE"
                value={editedData.END_CONSUMPTION_DATE || ''}
                onChange={handleChange}
              />
            </p>
          </>
        )}
        {!isEditing && TYPE === "C" && (
          <>
            <p><strong>Start Consumption Date:</strong> {editedData.START_CONSUMPTION_DATE ? new Date(editedData.START_CONSUMPTION_DATE).toLocaleDateString() : 'N/A'}</p>
            <p><strong>End Consumption Date:</strong> {editedData.END_CONSUMPTION_DATE ? new Date(editedData.END_CONSUMPTION_DATE).toLocaleDateString() : 'N/A'}</p>
          </>
        )}
      </div>
      )}

      {TYPE !== "U" && (
        <div className="quantity">
          <h2>Quantity</h2>
          {isEditing ? (
            <p><strong>Amount:</strong>
              <input
                type="number"
                name="QUANTITY"
                value={editedData.QUANTITY}
                onChange={handleChange}
              />
            </p>
          ) : (
            <p><strong>Amount:</strong> {QUANTITY}</p>
          )}
        </div>
      )}

      <div className="actions">
        {isEditing ? (
          <>
            <button className="cancel-button" onClick={handleCancelButtonClick}>Cancel</button>
            <button className="save-button" onClick={handleSaveButtonClick}>Save</button>
          </>
        ) : (
          <button className="edit-button" onClick={handleEditButtonClick}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default Item;
