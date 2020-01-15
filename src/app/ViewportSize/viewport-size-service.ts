import {Injectable} from '@angular/core';
// import {IConfig} from './interface/interface';
import {fromEvent, Observable} from 'rxjs';
import {debounce, debounceTime, distinct, map} from 'rxjs/operators';
import VieportConfigSize from './enum/enums';
import IConfig from './interface/interface';

// import {IConfig} from './interface/interface';


export class ViewportSizeService {
  private viewportConfig: IConfig;


  constructor(config: IConfig) {
    this.viewportConfig = config;
  }
//Отслеживаем изменения разрешения экрана
  checkVieport(viewportType): Observable<any> {
    console.log('<-----checkViewport', viewportType)
    return fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        distinct(),
        map(() => this.setViewport(viewportType))
      );
  }

//Определяем разрешение экрана
  setViewport(viewportType): boolean {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    console.log('<------setViewport', viewportWidth);
    let show = false;

    switch (viewportType) {
      case VieportConfigSize.SMALL:
        show = viewportWidth < this.viewportConfig.medium;
        break;
      case VieportConfigSize.MEDIUM:
        show = this.viewportConfig.medium <= viewportWidth && viewportWidth < this.viewportConfig.large;
        break;
      case VieportConfigSize.LARGE:
        show = viewportWidth >= this.viewportConfig.large;
        break;
    }
    return show;
  }
}
