import { TeacherPage } from './../teacher/teacher';
import { ClassPage } from './../class/class';
// import { text } from '@angular/core/src/render3/instructions';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import * as Enums from '../enums/enums';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChecknamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkname',
  templateUrl: 'checkname.html',
})
export class ChecknamePage {


  parentandstudent: any = [];
  item3: any = [{

    st_id: null,
    ck_study: null,

  }];
  ck_date;

  selectedArray: any = [];
  checked = [];
  idclass;
  i = 0;
  c_length = 0;
  c_success = 0;


  monthNames: string[];
  nbDate: number;
  nbMonth: number;
  stMonth: string;
  nbYear: number;
  datastreceive;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,
               public alertCtrl: AlertController,public loadingCtrl:LoadingController,private storage: Storage) {


                let date = new Date();




                this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                this.nbDate = date.getDate();
                this.nbMonth = date.getMonth() + 1;
                this.stMonth = this.monthNames[date.getMonth()];
                this.nbYear = date.getFullYear();

                this.ck_date = this.nbYear+'-'+this.nbMonth +'-'+this.nbDate;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad checknamePage');
    this.storage.get('keyclass2').then((data)=>{

    let url = Enums.APIURL.URL + '/public/index.php/parentandstudent/'+data.class_id;
    this.http.get(url).subscribe(data => {
      this.item3 = data;
      console.log(this.item3);

    });
  })
  }




  check(res) {
    this.presentAlerRadio(res)
  }
  presentAlerRadio(res) {
    this.i = 0;
    const alert = this.alertCtrl.create({
      title: 'ck_study',
      inputs: [
        // {
        //   name: 'come_study',
        //   type: 'radio',
        //   label: 'มาเรียน',
        //   value: 'มาเรียน'
        // },
        {
          name: 'study',
          type: 'radio',
          label: 'มาเรียน',
          value: '1'
        },
        {
          name: 'sick_leve',
          type: 'radio',
          label: 'ลาป่วย',
          value: '2'
        },
        {
          name: 'errand_leve',
          type: 'radio',
          label: 'ลากิจ',
          value: '3'
        },
        {
          name: 'Not_come to study',
          type: 'radio',
          label: 'ไม่มาเรียน',
          value: '4'
        },
      ],
      buttons: [
        {
          text: 'Cencel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'OK',
          handler: (value) => {
            for (let i = 0; i < this.item3.length; i++) {
              if (this.item3[this.i].st_id == res.st_id) {
                this.item3[this.i].ck_study = value;
              }
              this.i++;
            };
            console.log('Confirm Ok', this.item3);

          }
        }
      ]
    });
    alert.present();
  }

  ISNERT_CHECK(data,ckdate) {
    this.storage.get('accoutuser').then((data3:any)=>{
    this.storage.get('keyclass2').then((data2)=>{
    this.c_length = data.length;
    this.c_success = 0;
    // console.log('data',data);
    // console.log(ckdate);
    let i;
    let setdata2;

    if(ckdate != ""){
        console.log("วันที่ไม่ว่าง",ckdate);
        
        let url =  Enums.APIURL.URL + '/public/index.php/adddate2';
        let url4 = Enums.APIURL.URL +'/public/index.php/checkdatecheckname/'+ckdate + '&&' + data3.teacher_id;
        this.http.get(url4).subscribe((date:any)=>{
          console.log('วันที่',date['check_data']);
          console.log('บัญชีครู',date['teacher_id']);
          console.log('บัญชีครู',data3.teacher_id);
          
          if(date['check_data'] != ckdate && date['teacher_id'] != data3.teacher_id ){
            console.log("เพิ่มวันที่");
            console.log(data3.teacher_id);
            
            let setdata = JSON.stringify({
              check_data: ckdate,
              teacher_id: data3.teacher_id
            });
            let datapost = JSON.parse(setdata);
            this.http.post(url,datapost).subscribe((datadate:any)=>{
            console.log(datadate);
            });
            let url2 = Enums.APIURL.URL +'/public/index.php/checknamefromdate/'+date.check_data+'&&' + data2.class_id;
            this.http.get(url2).subscribe((checkname:any)=>{
              console.log(checkname,"1");
              
              if(checkname == false){

                for (i = 0; i < data.length; i++) {
                  if(data[i].ck_study == null){
                  setdata2 = JSON.stringify({
                    st_id: data[i].st_id,
                    ck_date: ckdate,
                    ck_study:"1",
                    ck_receive: "1",
                    ck_other: "ไม่มี"
                  });
                  let datapost = JSON.parse(setdata2);
                  let url33 = Enums.APIURL.URL + '/public/index.php/addsettingstudent2';
                  this.http.post(url33,datapost).subscribe((data: any) => {
                    console.log('data', data);
                    this.datastreceive = 'success';

                  });

                }

              else if(data[i].ck_study != null) {
                for (i = 0; i < data.length; i++) {
                  setdata2 = JSON.stringify({
                    st_id: data[i].st_id,
                    ck_date: ckdate,
                    ck_study:data[i].ck_study,
                    ck_receive:"1",
                    ck_other:"ไม่มี"
                  });
                  let datapost = JSON.parse(setdata2);
                  let url33 = Enums.APIURL.URL + '/public/index.php/addsettingstudent2';
                  this.http.post(url33,datapost).subscribe((data: any) => {
                    console.log('data', data);
                    this.datastreceive = 'success';
                    
                  });


                }
              }
            }
              console.log(this.datastreceive);
              
            if(this.datastreceive == null){
              const alert = this.alertCtrl.create({
                title: 'แจ้งเตือน',
                subTitle: 'เช็คชื่อเรียบร้อย',
                buttons: [
                  {
                    text: 'ตกลง',
                    handler:()=>{
                      this.navCtrl.setRoot(ClassPage)
                    }
                  }
                ]
              })
              alert.present();
            }


              }else if (checkname != false){
                console.log("4");
                const alert = this.alertCtrl.create({
                  title: 'แจ้งเตือน',
                  subTitle: 'ได้ทำการเช็คชื่อวันนี้ไปแล้ว',
                  buttons: [
                    {
                    text: 'ตกลง',
                    handler: ()=>{
                      this.navCtrl.setRoot(ClassPage)
                    }

                  }
                ]


                })
                alert.present();
              }
            })

          }else {
            console.log("ไม่เพิ่มวันที่");
            
            console.log("2");
            console.log(date.check_data);
            console.log(data2.class_id);


          let url2 = Enums.APIURL.URL +'/public/index.php/checknamefromdate/'+date.check_data+'&&' + data2.class_id;
            this.http.get(url2).subscribe((checkname:any)=>{
              console.log(checkname,"2");
              

              if(checkname == false){

                for (i = 0; i < data.length; i++) {
                  if(data[i].ck_study == null){
                  setdata2 = JSON.stringify({
                    st_id: data[i].st_id,
                    ck_date: ckdate,
                    ck_study:"1",
                    ck_receive: "1",
                    ck_other: "ไม่มี"
                  });
                  let datapost = JSON.parse(setdata2);
                  let url33 = Enums.APIURL.URL + '/public/index.php/addsettingstudent2';
                  this.http.post(url33,datapost).subscribe((data: any) => {
                    console.log('data', data);
                    this.datastreceive = "success";

                  });

                }

              else if(data[i].ck_study != null) {
                for (i = 0; i < data.length; i++) {
                  setdata2 = JSON.stringify({
                    st_id: data[i].st_id,
                    ck_date: ckdate,
                    ck_study:data[i].ck_study,
                    ck_receive:"1",
                    ck_other:"ไม่มี"
                  });
                  let datapost = JSON.parse(setdata2);
                  let url33 = Enums.APIURL.URL + '/public/index.php/addsettingstudent2';
                  this.http.post(url33,datapost).subscribe((data: any) => {
                    console.log('data', data);
                    this.datastreceive = "success";
                  });


                }
              }
            }

            if(this.datastreceive == null){
              const alert = this.alertCtrl.create({
                title: 'แจ้งเตือน',
                subTitle: 'เช็คชื่อเรียบร้อย',
                buttons: [
                  {
                    text: 'ตกลง',
                    handler:()=>{
                      this.navCtrl.setRoot(ClassPage)
                    }
                  }
                ]
              })
              alert.present();
            }


              }else if (checkname != false){
                console.log("4");
                const alert = this.alertCtrl.create({
                  title: 'แจ้งเตือน',
                  subTitle: 'ได้ทำการเช็คชื่อวันนี้ไปแล้ว',
                  buttons: [
                    {
                    text: 'ตกลง',
                    handler: ()=>{
                      this.navCtrl.setRoot(ClassPage)
                    }

                  }
                ]


                })
                alert.present();
              }
            })
          }
        })

    }
   })
  })
  }


  gohome(){
    this.navCtrl.setRoot(TeacherPage)
  }

  poppage(){
    this.navCtrl.setRoot(ClassPage);
  }


}
