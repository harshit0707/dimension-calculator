import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export enum DEVICE_SIZE {
  XS, SM, MD, LG, XL
}

@Injectable({
  providedIn: 'root'
})
export class ScreenResolutionService {

  $deviceSizeSubject: Subject<DEVICE_SIZE>;
  $scrollTopSubject: BehaviorSubject<number>;
  deviceSize: any;

  renderer: Renderer2;

  constructor(private rendererFactory2: RendererFactory2) {
    this.renderer = this.rendererFactory2.createRenderer(null, null);
    this.initiateWindowResizeListener();
    this.initiateDocumentScrollTopListener();
  }

  getScreenHeight() {
    return window.screen.height;
  }

  getScreenWidth() {
    return window.screen.width;
  }

  getDeviceSize() {
    let width = this.getScreenWidth();
    let newDeviceSize: DEVICE_SIZE;
    if (width < 480) newDeviceSize =  DEVICE_SIZE.XS;
    else if (width < 600) newDeviceSize =  DEVICE_SIZE.SM;
    else if (width < 768) newDeviceSize =  DEVICE_SIZE.MD;
    else if (width < 992) newDeviceSize =  DEVICE_SIZE.LG;
    else newDeviceSize =  DEVICE_SIZE.XL;
    this.deviceSize = newDeviceSize;
    this.$deviceSizeSubject.next(newDeviceSize);
  }

  initiateWindowResizeListener() {
    this.$deviceSizeSubject = new Subject<DEVICE_SIZE>();
    this.getDeviceSize();
    this.renderer.listen('window', 'resize', () => {
      this.getDeviceSize();
    });
  }

  initiateDocumentScrollTopListener() {
    this.$scrollTopSubject = new BehaviorSubject<number>(document.documentElement.scrollTop);
    this.renderer.listen('window', 'scroll', () => {
      this.$scrollTopSubject.next(document.documentElement.scrollTop);
    });
  }
}
