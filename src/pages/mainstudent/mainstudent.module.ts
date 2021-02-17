import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainstudentPage } from './mainstudent';

@NgModule({
  declarations: [
    MainstudentPage,
  ],
  imports: [
    IonicPageModule.forChild(MainstudentPage),
  ],
})
export class MainstudentPageModule {}
