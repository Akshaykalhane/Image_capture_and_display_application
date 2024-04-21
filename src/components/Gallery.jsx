import React from 'react';
import { useState } from 'react';
import { Link} from 'react-router-dom';
import './gallery.css';

function Gallery({ capturedImages ,deleteImage}) {
  const [isZoomed,setIsZoomed]=useState(false);
  const [zoomedImage,setZoomedImage]=useState(null);
  const [isDelete,setDelete]=useState(false)

  const setZoomedIn=(image_url)=>{
    setIsZoomed(true);
    setZoomedImage(image_url);
    console.log(image_url)
  }

  const setZoomedOut =()=>{
    setIsZoomed(false);
    setZoomedImage(null);
  }

  const handleDelete=()=>{
    deleteImage(zoomedImage.id);
    setIsZoomed(false);
    setZoomedImage(null);
    setDelete(false)
  }

  return (<>
    <div className="main-gallery-container">
      <Link to='/'>
      <button className='back-btn'>Back</button>
      </Link>
      {
        capturedImages.length > 0 ?
          (
            <>
              <h2>Image Gallary</h2>
              <div className="gallery-container">
                {capturedImages.map((item) => {
                  return <div key={item.id} className="gallery-box" onClick={()=>setZoomedIn(item)}>
                    <img src={item.img_url} alt="image" />
                  </div>
                })}
              </div>
            </>
          )
          :
          (<div className='no-data'>
            <center>
            <p>no photos found</p>
            </center>
          </div>
          )
      }
      {isZoomed && (
        <div className='zoom-in-image'>
          <img src={zoomedImage.img_url} alt="image" />
          <button onClick={()=>setDelete(true)} className='back-btn'>Delete</button>
          <button className='close-btn' onClick={setZoomedOut}>X</button>
        </div>
      )}
      {isDelete && (
        <div className='delete-box'>
          <div className="inside-delete">
          <p>Are you sure you want delete this image ?</p>
          <button onClick={handleDelete}>yes</button>
          <button className='no-btn' onClick={()=>setDelete(false)}>no</button>
          </div>
        </div>
      )}
    </div>
  </>
  )
}

export default Gallery