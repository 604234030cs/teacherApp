import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import * as Enums from '../enums/enums';
import { MainstudentPage } from '../mainstudent/mainstudent';
/**
 * Generated class for the AddstudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addstudent',
  templateUrl: 'addstudent.html',
})
export class AddstudentPage {

  user:FormGroup;
  studnet:any={};
  acountparent:any={};
  parent:any={};
  classid;
  classname:string='';
  paruser:string='';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient,public formBuilder: FormBuilder,
              public alertCtrl:AlertController,public loadingCtrl:LoadingController)

  {



    // this.loaddataparent();

    this.classid = this.navParams.get('class_id');
    this.classname = this.navParams.get('class_name');
    this.paruser = this.navParams.get('par_user');

  }

//   loaddataparent(){

//     this.storage.get('accoutparent').then((data)=>{
//       this.parent = data;
//       console.log(data);
//       let url ='http://localhost/public/index.php/checkparent2/'+this.parent.par_user;
//       this.http.get(url).subscribe(user =>{
//       this.parent = user;
//       console.log(user);

//     });
//     })

// }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddstudentPage');
    console.log(this.classid);
    console.log(this.classname);
    console.log(this.paruser);

  }
  addstudent(){
    console.log(this.user.value);
    console.log(this.user.valid);
    // if(this.user.value.class_name != ""){
      let url = Enums.APIURL.URL + '/public/index.php/addstudent2';


      // this.http.get(url2).subscribe((err:any)=>{
      //   if(err['class_name'] == this.user.value.class_name){
      //     const alert = this.alertCtrl.create({
      //       title: 'เกิดข้อผิดพลาด',
      //       subTitle: 'ชื่อชั้นนี้ ได้ถูกใช้ไปแล้ว',
      //       buttons: ['OK']
      //     });
      //     alert.present();
      //   }else if(err['class_name'] != this.user.value.class_name){
          let setdata = JSON.stringify({
                student_name: this.user.value.student_name,
                student_sname: this.user.value.student_sname,
                student_nickname: this.user.value.student_nickname,
                Student_sex: this.user.value.Student_sex,
                class_id: this.classid,
                par_user: this.paruser


          });
          let datapost = JSON.parse(setdata);
          const confirm = this.alertCtrl.create({
            title: 'ยืนยันเพิ่มนักเรียน',
            message: 'กดปุ่มยืนยันเพื่อเพิ่มนักเรียน',
            buttons:[
              {
                text: 'ยืนยัน',
                handler: () =>{

                    this.http.post(url,datapost).subscribe((status:any)=>{
                      console.log(status);

                      if(status.status != null){
                        const alert = this.alertCtrl.create({
                          title: 'สำเร็จ',
                          subTitle: 'เพิ่มนักเรียนเสร็จเสร็จ',
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


  ngOnInit(){
    this.buildForm();
  }
  buildForm(): void{
    this.user = new FormGroup({
      student_name: new FormControl("",Validators.required),
      student_sname: new FormControl("",Validators.required),
      student_nickname: new FormControl("",Validators.required),
      Student_sex: new FormControl("",Validators.required)
      // class_id: new FormControl("",Validators.required),
      // par_user: new FormControl("",Validators.required),

    });
  }

}
