import { proxy } from 'valtio';

const state = proxy({
  // intro: true,
  scale: false,
  color: '#000000',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
});

export default state;