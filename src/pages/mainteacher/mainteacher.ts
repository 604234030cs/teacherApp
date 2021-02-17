import { TeacherPage } from './../teacher/teacher';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import * as Enums from '../enums/enums';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MainteacherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mainteacher',
  templateUrl: 'mainteacher.html',
})
export class MainteacherPage {

  accout: any= [];
  teacher: any=[];
  latitude;
  longitude;
  edit: boolean=false;
  sex:  any=['นางสาว','นาง','นาย'];

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
                    private storage: Storage,public http: HttpClient, public alertCtrl:AlertController,private geolocation: Geolocation)
                    {
                      this.loaddata();
                    }

  ionViewWillLoad() {
    console.log('ionViewDidLoad MainteacherPage');
    this.loaddata();

  }
 //ionViewWillEnter(){

 //  this.storage.get('accoutuser').then(data=>{
 //    this.accout = data;
 //    console.log(data);
 //  })
 //  let url ='http://localhost/public/index.php/teacher/user='+this.accout.tuser+'&&'+'pass='+this.accout.tpassword;
 //  this.http.get(url).subscribe(user =>{
 //    this.teacher = user;
 //    console.log(user);
 //
 //  })

 //}

 loaddata(){

  this.storage.get('accoutuser').then((data)=>{
    console.log(data);

    console.log(data.teacher_user);
    console.log(data.teacher_password);


    let url = Enums.APIURL.URL +'/public/index.php/teacherall/'+data.teacher_user+'&&'+data.teacher_password;
    this.http.get(url).subscribe(user =>{
    this.teacher = user;
    console.log(user);

  });
  })

}


  ionViewDidLeave(){
    this.edit=false
    this.dorefres();

  }


  editAccount(){

    let url = Enums.APIURL.URL +'/public/index.php/editteacher/'+this.teacher.teacher_id+'&&'+this.teacher.teacher_title+'&&'+this.teacher.teacher_name
               +'&&'+this.teacher.teacher_sname+'&&'+this.teacher.teacher_address+'&&'+this.teacher.teacher_tel;

      this.http.get(url).subscribe(data=>{
      this.accout = data;
      if(data != false){
        const alert = this.alertCtrl.create({
          title: 'ยืนยันการแก้ไขมูล',
          buttons: [{
            text: 'ตกลง',
            handler: ()=>{
              this.edit=false

                this.dorefres();
            }
          },
          {
            text: 'ยกเลิก',
            handler: () =>{}
          }
        ]
        })
        alert.present();
      }else{

        //
      }


    })

  }

  updatecoordinates(){
    console.log("22");


    this.storage.get('accoutuser').then((data)=>{
      this.accout = data;
      console.log(data);
      let url = Enums.APIURL.URL +'/public/index.php/teacherall/'+data.teacher_user+'&&'+data.teacher_password;
      this.http.get(url).subscribe(user =>{
      this.teacher = user;
      console.log(user);



      if(user != null ){
        console.log("3");
        console.log(this.teacher.teacher_id);

        const confirm = this.alertCtrl.create({
          title: 'อัพเดตพิกัดที่อยู่',
          subTitle: 'กดปุ่มยืนยันเพื่ออัพเดต',
          buttons:[
            {
            text: 'ยืนยัน',
            handler: ()=>{
              this.geolocation.getCurrentPosition().then((resp) => {
                resp.coords.latitude
                resp.coords.longitude
                // this.latitude = resp.coords.latitude;
                // this.longitude = resp.coords.longitude;
                // console.log(this.latitude);
                // console.log(this.longitude);

                let url2 = Enums.APIURL.URL + '/public/index.php/editteacherlatlong/'+this.teacher.teacher_id +'&&'+resp.coords.latitude+'&&'+resp.coords.latitude;
                this.http.get(url2).subscribe((data3:any)=>{
                  console.log(data3);
                  if(data3.status != null){
                    const alert = this.alertCtrl.create({
                      title: 'สำเร็จ',
                      subTitle: 'อัพเดตพิกัดเรียบร้อย',
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
                  this.loaddata();
                });
              })


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
    })




    this.loaddata();

  }
  updatecoordinates3(){
    console.log("22");


    this.storage.get('accoutuser').then((data)=>{
      this.accout = data;
      console.log(data);
      let url = Enums.APIURL.URL +'/public/index.php/teacherall/'+data.teacher_user+'&&'+data.teacher_password;
      this.http.get(url).subscribe(user =>{
      this.teacher = user;
      console.log(user);



      if(user != null ){
        console.log("3");
        console.log(this.teacher.teacher_id);

        const confirm = this.alertCtrl.create({
          title: 'ต้องการล้างพิกัดที่อยู่',
          subTitle: 'กดปุ่มยืนยันเพื่อล้างพิกัด',
          buttons:[
            {
            text: 'ยืนยัน',
            handler: ()=>{
              // this.geolocation.getCurrentPosition().then((resp) => {

                this.latitude = "null"
                this.longitude = "null"
                console.log(this.latitude);
                console.log(this.longitude);

                let url2 = Enums.APIURL.URL + '/public/index.php/editteacherlatlong/'+this.teacher.teacher_id +'&&'+this.latitude+'&&'+this.longitude;
                this.http.get(url2).subscribe((data3:any)=>{
                  console.log(data3);
                  if(data3.status != null){
                    const alert = this.alertCtrl.create({
                      title: 'สำเร็จ',
                      subTitle: 'ล้างพิกัดที่อยู่เรียบร้อย',
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
                  this.loaddata();
                });
              // })


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
    })






  }
  dorefres(){
    setTimeout(()=>{
    this.ionViewWillLoad();
  },500)
}

pop(){
  this.navCtrl.setRoot(TeacherPage);
}



}
