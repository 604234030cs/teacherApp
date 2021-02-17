import { MainstudentPage } from './../mainstudent/mainstudent';
import { AddparentPage } from './../addparent/addparent';
import { ClassPage } from './../class/class';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController,ModalController,ViewController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import * as Enums from '../enums/enums';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TestaddstudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testaddstudent',
  templateUrl: 'testaddstudent.html',
})
export class TestaddstudentPage {
  gaming: string = "n64";
  gender: string = "f";
  os: string;
  parent:any =[];
  month: string;
  year: number;

  sex:  any=['ชาย','หญิง'];
  title:  any=['เด็กชาย','เด็กหญิง'];



  user:FormGroup;
  classid;
  nameclass:any = ['class_id','class_name'];

  alert: { title: string, subTitle: string };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient,public formBuilder: FormBuilder,
              public alertCtrl:AlertController,public loadingCtrl:LoadingController,
              private modal: ModalController,private storage: Storage)
              {
                this.dorefres();


                this.classid = this.navParams.get('clsss_id');
                this.nameclass = this.navParams.get('class_name');
                this.alert = {
                  title: 'ผู้ปกครอง',
                  subTitle: 'เลือกรายชื่อผู้ปกครอง'
                };

                // this.loaddata();

              }


    ionViewWillLeave() {
  
      console.log('ionViewDidLoad AllrarentPage');
      this.storage.get('accoutuser').then((data:any)=>{
      console.log(data.teacher_id);
      
      let url = Enums.APIURL.URL +'/public/index.php/allparent/'+data.teacher_id;
      this.http.get(url).subscribe((data:any)=>{
        this.parent = data;
        console.log(data);
  
      })
    })
    // this.loaddata();
    // this.dorefres();

  }




  pop(){
    this.navCtrl.setRoot(ClassPage);
  }



  addparent(){
    const myModal = this.modal.create(AddparentPage);
    // this.navCtrl.push(AddparentPage);
    myModal.present();

  }

  stpSelect() {
    console.log('STP selected');
  }
  addstudent(){

    this.storage.get("keyclass2").then((data)=>{


    console.log(this.user.value);
    console.log(this.user.valid);
    console.log(data.class_id);
    // if(this.user.value.class_name != ""){
      let url = Enums.APIURL.URL +'/public/index.php/addstudent2';


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
                student_title: this.user.value.student_title,
                student_name: this.user.value.student_name,
                student_sname: this.user.value.student_sname,
                student_nickname: this.user.value.student_nickname,
                student_sex: this.user.value.student_sex,
                class_id: data.class_id,
                par_user: this.user.value.par_user


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


                  this.navCtrl.setRoot(ClassPage);
                }
              },
              {
                text: 'ยกเลิก',
                handler: ()=>{
                  // this.navCtrl.setRoot(MainstudentPage)
                }
              }
            ]
          });
          confirm.present();

        })
        }


  ngOnInit(){
    this.buildForm();
  }
  buildForm(): void{
    this.user = new FormGroup({
      student_title: new FormControl("",Validators.required),
      student_name: new FormControl("",Validators.required),
      student_sname: new FormControl("",Validators.required),
      student_nickname: new FormControl("",Validators.required),
      student_sex: new FormControl("",Validators.required),
      // class_id: new FormControl("",Validators.required),
       par_user: new FormControl("",Validators.required)

    });
  }

  dorefres(){
    setTimeout(()=>{
    this.ionViewWillLeave();
  },500)
}

}
