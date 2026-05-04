export interface VantaNetOptions {
    el: HTMLElement | string;
    THREE?: unknown;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    backgroundColor?: number;
    maxDistance?: number;
    spacing?: number;
    points?: number;
    showDots?: boolean;
    mouseCoeffX?: number;
    mouseCoeffY?: number;
    speed?: number;
  }
  
  export interface VantaEffect {
    setOptions: (opts: Partial<VantaNetOptions>) => void;
    destroy: () => void;
    resize: () => void;
  }
  
  declare global {
    interface Window {
      THREE: unknown;
      VANTA: {
        NET: (options: VantaNetOptions) => VantaEffect;
        current: VantaEffect | null;
      };
    }
  }