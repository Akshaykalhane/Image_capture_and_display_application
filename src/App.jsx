import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Webcam from 'react-webcam'
import { useRef } from 'react'

function App() {
  const [count, setCount] = useState(0);
  const image=useRef(null);

  const handleOnChange=(e)=>{
    console.log(image.current.getScreenshot())
  }

  return (
    <>
      <h2>Camera App</h2>
      <Webcam 
        audio={false}
        // ref={webcamRef}
        ref={image}
        mirrored={true} // Mirror the video for front camera
        style={{ width: '100px', height: 'auto' }}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: 'environment',aspectRatio:'' }}
        onClick={handleOnChange}
          />
    </>
  )
}

export default App
