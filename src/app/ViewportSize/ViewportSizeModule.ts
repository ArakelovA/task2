import {ModuleWithProviders, NgModule} from '@angular/core';
import {IfViewportSizeDirective} from './if-viewport-size.directive';
import {CommonModule} from '@angular/common';
import IConfig from './interface/interface';
import {ViewportSizeService} from './viewport-size-service';

@NgModule({
  declarations: [
    IfViewportSizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IfViewportSizeDirective
  ]
})

export class ViewportSizeModule {
  static forRoot(config: IConfig): ModuleWithProviders {
    return {
      ngModule: ViewportSizeModule,
      providers: [{
        provide: ViewportSizeService, useFactory() {
          return new ViewportSizeService(config);
        }
      }]
    };
  }

}
