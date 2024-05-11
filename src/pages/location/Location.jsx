import React, { useEffect, useState } from 'react'
import './location.scss'
import Card from '../../components/card/Card'
import AddItem from '../../components/addItem/additem'
import icon from "../../assets/location.svg"


const Location = () => {
  const[locations, setLocations]=useState([])
  const [open,setOpen] = useState(false)

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

    const columns = [
        { 
          field: 'ITEM_MEDIUM_ID', 
          headerName: 'ID', 
          width: 90,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'NAME',
          headerName: 'Name',
          width: 150,
          editable: true,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'CODENAME',
          headerName: 'Codename',
          width: 120,
          editable: true,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'BRAND',
          headerName: 'Brand',
          width: 150,
          editable: true,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'QUANTITY',
          headerName: 'Quantity*',
          type: 'number',
          width: 130,
          editable: true,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'MEDIUM_NAME',
          headerName: 'Storage Medium',
          width: 180,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'LOCATION_NAME',
          headerName: 'Storage Location',
          width: 200,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'CREATE_DATE',
          headerName: 'Date Created',
          type: 'Date',
          width: 170,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'LAST_MODIFIED',
          headerName: 'Date Modified',
          type: 'Date',
          width: 170,
          headerAlign: 'center',
          align: 'center',
        },
        {
            field: 'IMAGE',
            headerName: 'Image',
            type: 'file',
            width: 170,
            headerAlign: 'center',
            align: 'center',
        },
    ];

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
            <Card key={item.LOCATION_ID} item={item} type="location" fetchCodeImage={fetchLocations} className="locations"/>
        ))}
        {open && <AddItem slug="trackeditems" columns={columns} setOpen={setOpen}/>}
      </div>
    </div>
  )
}

export default Location