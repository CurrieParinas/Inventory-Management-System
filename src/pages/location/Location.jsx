import React, { useEffect, useState } from 'react'
import './location.scss'
import Card from '../../components/card/Card'
import AddItem from '../../components/addItem/additem'
import icon from "../../assets/location.svg"


const Location = () => {
  const[locations, setLocations]=useState([])
  const [open,setOpen] = useState(false)
  const [formData, setFormData] = useState({
    NAME: '',
    DESCRIPTION: '',
    PARENT_LOCATION: '',
    IMAGE: ''
  });

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

    useEffect(() => {
      fetchLocations();
    }, []);

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
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formDataWithImage = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataWithImage.append(key, value);
      });

      console.log(formData);
    
      try {
        const response = await fetch(`http://localhost:8080/inventory/location/add`, {
          method: 'POST',
          body: formDataWithImage,
        });
    
        if (!response.ok) {
          throw new Error('Failed to add location');
        }
    
        // Reload the locations after adding a new location
        fetchLocations();
        
        handleClose();
        setOpen(false); // Close the AddItem modal after successful submission
        setFormData({ // Clear the form data
          NAME: '',
          DESCRIPTION: '',
          PARENT_LOCATION: '',
          IMAGE: ''
        });
      } catch (error) {
        console.error('Error adding location:', error);
      }
    };

    const handleChange = (e) => {
      console.log(e.target.value);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.size <= (1 * 1024 * 1024)) { // Max size is 1MB
        setFormData({ ...formData, IMAGE: e.target.files[0] });
      } else {
        alert('File size exceeds the maximum allowed limit (1MB).');
        // Optionally, you can clear the file input field
        e.target.value = null;
      }
    };

    const columns = [
        { 
          field: 'ITEM_LOCATION_ID', 
          headerName: 'ID', 
          width: 90,
          headerAlign: 'center',
          align: 'center',
          placeholder: 'Enter ID',
        },
        {
          field: 'NAME',
          headerName: 'Name',
          width: 150,
          editable: true,
          headerAlign: 'center',
          align: 'center',
          placeholder: 'Enter name',
        },
        {
            field: 'DESCRIPTION',
            headerName: 'Description',
            width: 150,
            editable: true,
            headerAlign: 'center',
            align: 'center',
            placeholder: 'Enter description',
        },
        {
          field: 'CREATE_DATE',
          headerName: 'Date Created',
          type: 'Date',
          width: 170,
          headerAlign: 'center',
          align: 'center',
          placeholder: 'Select date created',
        },
        {
          field: 'LAST_MODIFIED',
          headerName: 'Date Modified',
          type: 'Date',
          width: 170,
          headerAlign: 'center',
          align: 'center',
          placeholder: 'Select date modified',
        },
        {
          field: 'IMAGE',
          headerName: 'Image',
          type: 'file',
          width: 170,
          headerAlign: 'center',
          align: 'center',
          placeholder: 'Upload image',
        },
      ];
      

      const resetFormData = () => {
        setFormData({
          NAME: '',
          DESCRIPTION: '',
          IMAGE: ''
        });
      };

    const handleClose = () => {
        setOpen(false);
        resetFormData();
      }; 

  return (
    <div className='location'>
        <div className="info">
            <div className="textdiv">
                <img src={icon} alt="" style={{width:'45px', height:'45px'}}/>
                <h1 style={{marginLeft:"-10px"}}>Locations</h1>
            </div>
            <div className="buttonDiv" onClick={() => setOpen(true)}>
                <button >Add New Location</button>
            </div>
        </div>
      <div className="locationcontainer">
        {locations.map((item) => (
            <Card 
            key={item.LOCATION_ID}
            itemId={item.LOCATION_ID}
            item={item} 
            type="location" 
            fetchCodeImage={fetchLocations} 
            className="locations" />
        ))}
        {open && <AddItem
            slug="Location" 
            columns={columns} 
            setOpen={setOpen} 
            formData={formData} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            handleImageChange={handleImageChange} 
            resetFormData={resetFormData} />}
      </div>
    </div>
  )
}

export default Location