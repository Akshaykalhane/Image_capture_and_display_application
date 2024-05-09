import React, { useReducer } from 'react';
import { useState } from 'react';
import { Link} from 'react-router-dom';
import './gallery.css';
import { gallaryReducer ,initialState} from './reducer';
import Transition from './Transition';




function Gallery({ capturedImages ,deleteImage}) {
 
  const [isZoomed,setIsZoomed]=useState(false);
  const [zoomedImage,setZoomedImage]=useState(null);
  const [isDelete,setDelete]=useState(false);
  const [state,dispatch]=useReducer(gallaryReducer,initialState)
  const setZoomedIn=(image_url)=>{
    // setIsZoomed(true);
    // setZoomedImage(image_url);
    dispatch({type:'set_zoomedIn',payload:{img_url:image_url}})
    
  }
  console.log(state);

  const setZoomedOut =()=>{
    dispatch({type:'set_zoomout'})
    // setIsZoomed(false);
    // setZoomedImage(null);
  }

  const handleDelete=()=>{
    deleteImage(state.zoomedImage.id);
    // setIsZoomed(false);
    // setZoomedImage(null);
    // setDelete(false)
    dispatch({type:'delete_img'})
  }

  return (<>
  <Transition>
    <div className="main-gallery-container">
      <Link to='/' style={{textDecoration:'none'}}>
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
      {state.isZoomed && (
        <div className='zoom-in-image'>
          <img src={state.zoomedImage.img_url} alt="image" />
          {/* <button onClick={()=>setDelete(true)} className='back-btn'>Delete</button> */}
          <button onClick={()=>dispatch({type:'set_delete'})} className='back-btn '><img src="/icons8-delete-144.png" alt="" /> Delete</button>
          <button className='close-btn' onClick={setZoomedOut}>
            <img src="/icons8-close-240.png" alt="" />
          </button>
        </div>
      )}
      {state.isDelete && (
        <div className='delete-box'>
          <div className="inside-delete">
          <p>Are you sure you want delete this image ?</p>
          <button onClick={handleDelete}>yes</button>
          {/* <button className='no-btn' onClick={()=>setDelete(false)}>no</button> */}
           <button className='no-btn' onClick={()=>dispatch({type:'cancel_delete'})}>no</button>
          </div>
        </div>
      )}
    </div>
    </Transition>
  </>
  )
}

export default Gallery