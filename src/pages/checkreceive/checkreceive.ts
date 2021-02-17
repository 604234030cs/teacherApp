import { ClassPage } from './../class/class';
// import { CheckreceivePage } from './checkreceive';
import { MainstudentPage } from './../mainstudent/mainstudent';
// import { text } from '@angular/core/src/render3/instructions';
import { SettingStatusreceivePage } from './../setting-statusreceive/setting-statusreceive';
import { TeacherPage } from './../teacher/teacher';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as Enums from '../enums/enums';
import { HttpClient } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the CheckreceivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkreceive',
  templateUrl: 'checkreceive.html',
})
export class CheckreceivePage {


  user: FormGroup;
  item3: any = [];
  item4: Array<{}> = [];
  checkname: any = [];
  updatecheckname: any = [];
  arry: any = [];

  interval: number;

  edit: boolean = false;

  ck_study = "1";

  ck_date;
  idclass;

  st_id;
  checkdate;
  par_user;
  ck_receive;
  ck_other;

  text;
  i = 0;
  c_length = 0;
  c_success = 0;


  accout: any = [];
  teacher: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController,
    public formBuilder: FormBuilder, private storage: Storage, public loadingCtrl: LoadingController) {
    this.loaddatareceive();

    this.idclass = this.navParams.get('class_id');
    this.ck_date = this.navParams.get('ckdate');

    storage.ready().then(() => {
      storage.get('edit').then((val) => {
        this.edit = val;
        console.log(val);

        if (val == true) {

          this.settingReloadData();
          // this.status="กำลังเปิดสถานะ"
        }
        else if (val == false) {

          clearInterval(this.interval);
          // this.status=null
        }
        else {

        }
      })
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckreceivePage');
    this.loaddatareceive();


  }

  loaddatareceive() {


    this.storage.get('setreceive').then((data) => {
      console.log("เช็คกลับบ้าน", data);

      this.ck_date = data.ckdate

      let url6 = Enums.APIURL.URL + '/public/index.php/checkaddsettingstudent4/' + this.ck_date + '&&' + data.class_id + '&&' + this.ck_study;

      this.http.get(url6).subscribe(data => {
        this.item3 = data;
        // this.arry=[];
        // console.log(this.item3);
        console.log(data);
        if (this.item3['ck_receive'] == '1') {
          this.text = "ยังไม่ถูกรับ"

        } else if (this.item3['ck_receive'] == '2') {
          this.text = "รับกลับไปแล้ว"
        }


      });
    })

  }

  loaddatareceive2() {


    this.storage.get('setreceive').then((data) => {
      // console.log(data);

      // console.log(data.teacher_user);
      // console.log(data.teacher_password);


      // let url = Enums.APIURL.URL +'/public/index.php/teacherall/'+data.teacher_user+'&&'+data.teacher_password;
      let url6 = Enums.APIURL.URL + '/public/index.php/checkaddsettingstudent4/' + data.ckdate + '&&' + data.class_id + '&&' + this.ck_study;

      this.http.get(url6).subscribe(data => {
        this.item3 = data;
        this.arry = [];
        // console.log(this.item3);
        console.log(data);
        if (this.item3['ck_receive'] == '1') {
          this.text = "ยังไม่ถูกรับ"

        } else if (this.item3['ck_receive'] == '2') {
          this.text = "รับกลับไปแล้ว"
        }
        this.CaculatDirections(this.item3);

      });
    })

  }



  gohome() {
    this.navCtrl.push(TeacherPage)
  }


  poppage() {
    this.navCtrl.push(ClassPage);
  }

  settingreceive(ckid, ckreceive, ckother) {


    this.storage.get('setreceive').then((data) => {
      console.log(ckid);
      console.log(data.ckdate);
      let url8 = Enums.APIURL.URL + '/public/index.php/checkaddsettingstudent2/' + ckid + '&&' + data.ckdate;
      this.http.get(url8).subscribe((data: any) => {
        console.log("dataGetReceiveTableCheckName:", data);



        if (data['ck_id'] == ckid && data['ck_date'] == data.ck_date) {
          console.log("2");

          let url9 = Enums.APIURL.URL + '/public/index.php/settingstudent2/' + ckid + '&&' + data.st_id + '&&' + data.ck_date + '&&' + data.ck_study + '&&' + ckreceive + '&&' + ckother;
          this.http.get(url9).subscribe((data2: any) => {
            console.log(url9);
            this.updatecheckname = data2;
            if (this.updatecheckname != null) {
              const alert = this.alertCtrl.create({
                title: 'เสร็จสิน',
                subTitle: 'อัพเดคสถานะการรับสำเร็จ',
                buttons: [{
                  text: 'ตกลง',
                  handler: () => {
                    const loader = this.loadingCtrl.create({
                      content: "Pleas wait...",
                      duration: 200,

                    });
                    loader.present();

                  }
                }]
              });
              alert.present();
            }

          });

        }
        else {

        }
      });
    })




  }
  ngOnInit() {
    this.buildForm();
  }
  buildForm(): void {
    this.user = new FormGroup({
      ck_receive: new FormControl("", Validators.required),
      ck_other: new FormControl("", Validators.required)


    });
  }

  distance(stid, pruser) {
    this.navCtrl.push(SettingStatusreceivePage, {
      st_id: stid,
      par_user: pruser
    })

  }





  pop() {
    this.navCtrl.setRoot(ClassPage);
  }

  mode() {
    console.log(this.edit);


    if (this.edit == true) {
      const confirm = this.alertCtrl.create({
        title: 'คุณต้องเปิดโหมดรับบุตรหรือไม่',
        buttons: [{
          text: 'ตกลง',
          handler: () => {
            this.settingReloadData();

          }
        },
        {
          text: 'ยกเลิก',
          handler: () => {
            if (this.edit == false) {
              this.edit = true;
            } else {
              this.edit = false;
            }
          }
        }
        ]
      });
      confirm.present();
    } else {
      const confirm = this.alertCtrl.create({
        title: 'คุณต้องปิดโหมดรับบุตรหรือไม่',
        buttons: [{
          text: 'ตกลง',
          handler: () => {
            this.edit = false;
            this.arry = null;
            // this.status = null

            clearInterval(this.interval);
            setTimeout(() => {

            }, 3000)
            // this.loaddata();
          }
        },
        {
          text: 'ยกเลิก',
          handler: () => {
            if (this.edit == false) {
              this.edit = true;
            } else {
              this.edit = false;
            }
          }
        }
        ]
      });
      confirm.present();

    }
    this.storage.set('edit', this.edit);
  }

  settingReloadData(){
    this.interval = setInterval(() => {
      this.loaddatareceive2();
    }
      , 10000)
  }



  CaculatDirections(item3) {
    this.storage.get('accoutuser').then((position) => {
      let url = Enums.APIURL.URL + '/public/index.php/teacherall/' + position.teacher_user + '&&' + position.teacher_password;
      this.http.get(url).subscribe(user => {
        this.accout = user;
        console.log(user);


        // console.log(item3.length);
        // console.log(position);



        for (let i = 0; i < item3.length; i++) {
          //     // console.log(item3[i].longitude);
          //  var R = 6373; // km
          var lat1 = this.accout.teacher_latitude * Math.PI / 180; //1
          //  console.log("1");

          var lng1 = this.accout.teacher_longitude;  //2
          //  console.log("2");
          if (item3[i].latitude == null) {
            console.log("latitudeNull:");
            var lat2 = item3[i].latitude * Math.PI / 180;
            var lng2 = item3[i].longitude;
            //  var dLat = (lat2 - lat1) * Math.PI/180;
            var dLon = (lng2 - lng1) * Math.PI / 180;
            console.log(lat1);
            console.log(lat2);
            console.log(lng1);
            console.log(lng2);

            // var a = Math.pow(Math.sin(dLat/2),2) + Math.pow(Math.sin(dLon/2),2)* Math.cos(lat1) * Math.cos(lat2);
            var a = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon);
            console.log(a);

            if (a > 1) {
              a = 1;
            }
            a = Math.acos(a);
            a = a * 180 / Math.PI;
            a = a * 60 * 1.1515;
            var valuedirec = a * 1.609344
            var directions = valuedirec.toFixed(1);
            let km;
            km = 2;
            console.log(directions);
            console.log(valuedirec);
            directions = "ผู้ปกครองยังไม่ระบุพิกัด"
            //  if(directions >= km){
            //    directions = "2.0"
            //  }
            this.arry.push({
              ck_id: item3[i]['ck_id'],
              st_id: item3[i]['st_id'],
              student_name: item3[i]['student_name'],
              student_sname: item3[i]['student_sname'],
              student_nickname: item3[i]['student_nickname'],
              student_sex: item3[i]['student_sex'],
              class_id: item3[i]['class_id'],
              par_user: item3[i]['par_user'],
              ck_date: item3[i]['ck_date'],
              ck_status: item3[i]['ck_status'],
              ck_receive: item3[i]['ck_receive'],
              ck_other: item3[i]['ck_other'],
              latitude: item3[i]['latitude'],
              longitude: item3[i]['longitude'],
              directions: directions + ' ' ,
              valuedirec: valuedirec
            });

          }
          else {
            console.log("latitudeNull:");
            var lat2 = item3[i].latitude * Math.PI / 180;
            var lng2 = item3[i].longitude;
            //  var dLat = (lat2 - lat1) * Math.PI/180;
            var dLon = (lng2 - lng1) * Math.PI / 180;
            console.log(lat1);
            console.log(lat2);
            console.log(lng1);
            console.log(lng2);

            // var a = Math.pow(Math.sin(dLat/2),2) + Math.pow(Math.sin(dLon/2),2)* Math.cos(lat1) * Math.cos(lat2);
            var a = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon);
            console.log(a);

            if (a > 1) {
              a = 1;
            }
            a = Math.acos(a);
            a = a * 180 / Math.PI;
            a = a * 60 * 1.1515;
            var valuedirec = a * 1.609344
            var directions = valuedirec.toFixed(1);
            let km;
            km = 2;
            console.log(directions);
            console.log(valuedirec);
             if(directions >= km){
               directions = "2.0"
             }
             this.arry.push({
              ck_id: item3[i]['ck_id'],
              st_id: item3[i]['st_id'],
              student_name: item3[i]['student_name'],
              student_sname: item3[i]['student_sname'],
              student_nickname: item3[i]['student_nickname'],
              student_sex: item3[i]['student_sex'],
              class_id: item3[i]['class_id'],
              par_user: item3[i]['par_user'],
              ck_date: item3[i]['ck_date'],
              ck_status: item3[i]['ck_status'],
              ck_receive: item3[i]['ck_receive'],
              ck_other: item3[i]['ck_other'],
              latitude: item3[i]['latitude'],
              longitude: item3[i]['longitude'],
              directions: directions + ' ' + 'กม.',
              valuedirec: valuedirec
            });
          }


          // var c =  2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));s
          // var d = R  * c;
          // console.log("1ระยะทางได้ผลลัพธ์ = " + valuedirec);


        }

        // console.log(this.arry);
        let temp;
        let j: number;
        let k: number;
        // console.log(this.arry.length);
        for (k = 0; k < this.arry.length - 1; k++) {
          // console.log(k);

          for (j = 0; j < this.arry.length - 1; j++) {
            // console.log(j);
            let index = j + 1;
            // console.log(this.arry[index]['valuedirec']);

            if (this.arry[j]['valuedirec'] > this.arry[j + 1]['valuedirec']) {
              temp = this.arry[j];
              this.arry[j] = this.arry[j + 1];
              this.arry[j + 1] = temp;
            }

            // console.log(this.arry[j]['directionscaculat']);

          }
        }
        console.log('หลังเรียง');
        console.log(this.arry);

      });
    });
  }








}
