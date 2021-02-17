import { MainstudentPage } from './../mainstudent/mainstudent';
import { TeacherPage } from './../teacher/teacher';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController  } from 'ionic-angular';
import * as Enums from '../enums/enums';
import { HttpClient} from '@angular/common/http';

/**
 * Generated class for the EditclassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editclass',
  templateUrl: 'editclass.html',
})
export class EditclassPage {

  class_id;
  class:any=['class_id,class_name'];
  class_name;
  text;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient
    ,public alertCtrl:AlertController,public loadingCtrl:LoadingController) {

    this.class_id = this.navParams.get('class_id');
    console.log(this.class_id);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditclassPage');

    let url = Enums.APIURL.URL +'/public/index.php/classid/'+this.class_id;
    this.http.get(url).subscribe((data:any)=>
    {
      this.class = data;
      console.log(this.class[0].class_name);


    })
  }
  pop(){
    this.navCtrl.setRoot(MainstudentPage);
  }
  saveclass(class_id,class_name){

    console.log(class_id);
    console.log(class_name);

    let url = Enums.APIURL.URL +'/public/index.php/classid/'+class_id;
    this.http.get(url).subscribe((data2:any)=>{
      console.log("1");
      console.log(data2[0].class_id);




      if(data2[0].class_id== class_id ){
        console.log("2");


        const confirm = this.alertCtrl.create({
          title: 'แก้ไขชั้นเรียน',
          subTitle: 'กดปุ่มยืนยันเพื่อแก้ไขชั้นเรียน',
          buttons:[
            {
            text: 'ยืนยัน',
            handler: ()=>{
              let url2 = Enums.APIURL.URL +'/public/index.php/saveeditclass/'+class_id+'&&'+class_name;
              this.http.get(url2).subscribe((data3:any)=>{
                console.log(data3);
                if(data3.status != null){
                  const alert = this.alertCtrl.create({
                    title: 'สำเร็จ',
                    subTitle: 'แก้ไขชั้นเรยนสำเร็จ',
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
              this.navCtrl.setRoot(MainstudentPage)
            }
          },
          {
            text: 'ยกเลิก',
            handler:()=>{

            }
          }
        ]
        });
        confirm.present();
      }else{

      }
    })
    // {
    //   this.class = data;
    //   console.log(this.class[0].class_name);


    // })

  }

}
