import { ChecknamePage } from './../checkname/checkname';
import { AllchecknamePage } from './../allcheckname/allcheckname';
import { AllrarentPage } from './../allrarent/allrarent';
import { CheckreceivePage } from './../checkreceive/checkreceive';

import { SettingPage } from './../setting/setting';
import { EditstudentPage } from './../editstudent/editstudent';
import { TestaddstudentPage } from './../testaddstudent/testaddstudent';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { AddparentPage } from '../addparent/addparent';
import { HttpClient} from '@angular/common/http';
import { MainstudentPage } from '../mainstudent/mainstudent';
import * as Enums from '../enums/enums';
import { TeacherPage } from '../teacher/teacher';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-class',
  templateUrl: 'class.html',
})
export class ClassPage {

  // ck_date2 = "2020-10-5";
  ck_date2 ;

  title;


  parentandstudent:any=['st_id','student_title','student_name','student_sname','student_nickname','Student_sex','class_id',
                        'par_user','par_id','par_title','par_password','par_name','par_sname','par_tel','par_address','latitude','longitude'];


  dataclass: any=[];
  idclass;
  nameclass:string='';

  monthNames: string[];
  nbDate: number;
  nbMonth: number;
  stMonth: string;
  nbYear: number;
  ck_status;
  ck_receive;
  ck_other;
  ck_date;

  ckdate;
  st_id;


  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,
              public alertCtrl:AlertController,public loadingCtrl: LoadingController,private storage: Storage) {

                this.dorefres();



    let date = new Date();




    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.nbDate = date.getDate();
    this.nbMonth = date.getMonth() + 1;
    this.stMonth = this.monthNames[date.getMonth()];
    this.nbYear = date.getFullYear();

    this.ck_date2 = this.nbYear+'-'+this.nbMonth +'-'+this.nbDate;

    console.log("this.nbDate: ", this.nbDate);
    console.log("this.nbMonth: ", this.nbMonth);
    console.log("this.stMonth: ", this.stMonth);
    console.log("this.nbYear: ", this.nbYear);
    console.log(this.ck_date2);



  }

  ionViewWillEnter() {
    this.loaddata();
    // console.log('ionViewDidLoad ClassPage');
    // console.log(this.idclass);

    // this.dataclass = this.navParams.data;
    // console.log(this.dataclass);

    // console.log( this.nameclass);
  }


  loaddata(){

    this.storage.get('keyclass2').then((data:any)=>{

    let url = Enums.APIURL.URL +'/public/index.php/parentandstudent/'+data.class_id;
    this.http.get(url).subscribe(data2=>{
      this.parentandstudent = data2;
      // console.log(this.parentandstudent);
    });
  })
  }



  // addparent(idcl,namecl){
  //   this.navCtrl.setRoot(AddparentPage,{
  //     clsss_id:idcl,
  //     class_name:namecl
  //   });
  // }
  deletestandpar(stid){
    const confirm = this.alertCtrl.create({
      title: 'ต้องการลบข้อมูลหรือไม่?',
      buttons:[{
        text: 'ตกลง',
        handler: () =>{
          let url = Enums.APIURL.URL +'/public/index.php/deletest/'+stid;
          this.http.get(url).subscribe(deletest=>{
            this.parentandstudent = deletest;
            console.log(deletest);

            // if(deletest == 'Success'){
            //   let url1 = Enums.APIURL.URL +'/public/index.php/deletepar/'+paruser;
            //   this.http.get(url1).subscribe(deletepar=>{
            //   this.parentandstudent = deletepar;
            //   })
            //   const loadder = this.loadingCtrl.create({
            //     content: "pleas wait.....",
            //     duration: 200,

            //   })
            //   loadder.present();

            // }else{

            // }
          })

          this.navCtrl.setRoot(MainstudentPage);
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
  pop(){
    this.navCtrl.setRoot(MainstudentPage);
  }
  test(idcl,namecl){
    this.navCtrl.setRoot(TestaddstudentPage,{
      clsss_id:idcl,
      class_name:namecl
    });
  }
  editstandpar(idclass,userpar,ck_date,id){
    // console.log(ck_date);
    // let statusstudy;
    let url5 = Enums.APIURL.URL +'/public/index.php/checkaddsettingstudent2/'+id+'&&'+ck_date;

    this.http.get(url5).subscribe((data:any)=>{

      if(data == false){
        console.log('1');

        this.navCtrl.setRoot(EditstudentPage,{
          class_id:idclass,
          par_user:userpar,
          ckdate:ck_date,
          st_id:id,
          statusstudy:false,
          statusreceive:false

        });
        // console.log(statusstudy);



      }else if (data != false){
        // console.log('2');
        // console.log(data.ck_receive);


        this.navCtrl.setRoot(EditstudentPage,{
          class_id:idclass,
          par_user:userpar,
          ckdate:ck_date,
          st_id:id,
          statusstudy:data.ck_status,
          statusreceive:data.ck_receive

        });
        console.log();

      }

    })



  }




  setting(idcl,namecl,setting){
    console.log(setting);
    if(setting != ""){
      let url =  Enums.APIURL.URL + '/public/index.php/adddate2';
      let url2 = Enums.APIURL.URL +'/public/index.php/checkdate2/'+setting;

      this.http.get(url2).subscribe((err:any)=>{
        if(err['check_data'] == setting){
/////////
//////////
/////////
          this.navCtrl.setRoot(SettingPage,{
            class_id:idcl,
            class_name:namecl,
            check_data:setting
          })
        }else if(err['setting'] != setting){

          let setdata = JSON.stringify({
            check_data: setting


          });
          let datapost = JSON.parse(setdata);

                    this.http.post(url,datapost).subscribe((status:any)=>{
                      console.log(status);
                    });


                  this.navCtrl.setRoot(SettingPage,{
                    class_id:idcl,
                    class_name:namecl,
                    check_data:setting
                  });

        }
      });
    }else{

    }


  }
//   dorefres(){
//     setTimeout(()=>{
//     this.ionViewWillLoad();
//   },500)
// }

checkname(){

  this.navCtrl.setRoot(ChecknamePage);

}
checkreceive(){

  this.storage.get('keyclass2').then((data:any)=>{

  let datarecive = {
    class_id:data.class_id,
    class_name:data.class_name,
    ckdate:this.ck_date2
  }
  this.storage.set('setreceive',datarecive);
  this.navCtrl.setRoot(CheckreceivePage);
})

  // console.log(this.ck_date2);d

  // this.navCtrl.setRoot(CheckreceivePage,{

  //   class_id:idcl,
  //   class_name:namecl,
  //   ckdate:this.ck_date2
  // });

}

gohome(){
  this.navCtrl.setRoot(TeacherPage);
}
goparent(){
  this.navCtrl.setRoot(AllrarentPage);
}
goallcheckname(){
  this.navCtrl.setRoot(AllchecknamePage);
}

dorefres(){
  setTimeout(()=>{
  this.ionViewWillEnter();
},500)
}


}
