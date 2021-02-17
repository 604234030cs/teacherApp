import { TestaddstudentPage } from './../testaddstudent/testaddstudent';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController,ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import * as Enums from '../enums/enums';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AddparentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addparent',
  templateUrl: 'addparent.html',
})
export class AddparentPage {

  user:FormGroup;
  parent:any=[];
  dataparent:any={};
  idclass;
  nameclass:string='';
  sex:  any=['นางสาว','นาง','นาย'];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,public http: HttpClient,
    public alertCtrl:AlertController,public loadingCtrl:LoadingController,
    private geolocation: Geolocation,private view:ViewController
    ,private storage: Storage) //private storage: Storage
    {
      this.idclass = this.navParams.get('clsss_id');
      this.nameclass = this.navParams.get('class_name');

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddparentPage');
  }

  addparent(classname,id){

    this.storage.get('accoutuser').then((data:any)=>{
    console.log(classname);
    console.log(id);

    console.log(this.user.value);
    console.log(this.user.valid);
    console.log("par_user", this.user.value.par_user);
    if(this.user.value.par_user != ""&&this.user.value.par_name != "" &&this.user.value.par_sname){
      let url =  Enums.APIURL.URL + '/public/index.php/registerparent2';
      // let url2 = Enums.APIURL.URL + '/public/index.php/checkparent/'+this.user.value.par_user;
      let url3 = Enums.APIURL.URL + '/public/index.php/checkparent2/'+this.user.value.par_user + '&&' +data.teacher_id;


      this.http.get(url3).subscribe((err:any={})=>{
        // this.parent = err;
        // this.dataparent = err;
        // console.log(this.parent[0].par_user);
        // console.log(this.parent.par_user);
        console.log(this.user.value.par_user);
      //   let account2 = {

      //     par_user:err[this.user.value.par_user]

      //  }
      //  this.storage.set('accountparent',account2);


        if(err['par_user'] == this.user.value.par_user && err['teacher_id'] == data.teacher_id){
          const alert = this.alertCtrl.create({
            title: 'เกิดข้อผิดพลาด',
            subTitle: 'user ได้ถูกใช้ไปแล้ว',
            buttons: ['OK']
          });
          alert.present();
        }else if(err['par_user']  != this.user.value.par_user && err['teacher_id'] != data.teacher_id ){
          let setdata = JSON.stringify({
                par_user: this.user.value.par_user,
                par_password: this.user.value.par_password,
                par_title: this.user.value.par_title,
                par_name: this.user.value.par_name,
                par_sname: this.user.value.par_sname,
                par_tel: this.user.value.	par_tel,
                par_address: this.user.value.	par_address,
                latitude: null,
                longitude: null,
                teacher_id:data.teacher_id

          });
          let datapost = JSON.parse(setdata);
          const confirm = this.alertCtrl.create({
            title: 'เพิ่มข้อมูลข้อมูลผู้ปกครอง',
            message: 'กดปุ่มยืนยันเพื่อเพิ่มข้อมูล',
            buttons:[
              {
                text: 'ยืนยัน',
                handler: () =>{
                  // this.geolocation.getCurrentPosition().then((resp) => {
                  //    resp.coords.latitude
                  //    resp.coords.longitude
                    this.http.post(url,datapost).subscribe((status:any)=>{
                      console.log(status);

                      if(status.status != null){
                        const alert = this.alertCtrl.create({
                          title: 'สำเร็จ',
                          subTitle: 'เพิ่มข้อมูลเรียบร้อย',
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
                  //  }).catch((error) => {
                  //    console.log('Error getting location', error);
                  //  });

                   this.navCtrl.setRoot(TestaddstudentPage,
                    {

                    class_id:id,
                    class_name:classname,
                    par_user:this.user.value.par_user
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
    })
  }

pop(){
  this.navCtrl.setRoot(TestaddstudentPage);
}

  ngOnInit(){
    this.buildForm();
  }
  buildForm(): void{
    this.user = new FormGroup({
      par_user: new FormControl("",Validators.required),
      par_password: new FormControl("",Validators.required),
      par_title: new FormControl("",Validators.required),
      par_name: new FormControl("",Validators.required),
      par_sname: new FormControl("",Validators.required),
      par_tel: new FormControl("",Validators.required),
      par_address: new FormControl("",Validators.required),




    });
  }
  closeModal(){
    this.view.dismiss()
  }




}
