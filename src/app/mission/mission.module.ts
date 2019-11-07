import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MissionPage } from './mission.page';
import { LegendComponent } from '../legend/legend.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NgxMapboxGLModule,
    RouterModule.forChild([
      {
        path: '',
        component: MissionPage
      }
    ])
  ],
  declarations: [LegendComponent, MissionPage]
})
export class MissionPageModule {}