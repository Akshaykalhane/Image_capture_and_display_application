import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [cameraPaused, setCameraPaused] = useState(false);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImages([...capturedImages, imageSrc]);
    setCameraPaused(true);

    // Resume camera feed after 1 second
    setTimeout(() => {
      setCameraPaused(false);
    }, 1000);
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3)); // Limit zoom level to 3x
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1)); // Limit zoom level to 1x (normal size)
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top left',
          width: `${10 / zoom}%`,
          height: `${10 / zoom}%`,
          filter: cameraPaused ? 'grayscale(100%)' : 'none', // Apply grayscale filter when camera is paused
        }}
        screenshotFormat="image/jpeg"
      />
      <div>
        <button onClick={handleCapture}>Capture</button>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
      {capturedImages.length > 0 && (
        <div className="gallery">
          {capturedImages.map((imageSrc, index) => (
            <img key={index} src={imageSrc} alt={`Captured ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
