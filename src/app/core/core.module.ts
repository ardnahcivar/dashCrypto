import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core/core.component';
import { RouterModule } from '@angular/router';
import { CoreLogComponent } from './core-log/core-log.component';

@NgModule({
  declarations: [
    CoreComponent, CoreLogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: CoreComponent},
      {path: 'core', component: CoreComponent},
      {path: 'log', component: CoreLogComponent}
    ])
  ],
})
export class CoreModule { }
