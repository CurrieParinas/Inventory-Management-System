import React, { useRef, useEffect, useState } from 'react';
import './additem.scss';

const AddItem = (props) => {
  const modalRef = useRef();
  const [isTracked, setIsTracked] = useState(false);
  const [itemType, setItemType] = useState('regular');
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [storageMediums, setStorageMediums] = useState([]);
  const [filteredStorageMediums, setFilteredStorageMediums] = useState([]);
  const [showMediumSuggestions, setShowMediumSuggestions] = useState(false);
  const [allMediums, setAllMediums] = useState([]);
  const [filteredAllMediums, setFilteredAllMediums] = useState([]);
  const [showAllMediumSuggestions, setShowAllMediumSuggestions] = useState(false);
  const [imageName, setImageName] = useState('Choose File');
  const [itemName, setItemName] = useState('');
  const [mediumName, setMediumName] = useState('');
  const [locationName, setLocationName] = useState('');
  const [itemId, setItemId] = useState('');
  const [mediumId, setMediumId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [itemNames, setItemNames] = useState([]);
  const [filteredItemNames, setFilteredItemNames] = useState([]);
  const [showItemNameSuggestions, setShowItemNameSuggestions] = useState(false);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  const handleClose = () => {
    props.setOpen(false);
    setIsTracked(false);
    setItemType('regular');
    props.resetFormData();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (props.className === 'trackeditems') {
      setIsTracked(true);
    }
  }, [props.className]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        let response;
        if (props.className === "Location") {
          response = await fetch('http://localhost:8080/inventory/location/locationsWithNoParent');
        } else {
          response = await fetch('http://localhost:8080/inventory/location/all');
        }
        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchStorageMediums = async () => {
      try {
        const response = await fetch(`http://localhost:8080/inventory/medium/parentLocation/${locationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch storage mediums');
        }
        const data = await response.json();
        setStorageMediums(data);
      } catch (error) {
        console.error('Error fetching storage mediums:', error);
      }
    };

    fetchStorageMediums();
  }, [locationId]);

  useEffect(() => {
    const fetchItemNames = async () => {
      try {
        const response = await fetch('http://localhost:8080/inventory/item/all');
        if (!response.ok) {
          throw new Error('Failed to fetch item names');
        }
        const data = await response.json();
        setItemNames(data);
      } catch (error) {
        console.error('Error fetching item names:', error);
      }
    };

    fetchItemNames();
  }, []);

  useEffect(() => {
    const fetchAllMediums = async () => {
      try {
        const response = await fetch('http://localhost:8080/inventory/medium/all');
        if (!response.ok) {
          throw new Error('Failed to fetch all mediums');
        }
        const data = await response.json();
        setAllMediums(data);
      } catch (error) {
        console.error('Error fetching all mediums:', error);
      }
    };

    fetchAllMediums();
  }, []);

  const handleLocationChange = (e) => {
    const input = e.target.value;
    props.handleChange(e);
    setShowLocationSuggestions(true);
    if (input) {
      const filtered = locations.filter(location =>
        location.NAME.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  };

  const handleLocationSelect = (locationName, locationID) => {
    setLocationName(locationName);
    setLocationId(locationID);
    props.setFormData(prevState => ({
      ...prevState,
      PARENT_LOCATION: locationID // Set the location ID here
    }));
    setShowLocationSuggestions(false);
  };

  const handleMediumChange = (e) => {
    const input = e.target.value;
    props.handleChange(e);
    setShowMediumSuggestions(true);
    if (input) {
      const filtered = storageMediums.filter(medium =>
        medium.NAME.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredStorageMediums(filtered);
    } else {
      setFilteredStorageMediums([]);
    }
  };

  const handleMediumSelect = (mediumName, mediumID) => {
    setMediumName(mediumName);
    setMediumId(mediumID);
    props.setFormData(prevState => ({
      ...prevState,
      PARENT_MEDIUM: mediumID
    }));
    setShowMediumSuggestions(false);
  };

  const handleAllMediumChange = (e) => {
    const input = e.target.value;
    props.handleChange(e);
    setShowAllMediumSuggestions(true);
    if (input) {
      const filtered = allMediums.filter(medium =>
        medium.NAME.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredAllMediums(filtered);
    } else {
      setFilteredAllMediums([]);
    }
  };

  const handleAllMediumSelect = (mediumName, mediumID) => {
    setMediumName(mediumName);
    setMediumId(mediumID);
    props.setFormData(prevState => ({
      ...prevState,
      MEDIUM: mediumID
    }));
    setShowAllMediumSuggestions(false);
  };

  const handleItemNameChange = (e) => {
    const input = e.target.value;
    props.handleChange(e);
    setShowItemNameSuggestions(true);
    if (input) {
      const filtered = itemNames.filter(item =>
        item.NAME.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredItemNames(filtered);
    } else {
      setFilteredItemNames([]);
    }
  };

  const handleItemNameSelect = (itemName, itemID) => {
    setItemName(itemName);
    setItemId(itemID);
    props.setFormData(prevState => ({
      ...prevState,
      ITEM: itemID,
    }));
    setShowItemNameSuggestions(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
    } else {
      setImageName('Choose File');
    }
    props.handleImageChange(e);
  };

  const handleTypeSelect = (e) => {
    props.setFormData(prevState => ({
      ...prevState,
      TYPE: e
    }));
  }

  useEffect(() => {
    handleTypeSelect("R");
  }, []);

  return (
    <div className='additem'>
      <div className="modal" ref={modalRef}>
        <span className="close" onClick={handleClose}>x</span>
        <h1>Add New {props.slug}</h1>
        <form onSubmit={props.handleSubmit}>
          {props.columns.filter(
            item => item.headerName !== "ID" && item.field !== "CREATE_DATE" && item.field !== "LAST_MODIFIED"
          ).map(column => (
            (column.field !== 'QUANTITY' || props.className === 'trackeditems' || isTracked) && column.field !== 'END_CONSUMPTION_DATE' &&
            column.field !== 'START_CONSUMPTION_DATE' && (
              <div className="item" key={column.field}>
                <label htmlFor={column.field}>{column.headerName}: </label>
                {column.field === 'PARENT_LOCATION' ? (
                  <div className="auto-suggest-container">
                    <input
                      type="text"
                      name={column.field}
                      value={props.formData[column.field] !== locationId ? props.formData[column.field] : locationName}
                      onChange={handleLocationChange}
                      placeholder={column.placeholder}
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
                ) : column.field === 'PARENT_MEDIUM' ? (
                  <div className="auto-suggest-container">
                    <input
                      type="text"
                      name={column.field}
                      value={props.formData[column.field] !== mediumId ? props.formData[column.field] : mediumName}
                      onChange={handleMediumChange}
                      placeholder={column.placeholder}
                      autoComplete="off"
                    />
                    {showMediumSuggestions && filteredStorageMediums.length > 0 && (
                      <ul className="suggestions">
                        {filteredStorageMediums.map(medium => (
                          <li
                            key={medium.MEDIUM_ID}
                            onClick={() => handleMediumSelect(medium.NAME, medium.MEDIUM_ID)}
                          >
                            {medium.NAME}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : column.field === 'MEDIUM_NAME' ? (
                  <div className="auto-suggest-container">
                    <input
                      type="text"
                      name={column.field}
                      value={props.formData["MEDIUM"] !== mediumId ? props.formData["MEDIUM"] : mediumName}
                      onChange={handleAllMediumChange}
                      placeholder={column.placeholder}
                      autoComplete="off"
                    />
                    {showAllMediumSuggestions && filteredAllMediums.length > 0 && (
                      <ul className="suggestions">
                        {filteredAllMediums.map(medium => (
                          <li
                            key={medium.MEDIUM_ID}
                            onClick={() => handleAllMediumSelect(medium.NAME, medium.MEDIUM_ID)}
                          >
                            {medium.NAME}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : column.field === 'NAME' && (props.className === 'trackeditems' || props.className === 'untrackeditems') ? (
                  <div className="auto-suggest-container">
                    <input
                      type="text"
                      name={column.field}
                      value={props.formData["ITEM"] !== itemId ? props.formData["ITEM"] : itemName}
                      onChange={handleItemNameChange}
                      placeholder={column.placeholder}
                      autoComplete="off"
                    />
                    {showItemNameSuggestions && filteredItemNames.length > 0 && (
                      <ul className="suggestions">
                        {filteredItemNames.map(item => (
                          <li
                            key={item.ITEM_ID}
                            onClick={() => handleItemNameSelect(item.NAME, item.ITEM_ID)}
                          >
                            {item.NAME + " - " + item.BRAND}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : column.field !== 'IMAGE' ? (
                  <input
                    type={column.type || 'text'}
                    name={column.field}
                    value={props.formData[column.field]}
                    onChange={props.handleChange}
                    placeholder={column.placeholder}
                  />
                ) : (
                  <label htmlFor={column.field} className="file-label">
                    <input
                      type="file"
                      id={column.field}
                      name={column.field}
                      onChange={handleImageChange}
                      className="file-input"
                    />
                    <span className="file-custom">{imageName}</span>
                  </label>
                )}
              </div>
            )
          ))}
          {(props.className === 'trackeditems') && (
            <div className="item">
              <label>Type:</label>
              <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                <option value="regular" onClick={() => handleTypeSelect("R")}>Regular</option>
                <option value="consumable" onClick={() => handleTypeSelect("C")}>Consumable</option>
              </select>
            </div>
          )}
          {(props.className === 'trackeditems' && itemType === 'consumable') && (
            <>
              {props.columns.filter(column => column.field === 'START_CONSUMPTION_DATE' || column.field === 'END_CONSUMPTION_DATE').map(column => (
                <div className="item" key={column.field}>
                  <label htmlFor={column.field}>{column.headerName}: </label>
                  <input
                    type="date"
                    name={column.field}
                    value={props.formData[column.field]}
                    onChange={props.handleChange}
                    placeholder={column.placeholder}
                    className="date-input"
                  />
                </div>
              ))}
            </>
          )}
          <div className="buttonDiv">
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
