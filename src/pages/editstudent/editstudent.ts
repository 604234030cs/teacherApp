import { ClassPage } from './../class/class';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as Enums from '../enums/enums';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
/**
 * Generated class for the EditstudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editstudent',
  templateUrl: 'editstudent.html',
})
export class EditstudentPage {

  user:FormGroup;

  acount: any = ['st_id','student_title','student_name','student_sname','student_nickname','Student_sex','class_id',
                 'par_user','par_id','par_title','par_password','par_name','par_sname','par_tel','par_address','latitude','longitude',
  ];
  classid:any;
  paruser:any;
  ck_date:any;
  st_id:any;
  update:any=[];
  stutus3:any=['ck_id','st_id','student_name','student_sname','student_nickname','Student_sex','class_id',
  'par_user','ck_date','ck_status','ck_receive','ck_other','par_tel','latitude','longitude',
];

  statusfromdatabase;
  receivefromdatabase;

  editstudent: boolean=false;
  editparent: boolean=false;
  editstatus: boolean=false;
  ck_status: boolean ; //
  ck_receive: boolean ; //





  ck_other;

  settingdate;

  monthNames: string[];
  nbDate: number;
  nbMonth: number;
  stMonth: string;
  nbYear: number;
  sex:  any=['ชาย','หญิง'];
  title:  any=['เด็กชาย','เด็กหญิง'];
  title2:  any=['นางสาว','นาง','นาย'];

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
              public http: HttpClient, public alertCtrl:AlertController,public formBuilder: FormBuilder)

  {






    let date = new Date();


    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.nbDate = date.getDate();
    this.nbMonth = date.getMonth() + 1;
    this.stMonth = this.monthNames[date.getMonth()];
    this.nbYear = date.getFullYear();

    this.classid = this.navParams.get('class_id')
    this.paruser = this.navParams.get('par_user');
    this.ck_date = this.navParams.get('ckdate');
    this.st_id = this.navParams.get('st_id');


    this.statusfromdatabase = this.navParams.get('statusstudy');
    this.receivefromdatabase = this.navParams.get('statusreceive');

    this.ck_status = this.statusfromdatabase;
    this.ck_receive = this.receivefromdatabase;



    // console.log(this.statusfromdatabase);




    this.loaddata();

    // console.log(this.acount);

  }

  ionViewWillLoad() {
    // console.log('ionViewDidLoad EditstudentPage');
    // console.log(this.classid);
    // console.log(this.paruser);
     this.loaddata();


  }

  pop(){
    this.navCtrl.setRoot(ClassPage);
  }

  loaddata(){

    let url2 =  Enums.APIURL.URL +'/public/index.php/standparedit/'+this.classid+'&&'+this.paruser+'&&'+this.st_id;
    this.http.get(url2).subscribe(user =>{
      this.acount = user;
      // console.log(this.acount[0].par_title);

      // if(this.acount[0].student_title == '1'){
      //   this.title = "เด็กชาย"
      //   if(this.acount[0].par_title == '1'){
      //     this.title2 = "นาย"
      //   }else if(this.acount[0].par_title == '2'){
      //     this.title2 = "นาง"
      //   }else if(this.acount[0].par_title == '3'){
      //     this.title2 = "นางสาว"
      //   }
      // }else if(this.acount[0].student_title == '2'){
      //   this.title = "เด็กหญิง"
      //   if(this.acount[0].par_title == '1'){
      //     this.title2 = "นาย"
      //   }else if(this.acount[0].par_title == '2'){
      //     this.title2 = "นาง"
      //   }else if(this.acount[0].par_title == '3'){
      //     this.title2 = "นางสาว"
      //   }
      // }
    })
  }
  ionViewDidLeave(){
    this.editstudent=false
    this.editparent=false
    // this.editstatus=false
    this.dorefres();

  }



  editAccountstudent(){
    let url =  Enums.APIURL.URL +'/public/index.php/editstudent2/'+this.acount[0].st_id+'&&'+this.acount[0].student_title+'&&'+this.acount[0].student_name+'&&'+this.acount[0].student_sname
               +'&&'+this.acount[0].student_nickname+'&&'+this.acount[0].student_sex;
    console.log(url);

      this.http.get(url).subscribe(data=>{
      this.acount[0] = data;
      // console.log(url);

      if(data != false){
        const alert = this.alertCtrl.create({
          title: 'ยืนยันการแก้ไขมูล',
          buttons: [{
            text: 'ตกลง',
            handler: ()=>{
              this.editstudent=false

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
  editAccountparent(){
      let url =  Enums.APIURL.URL +'/public/index.php/editparent2/'+this.acount[0].par_id+'&&'+this.acount[0].par_user+'&&'+this.acount[0].par_title+'&&'+this.acount[0].par_name
               +'&&'+this.acount[0].par_sname+'&&'+this.acount[0].par_tel+'&&'+this.acount[0].par_address;

      this.http.get(url).subscribe(data=>{
      this.acount[0] = data;
      // console.log(url);

      if(data != false){
        const alert = this.alertCtrl.create({
          title: 'ยืนยันการแก้ไขมูล',
          buttons: [{
            text: 'ตกลง',
            handler: ()=>{
              this.editparent=false

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
    this.ionViewWillLoad();
  },500)
}
ngOnInit(){
  this.buildForm();
}
buildForm(): void{
  this.user = new FormGroup({
    ck_other: new FormControl("",Validators.required),


  });
}


}
