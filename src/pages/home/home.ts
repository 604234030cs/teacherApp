import { RegisterPage } from './../register/register';
import { Component, } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { TeacherPage } from '../teacher/teacher';
import { Storage } from '@ionic/storage';

import * as Enums from '../enums/enums';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //inputlogin:any={};
  public login:FormGroup;




  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,public http: HttpClient,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController,
              private storage: Storage
              ) {

                //this.login.value.tuser="";
                //this.login.value.	teacher_password="";

              this.login = this.formBuilder.group({
                teacher_user: ['', Validators.required],
                teacher_password: ['',Validators.required]
              });



  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter(){
    this.storage.get('accoutuser').then((val) => {
      if(val != null){
        const loader = this.loadingCtrl.create({
          content: "Please wait........",
          duration: 500,
        });
        this.navCtrl.setRoot(TeacherPage,val);
        loader.present();
      }else{
         // this.navCtrl.setRoot(HomePage);
      }

      console.log('Your age is', val);
    });

  }


  // ฟังก์ชั่นส่งค่าเมื่อ submit ฟอร์ม
  doLogin(){
    console.log(this.login.value);
    console.log(this.login.valid);
  }
  register(){

    this.navCtrl.push(RegisterPage);
  }
  logincheck(teacher_user,teacher_password){
    console.log("1");


    if(this.login.value.teacher_user != null && this.login.value.teacher_password != null){

      console.log("teacher_user", this.login.value.teacher_user);
      console.log("teacher_password", this.login.value.teacher_password);
      let url = Enums.APIURL.URL + '/public/index.php/login/user='+this.login.value.teacher_user+'&&'+'pass='+this.login.value.teacher_password;
      this.http.get(url).subscribe((data:any={})=>{


        let account = {
          teacher_id:data['teacher_id'],
          teacher_user:data['teacher_user'],
          teacher_password:data['teacher_password'],
          // teacher_latitude:data['teacher_latitude'],
          // teacher_longitude:data['teacher_longitude']
        }
        if(data != false){
          console.log(data);
          const loader = this.loadingCtrl.create({
            content: "Pleas  wait.....",
            duration: 500,
          });
          loader.present();
          this.storage.set('accoutuser',account);
          this.navCtrl.setRoot(TeacherPage,teacher_user,teacher_password);


        }else if(data == false){
         let alert = this.alertCtrl.create({
           message: "รหัสผู้ใช้ หรือ พาสเวิร์ด ไม่ถูกต้อง",
           buttons: [
             {
              cssClass: 'secondary',
              text: 'Ok',
              role: 'OK'
             }
           ]
         });
         alert.present();
         this.login.value.teacher_user = "";
         this.login.value.teacher_password = "";
        }

      });
    }else{
      const alert = this.alertCtrl.create({
        message: 'เกิดข้อมูลผิดพลาด',
        buttons: [{
          cssClass: 'secondary',
          text: 'Ok',
          role: 'OK'
        }]
      })
      alert.present();
    }


    }



  }





