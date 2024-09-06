import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei';
import { getContrastingColor } from '../config/helpers';
import { useSnapshot } from 'valtio';

import state from '../store';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';

const CanvasModel = () => {
  const [horizontalRotation, setHorizontalRotation] = useState(0);
  const [verticalRotation, setVerticalRotation] = useState(0);
  const snap = useSnapshot(state);

  // Handle slider change to rotate the model
  const handleSliderChangeBottom = (e) => {
    // const value = parseFloat(e.target.value);
    setHorizontalRotation(parseFloat(e.target.value));
  };

  const handleSliderChangeRight = (e) => {
    // const value = parseFloat(e.target.value);
    setVerticalRotation(parseFloat(e.target.value));
  };

  const generateBackgroundColor = () => {
      return {
        backgroundColor: getContrastingColor(snap.color),
        color: snap.color
  }}

  return (
    <>
    
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
      style={generateBackgroundColor()}
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig horizontalRotation={horizontalRotation} verticalRotation={verticalRotation}>
        {/* <Backdrop /> */}
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>


    {snap.scale && (
        <>
          <div style={{ position: 'absolute', bottom: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <input
              type="range"
              min={-Math.PI}
              max={Math.PI}
              step={0.01}
              value={horizontalRotation}
              onChange={handleSliderChangeBottom}
              style={{ width: '50%' }}
            />
          </div>
          <div style={{ position: 'absolute', display: 'flex', top: '45%', right: '10%' }}>
            <input
              type="range"
              min={-Math.PI / 2}
              max={Math.PI / 2}
              step={0.01}
              value={verticalRotation}
              onChange={handleSliderChangeRight}
              style={{ width: '100%', transform: 'rotate(90deg)' }}
            />
          </div>
        </>
    )}

    
    </>
    
  )
}

export default CanvasModel