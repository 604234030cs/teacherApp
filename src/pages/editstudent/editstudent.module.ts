import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditstudentPage } from './editstudent';

@NgModule({
  declarations: [
    EditstudentPage,
  ],
  imports: [
    IonicPageModule.forChild(EditstudentPage),
  ],
})
export class EditstudentPageModule {}
