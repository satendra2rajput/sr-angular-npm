export type LoaderType =
  | 'spinner'
  | 'dots'
  | 'bars'
  | 'pulse'
  | 'ring'
  | 'dual-ring'
  | 'ripple'
  | 'orbit'
  | 'bounce'
  | 'wave'
  | 'snake'
  | 'square'
  | 'cube'
  | 'dots-wave'
  | 'progress'
  | 'gradient-ring'
  | 'ellipsis'
  | 'heartbeat'
  | 'stretch'
  | 'solar';

export type LoaderSize = 'small' | 'medium' | 'large';

export type LoaderPosition = 'center' | 'top' | 'bottom';

export interface LoaderOptions {
  type?: LoaderType;
  size?: LoaderSize;
  text?: string;
  fullscreen?: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
  showContainer?: boolean;
  position?: LoaderPosition;
  showCloseButton?: boolean;
  color?: string;
  duration?: number;
}
