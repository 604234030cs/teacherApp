import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Enums from '../enums/enums';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the SettingStatusreceivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting-statusreceive',
  templateUrl: 'setting-statusreceive.html',
})
export class SettingStatusreceivePage {

  st_id;
  ck_date;
  ck_receive;
  par_user;
  students:any=['ck_id','st_id','student_name','student_sname','student_nickname','Student_sex','class_id',
  'par_user','ck_date','ck_status','ck_receive','ck_other','par_tel','latitude','longitude',
];


  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {

    this.st_id = this.navParams.get('st_id');
    this.par_user = this.navParams.get('par_user');





  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingStatusreceivePage');

    let url = Enums.APIURL.URL + '/public/index.php/ckstandckdate/'+this.st_id+'&&'+this.par_user
    this.http.get(url).subscribe((data:any)=>{
      this.students = data;
      console.log(this.students);

    })
  }

}
