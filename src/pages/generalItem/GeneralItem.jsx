import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './generalitem.scss';

const GeneralItem = () => {
  const { id } = useParams(); // Extracting the id from the URL
  const [item, setItem] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    // Fetch item details from the API
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:8080/inventory/item/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItem(data);

        // Fetch item image
        const imageUrl = await fetchItemImage(id);
        setImage(imageUrl);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  // Function to fetch the item image
  const fetchItemImage = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8080/inventory/item/showImage/${itemId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const imageData = await response.blob();
      return URL.createObjectURL(imageData);
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    // Logic to save the updated details
    const updatedItem = { ...item };

    try {
      const response = await fetch(`http://localhost:8080/inventory/item/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      if (newImage) {
        const formData = new FormData();
        formData.append('image', newImage);

        const imageResponse = await fetch(`http://localhost:8080/inventory/item/uploadImage/${id}`, {
          method: 'POST',
          body: formData,
        });

        if (!imageResponse.ok) {
          throw new Error('Failed to upload image');
        }

        const newImageUrl = await fetchItemImage(id);
        setImage(newImageUrl);
      }

      setItem(updatedItem);
      setIsEditing(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="general-item-container">
      <h1 className="general-item-title">General Item Details</h1>
      {item ? (
        <div className="general-item-content">
          <div className="general-item-image">
            {image ? (
              <img src={image} alt={item.NAME} />
            ) : (
              <div className="placeholder-image">No Image Available</div>
            )}
            {isEditing && (
              <label className="custom-file-upload">
                <input type="file" onChange={handleImageChange} />
                Upload New Image
              </label>
            )}
          </div>
          <div className="general-item-details">
            <p><strong>ID:</strong> <h4 style={{ fontWeight: 400 }}>{item.ITEM_ID}</h4></p>
            <p><strong>Name:</strong> {isEditing ? <input type="text" name="NAME" value={item.NAME} onChange={handleInputChange} /> : <h4 style={{ fontWeight: 400 }}>{item.NAME}</h4>}</p>
            <p><strong>Description:</strong> {isEditing ? <input type="text" name="DESCRIPTION" value={item.DESCRIPTION} onChange={handleInputChange} /> : <h4 style={{ fontWeight: 400 }}>{item.DESCRIPTION}</h4>}</p>
            <p><strong>Brand:</strong> {isEditing ? <input type="text" name="BRAND" value={item.BRAND} onChange={handleInputChange} /> : <h4 style={{ fontWeight: 400 }}>{item.BRAND}</h4>}</p>
            <p><strong>Codename:</strong> {isEditing ? <input type="text" name="CODENAME" value={item.CODENAME} onChange={handleInputChange} /> : <h4 style={{ fontWeight: 400 }}>{item.CODENAME || 'N/A'}</h4>}</p>
            <p><strong>Create Date:</strong> <h4 style={{ fontWeight: 400 }}>{new Date(item.CREATE_DATE).toLocaleString()}</h4></p>
            <p><strong>Last Modified:</strong> <h4 style={{ fontWeight: 400 }}>{new Date(item.LAST_MODIFIED).toLocaleString()}</h4></p>
            {isEditing ? (
              <div className="edit-buttons">
                <div className="genitemscancelbutton" onClick={handleCancelClick}>
                  <button >Cancel</button>
                </div>
                <div className="addTrackedItemButton" onClick={handleSaveClick}>
                  <button >Save</button>
                </div>
              </div>
            ) : (
              <div className="edit-buttons">
                <div className="addTrackedItemButton" onClick={handleEditClick}>
                  <button >Edit</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>No item found.</p>
      )}
    </div>
  );
};

export default GeneralItem;
