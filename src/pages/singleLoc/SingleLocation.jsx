import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './singlelocation.scss';

const SingleLocation = () => {
  const { id } = useParams(); // Extracting the id from the URL
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [newImage, setNewImage] = useState(null);
  const [parentLocations, setParentLocations] = useState([]);
  const [filteredParentLocations, setFilteredParentLocations] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [parentLocationName, setParentLocationName] = useState('');

  useEffect(() => {
    // Fetch location details from the API
    const fetchLocation = async () => {
      try {
        const response = await fetch(`http://localhost:8080/inventory/location/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.PARENT_LOCATION) {
          data.PARENT_LOCATION = data.PARENT_LOCATION.LOCATION_ID;
        }
        setLocation(data);

        // Fetch location image
        const imageUrl = await fetchLocationImage(id);
        setImage(imageUrl);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id]);

  useEffect(() => {
    // Fetch parent locations
    const fetchParentLocations = async () => {
      try {
        const response = await fetch('http://localhost:8080/inventory/location/locationsWithNoParent');
        if (!response.ok) {
          throw new Error('Failed to fetch parent locations');
        }
        const data = await response.json();
        setParentLocations(data);
      } catch (error) {
        console.error('Error fetching parent locations:', error);
      }
    };

    fetchParentLocations();
  }, []);

  // Function to fetch the location image
  const fetchLocationImage = async (locationId) => {
    try {
      const response = await fetch(`http://localhost:8080/inventory/location/showImage/${locationId}`);
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
    const formDataWithImage = new FormData();
    Object.entries(location).forEach(([key, value]) => {
      if (key === "PARENT_LOCATION" && value !== null && value !== undefined) {
        formDataWithImage.append(key, value.LOCATION_ID);
      } else if (key !== "IMAGE" && value !== null && value !== undefined) {
        formDataWithImage.append(key, value);
      }
    });

    if (newImage) {
      Object.entries(newImage).forEach(([key, value]) => {
        formDataWithImage.append(key, value);
      });
    }

    try {
      const response = await fetch(`http://localhost:8080/inventory/location/update/${id}`, {
        method: 'PUT',
        body: formDataWithImage,
      });

      if (!response.ok) {
        throw new Error('Failed to update location');
      }

      console.log(formDataWithImage)

      const newImageUrl = await fetchLocationImage(id);
      setImage(newImageUrl);
      setNewImage(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const handleCancelClick = () => {
    setNewImage(null);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value });

    if (name === 'PARENT_LOCATION') {
      setShowLocationSuggestions(true);
      setParentLocationName(value);
      if (value) {
        const filtered = parentLocations.filter(parentLocation =>
          parentLocation.NAME.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredParentLocations(filtered);
      } else {
        setFilteredParentLocations([]);
      }
    }
  };

  const handleLocationSelect = (locationName, locationID) => {
    setParentLocationName(locationName);
    setLocation(prevState => ({
      ...prevState,
      PARENT_LOCATION: { LOCATION_ID: locationID }
    }));
    setShowLocationSuggestions(false);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= (2 * 1024 * 1024)) { // Max size is 2MB
      setNewImage({ IMAGE: e.target.files[0] });
      setImage(URL.createObjectURL(selectedFile));
    } else {
      alert('File size exceeds the maximum allowed limit (2MB).');
      // Optionally, you can clear the file input field
      e.target.value = null;
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="location-item-container">
      <h1 className="location-item-title">Location Details</h1>
      {location ? (
        <div className="location-item-content">
          <div className="location-item-image">
            {image ? (
              <img src={image} alt={location.NAME} />
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
          <div className="location-item-details">
            <p><strong>ID:</strong> <h4 style={{ fontWeight: 400 }}>{location.LOCATION_ID}</h4></p>
            <p><strong>Name:</strong> {isEditing ? <input type="text" name="NAME" value={location.NAME} onChange={handleInputChange} /> : <h4 style={{ fontWeight: 400 }}>{location.NAME}</h4>}</p>
            <p><strong>Description:</strong> {isEditing ? <input type="text" name="DESCRIPTION" value={location.DESCRIPTION} onChange={handleInputChange} /> : <h4 style={{ fontWeight: 400 }}>{location.DESCRIPTION}</h4>}</p>
            <p><strong>Parent Location ID:</strong> {isEditing ? (
              <div className="auto-suggest-container-1">
                <input
                  type="text"
                  name="PARENT_LOCATION"
                  value={location.PARENT_LOCATION?.LOCATION_ID}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
                {showLocationSuggestions && filteredParentLocations.length > 0 && (
                  <ul className="suggestions">
                    {filteredParentLocations.map(parentLocation => (
                      <li
                        key={parentLocation.LOCATION_ID}
                        onClick={() => handleLocationSelect(parentLocation.NAME, parentLocation.LOCATION_ID)}
                      >
                        {parentLocation.NAME}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : <h4 style={{ fontWeight: 400 }}>{location.PARENT_LOCATION?.LOCATION_ID ?? 'N/A'}</h4>}</p>
            <p><strong>Create Date:</strong> <h4 style={{ fontWeight: 400 }}>{new Date(location.CREATE_DATE).toLocaleString()}</h4></p>
            <p><strong>Last Modified:</strong> <h4 style={{ fontWeight: 400 }}>{new Date(location.LAST_MODIFIED).toLocaleString()}</h4></p>
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
        <p>No location found.</p>
      )}
    </div>
  );
};

export default SingleLocation;
