import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Webcam from 'react-webcam'
import { useRef } from 'react'

function App() {
  const [count, setCount] = useState(0);
  const [facingMode,setFacingMode]=useState('user')
  const image=useRef(null);

  const handleOnChange=(e)=>{
    console.log(image.current.getScreenshot())
  }
  const switchCamera=()=>{
    setFacingMode((state)=>state=='user' ? 'environment':'user')
  }

  return (
    <>
      <h2>Camera App</h2>
      <Webcam 
        audio={false}
        // ref={webcamRef}
        ref={image}
        mirrored={true} // Mirror the video for front camera
        style={{ width: '300px', height: 'auto' }}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: facingMode,aspectRatio:16/9 }}
        onClick={handleOnChange}
        />
        <button onClick={switchCamera}>switch camera</button>
    </>
  )
}

export default App
