import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Webcam from 'react-webcam'
import { useRef } from 'react'
import CameraComponent from './components/Camera';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Gallery from './components/Gallery'
import Notfound from './components/notfound'
import { AnimatePresence } from 'framer-motion'

// import Transition from './components/Transition'

function App() {

  const [capturedImages,setCapturedImages] = useState([]);
  
  const addImage=(img_url)=>{
    let id = capturedImages.length+1;
    const state = {
      id,
      img_url
    }
    setCapturedImages([...capturedImages,state]);
  }  

  const deleteImage=(id)=>{
    const data = capturedImages.filter((item)=>item.id!==id);
    setCapturedImages(data);
  }

  return (
    <>
      {/* <h2>Camera App</h2>
      <div style={{ overflow: 'hidden' }}>

      </div> */}
      {/* <button onClick={capturePicture}>capture</button>
      <button onClick={switchCamera} className='camera'>switch camera</button>
      <button onClick={zoomIn}>zoom in</button>
      <button onClick={zoomOut}>zoom out</button> */}
      
      {/* <div>
        {capturedImages && capturedImages.map((img)=>{
          return <img key={img} src={img} />
        })}
      </div> */}
      <BrowserRouter>
      <AnimatePresence mode='wait'>
        <Routes>
          <Route path='/' element={<CameraComponent addImage={addImage}  />} />
          <Route path='/gallery' element={<Gallery capturedImages={capturedImages} deleteImage={deleteImage} />} />
          <Route path='*' element={<Notfound />}/>
        </Routes>
      </AnimatePresence>
      </BrowserRouter>
    </>
  )
}

export default App;
