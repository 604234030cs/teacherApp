import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { MainteacherPage } from '../mainteacher/mainteacher';
import * as Enums from '../enums/enums';

/**
 * Generated class for the EditteacherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editteacher',
  templateUrl: 'editteacher.html',
})
export class EditteacherPage {

  teacherud: any=[];
  user:FormGroup;
  sex:  any=['เด็กชาย','เด็กหญิง','นางสาว','นาง','นาย'];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,public http: HttpClient,
              public alertCtrl:AlertController,public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditteacherPage');
  }

  update(){
    console.log(this.user.value);
    console.log(this.user.valid);
    if(this.user.value.tuser != ""&&this.user.value.tname != "" &&this.user.value.tlassname){
      let url = Enums.APIURL.URL +'/public/index.php/editteacher/'+this.user.value.tid+'&&'+this.user.value.title
      +'&&'+this.user.value.tname+'&&'+this.user.value.tlassname+'&&'+this.user.value.tage+'&&'+this.user.value.taddress
      +'&&'+this.user.value.tphone;
      let url2 = Enums.APIURL.URL +'/public/index.php/checkuser/'+this.user.value.tuser;

      this.http.get(url2).subscribe((err:any)=>{
        if(err['tuser'] == this.user.value.tuser){
          const alert = this.alertCtrl.create({
            title: 'เกิดข้อผิดพลาด',
            subTitle: 'user ได้ถูกใช้ไปแล้ว',
            buttons: ['OK']
          });
          alert.present();
        }else if(err['tuser'] != this.user.value.tuser){
          let setdata = JSON.stringify({
                tuser: this.user.value.tuser,
                tpassword: this.user.value.tpassword,
                title: this.user.value.titlename,
                tname: this.user.value.tname,
                tlassname: this.user.value.tlassname,
                tage: this.user.value.tage,
                taddress: this.user.value.taddress,
                tphone: this.user.value.tphone
          });
          let datapost = JSON.parse(setdata);
          const confirm = this.alertCtrl.create({
            title: 'ยืนยันการสมัคร',
            message: 'กดปุ่มยืนยันเพื่อลงทะเบียนเข้าสู่ระบบ',
            buttons:[
              {
                text: 'ยืนยัน',
                handler: () =>{
                  this.http.post(url,datapost).subscribe((status:any)=>{
                    if(status=='Success'){
                      const alert = this.alertCtrl.create({
                        title: 'สำเร็จ',
                        subTitle: 'แก้ไขข้อมูลเสร็จสิ้น',
                        buttons: [{
                          text: 'ตกลง',
                          handler: ()=>{
                            const loader = this.loadingCtrl.create({
                              content: "Pleas wait...",
                              duration: 500,

                            });
                            loader.present();
                            this.navCtrl.setRoot(MainteacherPage);
                          }
                        }]
                      });
                      alert.present();
                    }
                  });
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
  }

  ngOnInit(){
    this.buildForm();
  }
  buildForm(): void{
    this.user = new FormGroup({
      tuser: new FormControl("",Validators.required),
      titlename: new FormControl("",Validators.required),
      tname: new FormControl("",Validators.required),
      tlassname: new FormControl("",Validators.required),
      tage: new FormControl("",Validators.required),
      taddress: new FormControl("",Validators.required),
      tphone: new FormControl("",Validators.required),
    });
  }

}
