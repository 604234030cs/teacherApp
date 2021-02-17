import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';
import { MainstudentPage } from '../mainstudent/mainstudent';
import * as Enums from '../enums/enums';
/**
 * Generated class for the StudentPage page.d
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {

  user:FormGroup;
  perent:any =[];

  sex:  any=['เด็กชาย','เด็กหญิง'];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient,public formBuilder: FormBuilder,
              public alertCtrl:AlertController,public loadingCtrl:LoadingController)
              {
                this.loaddata();
                this.user = this.formBuilder.group({
                  st_id: ['', Validators.required],
                  st_title: ['', Validators.required],
                  st_name: ['', Validators.required],
                  st_lassname: ['', Validators.required],
                  st_class: ['', Validators.required],
                  pr_user: ['', Validators.required],


                });
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentPage');

  }
  loaddata(){
    let url3 = Enums.APIURL.URL +'/public/index.php/allparent';
    this.http.get(url3).subscribe(dataparent=>{
      this.perent = dataparent;
      console.log(dataparent);

    })
  }

  regisst(){
    console.log(this.user.value);
    console.log(this.user.valid);



    if(this.user.value.st_id != ""){
      let url = Enums.APIURL.URL +'/public/index.php/registerstudent';
      let url2 = Enums.APIURL.URL +'/public/index.php/checkstudent/'+this.user.value.st_id;

      this.http.get(url2).subscribe((err:any)=>{
        if(err['st_id'] == this.user.value.st_id){
          const alert = this.alertCtrl.create({
            title: 'เกิดข้อผิดพลาด',
            subTitle: 'user ได้ถูกใช้ไปแล้ว',
            buttons: ['OK']
          });
          alert.present();
        }else if(err['st_id'] != this.user.value.st_id){
          let setdata = JSON.stringify({
                st_id: this.user.value.st_id,
                st_title: this.user.value.st_title,
                st_name: this.user.value.st_name,
                st_lassname: this.user.value.st_lassname,
                st_class: this.user.value.st_class,
                pr_user: this.user.value.pr_user

          });
          let datapost = JSON.parse(setdata);
          const confirm = this.alertCtrl.create({
            title: 'ยืนยันการเพิ่มสมาชิค',
            message: 'กดปุ่มยืนยันเพื่อเพิ่มสมาชิค',
            buttons:[
              {
                text: 'ยืนยัน',
                handler: () =>{
                  this.http.post(url,datapost).subscribe((status:any)=>{
                    if(status == 200){
                      const alert = this.alertCtrl.create({
                        title: 'สำเร็จ',
                        subTitle: 'ลงทะเบียนเรียบร้อย',
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
  }

  ngOnInit(){
    this.buildForm();
  }
  buildForm(): void{
    this.user = new FormGroup({
      st_id: new FormControl("",Validators.required),
      st_title: new FormControl("",Validators.required),
      st_name: new FormControl("",Validators.required),
      st_lassname: new FormControl("",Validators.required),
      st_class: new FormControl("",Validators.required),
      pr_user: new FormControl("",Validators.required),

    });
  }


}



