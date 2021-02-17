import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';

import { MainstudentPage } from '../mainstudent/mainstudent';
import * as Enums from '../enums/enums';
/**
 * Generated class for the StudentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-detail',
  templateUrl: 'student-detail.html',
})
export class StudentDetailPage {

  detailstudent: any=[];
  parent: boolean=false;
  student: boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentDetailPage');
    this.detailstudent = this.navParams.data;
    console.log(this.detailstudent);

  }
  ionViewDidLeave(){
    this.parent=false
    this.student=false
    this.dorefres();

  }
  editstudent(){

    let url = Enums.APIURL.URL +'/public/index.php/editteacher/'+this.detailstudent.tid+'&&'+this.detailstudent.title+'&&'+this.detailstudent.tname
               +'&&'+this.detailstudent.tlassname+'&&'+this.detailstudent.tage+'&&'+this.detailstudent.taddress+'&&'+this.detailstudent.tphone;

      this.http.get(url).subscribe(data=>{
      this.detailstudent = data;
      if(data != false){
        const alert = this.alertCtrl.create({
          title: 'ยืนยันการแก้ไขมูล',
          buttons: [{
            text: 'ตกลง',
            handler: ()=>{
              this.student=false

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
  editparent(){

    let url = Enums.APIURL.URL +'/public/index.php/editparent/'+this.detailstudent.p_id+'&&'+this.detailstudent.pr_title+'&&'+this.detailstudent.pr_name
               +'&&'+this.detailstudent.pr_lassname+'&&'+this.detailstudent.pr_address+'&&'+this.detailstudent.pr_phone;

      this.http.get(url).subscribe(data=>{
      this.detailstudent = data;
      if(data != false){
        const alert = this.alertCtrl.create({
          title: 'ยืนยันการแก้ไขมูล',
          buttons: [{
            text: 'ตกลง',
            handler: ()=>{
              this.parent=false

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
  dorefres(){
    setTimeout(()=>{
    this.ionViewDidLoad();
  },500)
}
deletest(){
  let url = Enums.APIURL.URL +'/public/index.php/deletest/'+this.detailstudent.s_id;
  this.http.get(url).subscribe(dl=>{
    this.detailstudent = dl;
  })
  const confirm = this.alertCtrl.create({
    title: 'ต้องการลบข้อมูลหรือไม่?',
    buttons:[{
      text: 'ตกลง',
      handler: () =>{
        this.navCtrl.push(MainstudentPage);
      }

    },
    {
      text: 'ยกเลิก',
      handler: () => {}
    }

    ]

  });
  confirm.present();




}

}
