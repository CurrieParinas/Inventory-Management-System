import React, { useEffect, useState } from 'react'
import './medium.scss'
import Card from '../../components/card/Card'
import AddItem from '../../components/addItem/additem'
import icon from "../../assets/shelf.svg"


const Medium = () => {
  const[mediums, setMediums]=useState([])
  const [open,setOpen] = useState(false)
  const [formData, setFormData] = useState({
    NAME: '',
    DESCRIPTION: '',
    PARENT_LOCATION: '',
    PARENT_MEDIUM_ID: '',
    IMAGE: ''
  });

    const fetchMediums = async () => {
        try {
          const response = await fetch('http://localhost:8080/inventory/medium/all');
          if (!response.ok) {
            throw new Error('Failed to fetch mediums');
          }
          const data = await response.json();
          setMediums(data);
        } catch (error) {
          console.error('Error fetching mediums:', error);
        }
      };

    useEffect(() => {
      fetchMediums();
    }, []);

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
        const response = await fetch(`http://localhost:8080/inventory/medium/add`, {
          method: 'POST',
          body: formDataWithImage,
        });
    
        if (!response.ok) {
          throw new Error('Failed to add medium');
        }
    
        // Reload the mediums after adding a new medium
        fetchMediums();
    
        setOpen(false); // Close the AddItem modal after successful submission
        setFormData({ // Clear the form data
          NAME: '',
          DESCRIPTION: '',
          PARENT_LOCATION: '',
          PARENT_MEDIUM_ID: '',
          IMAGE: ''
        });
      } catch (error) {
        console.error('Error adding medium:', error);
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
    <div className='medium'>
        <div className="info">
            <div className="textdiv">
                <img src={icon} alt="" style={{width:'45px', height:'45px'}}/>
                <h1 style={{marginLeft:"-10px"}}>Medium</h1>
            </div>
            <div className="buttonDiv" onClick={() => setOpen(true)}>
                <button >Add New Medium</button>
            </div>
        </div>
      <div className="mediumcontainer">
        {mediums.map((item) => (
            <Card key={item.MEDIUM_ID} item={item} type="medium" fetchCodeImage={fetchMediums} className="mediums"/>
        ))}
        {open && <AddItem slug="trackeditems" columns={columns} setOpen={setOpen} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} handleImageChange={handleImageChange}/>}
      </div>
    </div>
  )
}

export default Medium