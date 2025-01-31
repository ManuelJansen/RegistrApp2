import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarPassPageRoutingModule } from './recuperar-pass-routing.module';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RecuperarPassPage } from './recuperar-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarPassPageRoutingModule,
    MatProgressSpinner
  ],
  declarations: [RecuperarPassPage]
})
export class RecuperarPassPageModule {}
