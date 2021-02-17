import { MainstudentPage } from './../mainstudent/mainstudent';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';

import * as Enums from '../enums/enums';
/**
 * Generated class for the AddclassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addclass',
  templateUrl: 'addclass.html',
})
export class AddclassPage {

  user:FormGroup;
  class:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,public http: HttpClient,
              public alertCtrl:AlertController,public loadingCtrl:LoadingController
              ,private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddclassPage');
  }

  addclass(){
    this.storage.get('accoutuser').then((data:any)=>{
    console.log(this.user.value);
    console.log(this.user.valid);
    if(this.user.value.class_name != ""){
      let url =  Enums.APIURL.URL + '/public/index.php/addclass';
      let url2 = Enums.APIURL.URL +'/public/index.php/checkclassid/'+this.user.value.class_name +'&&'+data.teacher_id;

      this.http.get(url2).subscribe((err:any)=>{
        if(err['class_name'] == this.user.value.class_name && err['teacher_id'] == data.teacher_id){
          const alert = this.alertCtrl.create({
            title: 'เกิดข้อผิดพลาด',
            subTitle: 'ชื่อชั้นนี้ ได้ถูกใช้ไปแล้ว',
            buttons: ['OK']
          });
          alert.present();
        }else if(err['class_name'] != this.user.value.class_name && err['teacher_id'] != data.teacher_id){
          let setdata = JSON.stringify({
                class_name: this.user.value.class_name,
                teacher_id: data.teacher_id


          });
          let datapost = JSON.parse(setdata);
          const confirm = this.alertCtrl.create({
            title: 'ยืนยันเพิ่มชั้นเรียน',
            message: 'กดปุ่มยืนยันเพื่อเพิ่มชั้นเรียน',
            buttons:[
              {
                text: 'ยืนยัน',
                handler: () =>{

                    this.http.post(url,datapost).subscribe((status:any)=>{
                      console.log(status);

                      if(status.status != null){
                        const alert = this.alertCtrl.create({
                          title: 'สำเร็จ',
                          subTitle: 'เพิ่มชั้นเรียนเสร็จเสร็จ',
                          buttons: [{
                            text: 'ตกลง',
                            handler: ()=>{
                              const loader = this.loadingCtrl.create({
                                content: "Pleas wait...",
                                duration: 500,

                              });
                              loader.present();

                            }
                          }]
                        });
                        alert.present();
                      }

                    });


                  this.navCtrl.setRoot(MainstudentPage);
                }
              },
              {
                text: 'ยกเลิก',
                handler: ()=>{
                }
              }
            ]
          });
          confirm.present();
        }
      });
    }else{
      const alert = this.alertCtrl.create({
        title: 'เกิดข้อผิดดพลาด',
        subTitle: 'กรุณาใส่ข้อมูล',
        buttons: ['ตกลง']
      });
      alert.present();
    }
  })
  }
  ngOnInit(){
    this.buildForm();
  }
  buildForm(): void{
    this.user = new FormGroup({
      class_name: new FormControl("",Validators.required)


    });
  }
  pop(){
    this.navCtrl.setRoot(MainstudentPage);
  }

}
