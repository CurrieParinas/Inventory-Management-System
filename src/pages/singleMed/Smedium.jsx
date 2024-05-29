import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './smedium.scss';

const SMedium = () => {
  const { id } = useParams(); // Extracting the id from the URL
  const [medium, setMedium] = useState(null);
  const [locationId, setLocationId] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [newImage, setNewImage] = useState(null);

  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const [storageMediums, setStorageMediums] = useState([]);
  const [filteredStorageMediums, setFilteredStorageMediums] = useState([]);
  const [showMediumSuggestions, setShowMediumSuggestions] = useState(false);

  useEffect(() => {
    // Fetch medium details from the API
    const fetchMedium = async () => {
      try {
        const response = await fetch(`http://localhost:8080/inventory/medium/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMedium(data);

        // Fetch medium image
        const imageUrl = await fetchMediumImage(id);
        setImage(imageUrl);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedium();
  }, [id]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:8080/inventory/location/all');
        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    const fetchAllMediums = async () => {
      try {
        const response = await fetch(`http://localhost:8080/inventory/medium/parentLocation/${locationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch all mediums');
        }
        const data = await response.json();
        setStorageMediums(data);
      } catch (error) {
        console.error('Error fetching all mediums:', error);
      }
    };

    fetchLocations();
    fetchAllMediums();
  }, [locationId]);

  // Function to fetch the medium image
  const fetchMediumImage = async (mediumId) => {
    try {
      const response = await fetch(`http://localhost:8080/inventory/medium/showImage/${mediumId}`);
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
    const updatedMedium = { ...medium };

    try {
      const response = await fetch(`http://localhost:8080/inventory/medium/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMedium),
      });

      if (!response.ok) {
        throw new Error('Failed to update medium');
      }

      if (newImage) {
        const formData = new FormData();
        formData.append('image', newImage);

        const imageResponse = await fetch(`http://localhost:8080/inventory/medium/uploadImage/${id}`, {
          method: 'POST',
          body: formData,
        });

        if (!imageResponse.ok) {
          throw new Error('Failed to upload image');
        }

        const newImageUrl = await fetchMediumImage(id);
        setImage(newImageUrl);
      }

      setMedium(updatedMedium);
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
    setMedium({ ...medium, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleLocationChange = (e) => {
    const input = e.target.value;
    setShowLocationSuggestions(true);
    if (input) {
      const filtered = locations.filter(location =>
        location.NAME.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
    setMedium({ ...medium, PARENT_LOCATION: { ...medium.PARENT_LOCATION, LOCATION_ID: input } });
  };

  const handleLocationSelect = (locationName, locationID) => {
    setMedium({ ...medium, PARENT_LOCATION: { LOCATION_ID: locationID, NAME: locationName } });
    setLocationId(locationID);
    setShowLocationSuggestions(false);
  };

  const handleMediumChange = (e) => {
    const input = e.target.value;
    setShowMediumSuggestions(true);
    if (input) {
      const filtered = storageMediums.filter(medium =>
        medium.NAME.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredStorageMediums(filtered);
    } else {
      setFilteredStorageMediums([]);
    }
    setMedium({ ...medium, PARENT_MEDIUM: { ...medium.PARENT_MEDIUM, MEDIUM_ID: input } });
  };

  const handleMediumSelect = (mediumName, mediumID) => {
    setMedium({ ...medium, PARENT_MEDIUM: { MEDIUM_ID: mediumID, NAME: mediumName } });
    setShowMediumSuggestions(false);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="medium-item-container">
      <h1 className="medium-item-title">Medium Item Details</h1>
      {medium ? (
        <div className="medium-item-content">
          <div className="medium-item-image">
            {image ? (
              <img src={image} alt={medium.NAME} />
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
          <div className="medium-item-details">
            <p><strong>ID:</strong> <h4 style={{ fontWeight: 400 }}>{medium.MEDIUM_ID}</h4></p>
            <p><strong>Name:</strong> {isEditing ? <input type="text" name="NAME" value={medium.NAME} onChange={handleInputChange} /> : <h4 style={{ fontWeight: 400 }}>{medium.NAME}</h4>}</p>
            <p><strong>Description:</strong> {isEditing ? <input type="text" name="DESCRIPTION" value={medium.DESCRIPTION} onChange={handleInputChange} /> : <h4 style={{ fontWeight: 400 }}>{medium.DESCRIPTION}</h4>}</p>
            <p><strong>Parent Location ID:</strong> {isEditing ? (
              <div className="auto-suggest-container-1">
                <input
                  type="text"
                  name="PARENT_LOCATION"
                  value={medium.PARENT_LOCATION.LOCATION_ID}
                  onChange={handleLocationChange}
                  autoComplete="off"
                />
                {showLocationSuggestions && filteredLocations.length > 0 && (
                  <ul className="suggestions">
                    {filteredLocations.map(location => (
                      <li
                        key={location.LOCATION_ID}
                        onClick={() => handleLocationSelect(location.NAME, location.LOCATION_ID)}
                      >
                        {location.NAME}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : <h4 style={{ fontWeight: 400 }}>{medium.PARENT_LOCATION?.LOCATION_ID ?? 'N/A'}</h4>}</p>
            <p><strong>Parent Medium ID:</strong> {isEditing ? (
              <div className="auto-suggest-container-1">
                <input
                  type="text"
                  name="PARENT_MEDIUM"
                  value={medium.PARENT_MEDIUM?.MEDIUM_ID}
                  onChange={handleMediumChange}
                  autoComplete="off"
                />
                {showMediumSuggestions && filteredStorageMediums.length > 0 && (
                  <ul className="suggestions">
                    {filteredStorageMediums.map(storageMedium => (
                      <li
                        key={storageMedium.MEDIUM_ID}
                        onClick={() => handleMediumSelect(storageMedium.NAME, storageMedium.MEDIUM_ID)}
                      >
                        {storageMedium.NAME}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : 
            <h4 style={{ fontWeight: 400 }}>{medium.PARENT_MEDIUM?.MEDIUM_ID ?? 'N/A'}</h4>}</p>
            <p><strong>Create Date:</strong> <h4 style={{ fontWeight: 400 }}>{new Date(medium.CREATE_DATE).toLocaleString()}</h4></p>
            <p><strong>Last Modified:</strong> <h4 style={{ fontWeight: 400 }}>{new Date(medium.LAST_MODIFIED).toLocaleString()}</h4></p>
            {isEditing ? (
              <div className="edit-buttons">
                <div className="genitemscancelbutton" onClick={handleCancelClick}>
                  <button>Cancel</button>
                </div>
                <div className="addTrackedItemButton" onClick={handleSaveClick}>
                  <button>Save</button>
                </div>
              </div>
            ) : (
              <div className="edit-buttons">
                <div className="addTrackedItemButton" onClick={handleEditClick}>
                  <button>Edit</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>No medium details available</div>
      )}
    </div>
  );
};

export default SMedium;
