import React from 'react';
import { useState,useRef ,useEffect} from 'react';
import Webcam from 'react-webcam';
import {Link} from 'react-router-dom';
import './camera.css';
import Transition from './Transition';

function CameraComponent({addImage}) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [facingMode, setFacingMode] = useState('user')
  const [ratio,setRatio]=useState({width:16,height:9});
  const [capturedImages,setCapturedImages] = useState([]);
  const [pause,setPause] = useState(false);
  const [hasError,setError]=useState(false);
  const image = useRef(null);
  

  useEffect(()=>{
    const checkBrowserWebCamera=()=>{
      if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
        setError(true);
      }
    }
    checkBrowserWebCamera();
  },[])

  const handleAspectRatio = (e) =>{
    const { value } = e.target;
    // setRatio(value);
    console.log(value);
    const [width,height] = value.split(':').map(Number);
    image.current.video.srcObject.getVideoTracks().forEach(track => {
      console.log(image.current.video.srcObject.getVideoTracks())
      track.applyConstraints({ aspectRatio: width / height });
    });
    setRatio({width,height});
  }


  const capturePicture = (e) => {
    const imageSrc = image.current.getScreenshot();
    const { videoWidth, videoHeight } = image.current.video;
    setPause(true);

    console.log(image.current)

    let cropWidth = videoWidth / zoomLevel;
    let cropHeight = videoHeight / zoomLevel;
    let cropX = (videoWidth - cropWidth) / 2;
    let cropY = (videoHeight - cropHeight) / 2;


    const canvas = document.createElement('canvas');
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image.current.video,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    const croppedImageSrc = canvas.toDataURL();
    console.log(croppedImageSrc)
    addImage(croppedImageSrc);
    setCapturedImages([...capturedImages,croppedImageSrc]);

    setTimeout(()=>{
      setPause(false)
    },1000)
  }
  const switchCamera = () => {
    setFacingMode((state) => state == 'user' ? 'environment' : 'user')
  }

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 3))
  }

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 1));
  }

  return (<>
  <Transition>    <div className="camera-container">
      {hasError ? (<div>
          <p>Sorry, your browser doesn't support webcam access.</p>
          <p>Please use a different browser or enable webcam access in your current browser.</p>
        </div>) : (<>
        <div className="camera-window">
        <button className='rotate-btn' onClick={switchCamera}><img src="/rotate.png" alt="rotate" className='rotate-img' /></button>
        <Webcam
          audio={false}
          ref={image}
          mirrored={false} 
          style={{ width: '100%', height: 'auto', transform: `scale(${zoomLevel})`,filter: pause ? 'grayscale(100%)' : 'none', }}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: facingMode, aspectRatio: ratio.width/ratio.height }}
          imageSmoothing={true}
        />
      </div>
      
      <div className="camera-controls">
        <Link to='/gallery'>
        <button className="gallery-btn">
          <img src="/icons8-image-96.png" alt="gallery" />
        </button>
        </Link>
        <button className="zoom-btn" onClick={zoomOut}>
          <img src="/icons8-zoom-out-100.png" alt="" />
        </button>
        <button className="capture-btn" title="click here to capture image" onClick={capturePicture}>
          <img src="/icons8-aperture-100.png" alt="" />
        </button>
        <button className="zoom-btn" onClick={zoomIn}>
          <img src="/icons8-zoom-in-96.png" alt="" />
        </button>
        <div className="select-group">

        <select name="" id="" className="aspect-ratio" onChange={handleAspectRatio} value={ratio.width+':'+ratio.height}>
          <option value="16:9">16:9</option>
          <option value="4:3">4:3</option>
          <option value="1:1">1:1</option>
        </select>
        </div>
      </div>
      
      </>
      ) }
      
    </div>
    </Transition>

  </>
  )
}

export default CameraComponent;