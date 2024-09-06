import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';

const CameraRig = ({ horizontalRotation, verticalRotation, children}) => {
  const group = useRef();
  const snap = useSnapshot(state);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPointerPosition, setLastPointerPosition] = useState({ x: 0, y: 0 });

  // Handle pointer down (mouse or touch) to start dragging
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setLastPointerPosition({ x: e.clientX, y: e.clientY });
  };

  // Handle pointer up to stop dragging
  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Handle pointer move to rotate model when dragging
  const handlePointerMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - lastPointerPosition.x;
      const deltaY = e.clientY - lastPointerPosition.y;
      group.current.rotation.y += deltaX * 0.005; // Adjust rotation sensitivity
      group.current.rotation.x += deltaY * 0.005;
      setLastPointerPosition({ x: e.clientX, y: e.clientY });
    }
  };

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the model
    let targetPosition = [-0.4, 0, 2];
    if(snap.intro) {
      if(isBreakpoint) targetPosition = [0, 0, 2];
      if(isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if(isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2];
    }


    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    if (snap.scale == false) {
      // Set the model rotation smoothly with 360-degree rotation
      const rotationSpeed = delta * Math.PI * 0.5; // Adjust rotation speed
      group.current.rotation.y += rotationSpeed; // Continuous 360-degree rotation around Y-axis
 
     // set the model rotation smoothly
     easing.dampE(
       group.current.rotation,
       [state.pointer.y / 5, state.pointer.x , 0],
       1.3,
       delta
     )
    } else {
      group.current.rotation.y = horizontalRotation;
      group.current.rotation.x = verticalRotation;
    }

  })


  // return <group ref={group}>{children}</group>
  return (
    <group
      ref={group}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {children}
    </group>
  )
}

export default CameraRig