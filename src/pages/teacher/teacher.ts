
import { AllchecknamePage } from './../allcheckname/allcheckname';
import { AllrarentPage } from './../allrarent/allrarent';
import { Test2Page } from './../test2/test2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { MainteacherPage } from '../mainteacher/mainteacher';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { MainstudentPage } from '../mainstudent/mainstudent';
import * as Enums from '../enums/enums';
//import { text } from '@angular/core/src/render3/instructions';

/**
 * Generated class for the TeacherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher',
  templateUrl: 'teacher.html',
})

export class TeacherPage {

  accout: any= [];
  teacher: any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient,private storage: Storage, public alertCtrl: AlertController,)
              {

              }



  ionViewWillEnter() {
    console.log('ionViewDidLoad TeacherPage');
    this.loaddata();
  }
  mainteacher(){
    this.navCtrl.setRoot(MainteacherPage);
  }

  toteacher(){
    this.navCtrl.setRoot(MainstudentPage);
  }

  test(){
    this.navCtrl.setRoot(Test2Page)
  }


  loaddata(){

      this.storage.get('accoutuser').then((data)=>{
        console.log(data);

        console.log(data.teacher_user);
        console.log(data.teacher_password);


        let url = Enums.APIURL.URL +'/public/index.php/teacherall/'+data.teacher_user+'&&'+data.teacher_password;
        this.http.get(url).subscribe(user =>{
        this.accout = user;
        console.log(user);

      });
      })

  }
  logout(){
    const confirm = this.alertCtrl.create({
      title: 'คุณต้องการออกจากระบบหรือไม่',
      buttons:[{
          text: 'ตกลง',
          handler: () =>{
            this.storage.remove('accoutuser');
            this.navCtrl.setRoot(HomePage);
          }
        },
          {
            text: 'ยกเลิก',
            handler: () =>{}
          }
      ]
    });
    confirm.present();




  }

  gohome(){
    this.navCtrl.push(TeacherPage);
  }
  goparent(){
    this.navCtrl.setRoot(AllrarentPage);
  }
  goallcheckname(){
    this.navCtrl.setRoot(AllchecknamePage);
  }


  // tap1root= TeacherPage;



}

