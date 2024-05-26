import React, { useRef, useEffect, useState } from 'react';
import './additem.scss';

const AddItem = (props) => {
  const modalRef = useRef();
  const [isTracked, setIsTracked] = useState(false);
  const [itemType, setItemType] = useState('regular');
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  console.log(isTracked + "istracked")

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

    fetchLocations();
  }, []);

  const handleLocationChange = (e) => {
    const input = e.target.value;
    props.handleChange(e);
    setShowSuggestions(true);
    if (input) {
      const filtered = locations.filter(location =>
        location.NAME.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  };

  const handleLocationSelect = (locationName) => {
    props.setFormData(prevState => ({
      ...prevState,
      LOCATION: locationName
    }));
    setShowSuggestions(false);
  };

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
                {column.field === 'LOCATION' ? (
                  <div className="auto-suggest-container">
                    <input
                      type="text"
                      name={column.field}
                      value={props.formData[column.field]}
                      onChange={handleLocationChange}
                      placeholder={column.placeholder}
                      autoComplete="off"
                    />
                    {showSuggestions && filteredLocations.length > 0 && (
                      <ul className="suggestions">
                        {filteredLocations.map(location => (
                          <li
                            key={location.LOCATION_ID}
                            onClick={() => handleLocationSelect(location.NAME)}
                          >
                            {location.NAME}
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
                      onChange={props.handleImageChange}
                      className="file-input"
                    />
                    <span className="file-custom">Choose File</span>
                  </label>
                )}
              </div>
            )
          ))}
          {(props.className === 'generalitems') && (
            <div className="item">
              <label>Tracked:</label>
              <select value={isTracked ? 'tracked' : 'untracked'} onChange={(e) => setIsTracked(e.target.value === 'tracked')}>
                <option value="untracked">Untracked</option>
                <option value="tracked">Tracked</option>
              </select>
            </div>
          )}
          {(isTracked || props.className === 'trackeditems') && (
            <div className="item">
              <label>Type:</label>
              <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                <option value="regular">Regular</option>
                <option value="consumable">Consumable</option>
              </select>
            </div>
          )}
          {((isTracked || props.className === 'trackeditems') && itemType === 'consumable') && (
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
