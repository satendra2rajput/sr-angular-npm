import { LoaderOptions } from '../models/loader.types';

export const DEFAULT_LOADER_OPTIONS: Required<LoaderOptions> = {
  type: 'spinner',
  size: 'medium',
  text: 'Loading...',

  fullscreen: true,

  overlay: true,
  overlayOpacity: 0.2,

  showContainer: false,

  position: 'center',

  showCloseButton: false,

  color: '#2563eb',

  duration: 0,
};
