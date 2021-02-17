// import { EditstatusPage } from './../editstatus/editstatus';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController , LoadingController} from 'ionic-angular';
import * as Enums from '../enums/enums';
import { HttpClient} from '@angular/common/http';
// import { filter } from 'rxjs/operator/filter';


/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  monthNames: string[];



  nbDate: number;
  nbMonth: number;
  stMonth: string;
  nbYear: number;

  setting: any=[];
  setting2: any=[];
  setting3: any=[];
  addsetting: any=[];
  editsetting: any=[];

  i = 0;

  st_id;
  student_name;
  student_sname;
  student_nickname;
  Student_sex;
  class_id;

  ck_status="";



   ck_receive = "";
  ck_other = "";
  check;
  ck_date;
  ck_date2;

  idclass;
  selectedArray;
  editstudent: boolean;
  //myBooolean: boolean=false;
  myBooolean: boolean;

  idclass3;
  ck_date3;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient, public alertCtrl:AlertController,public loadingCtrl:LoadingController) {


    this.editstudent = false;
    this.myBooolean = true;

    this.idclass = this.navParams.get('class_id');
    this.ck_date2 = this.navParams.get('check_data');
    this.loaddata();
    this.loaddata2();
    this.loaddata3();
    console.log(this.idclass);
    console.log(this.setting);


    let date = new Date();
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.nbDate = date.getDate();
    this.nbMonth = date.getMonth() + 1;
    this.stMonth = this.monthNames[date.getMonth()];
    this.nbYear = date.getFullYear();

    console.log("this.nbDate: ", this.nbDate);
    console.log("this.nbMonth: ", this.nbMonth);
    console.log("this.stMonth: ", this.stMonth);
    console.log("this.nbYear: ", this.nbYear);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  ionViewWillEnter() {

    // this.dataclass = this.navParams.data;
    // console.log(this.dataclass);



  }

  actualizaFutbol(){
    this.showAlert();
  }

  showAlert(){
    let alert = this.alertCtrl.create({
      title: 'dfsd',
      subTitle: 'sdfsdfsdf'+ this.myBooolean,
      buttons: ['ok']
    })
    alert.present();
  }



  loaddata(){
    let url = Enums.APIURL.URL +'/public/index.php/parentandstudent/'+this.idclass;
    this.http.get(url).subscribe(data=>{
      this.setting = data;
      console.log(this.setting);



    })
  }
  loaddata2(){
    let url = Enums.APIURL.URL +'/public/index.php/checks';
    this.http.get(url).subscribe(data=>{
      this.setting2 = data;
      console.log(this.setting2);
      // console.log(this.setting[0].class_id);
      // this.st_id = this.setting[0].st_id;
      // this.student_name = this.setting[0].student_name;
      // this.student_sname = this.setting[0].student_sname;
      // this.student_nickname = this.setting[0].student_nickname;
      // this.Student_sex = this.setting[0].Student_sex;
      // this.class_id = this.setting[0].class_id;



    })
  }
  loaddata3(){
    let url2 = Enums.APIURL.URL +'/public/index.php/checkdate2/'+this.ck_date2;
    this.http.get(url2).subscribe(data=>{
      this.setting3 = data;
      console.log(this.setting3);
      // console.log(this.setting[0].class_id);
      // this.st_id = this.setting[0].st_id;
      // this.student_name = this.setting[0].student_name;
      // this.student_sname = this.setting[0].student_sname;
      // this.student_nickname = this.setting[0].student_nickname;
      // this.Student_sex = this.setting[0].Student_sex;
      // this.class_id = this.setting[0].class_id;



    })
  }
  //      checkbox(item,ck_date2,status){
  //         if(item != null){

  //           let url = Enums.APIURL.URL +'/public/index.php/checks';
  //           this.http.get(url).subscribe((data:any)=>{
  //             if(data['st_id'] != item.st_id && data['ck_date'] != ck_date2 && status == true){
  //               this.selectedArray.push(item);



  //             }

  //         })
  //      }



  // //   if(item != null){
  // //     if(item.checked == true){
  // //       this.selectedArray.push(item);

  // //         let url = Enums.APIURL.URL +'/public/index.php/settingstudent2/'+this.setting[0].st_id+'&&'+this.setting[0].student_name
  // //        +'&&'+this.setting[0].student_sname+'&&'+this.setting[0].student_nickname+'&&'+this.setting[0].Student_sex+'&&'+this.setting[0].class_id
  // //        +'&&'+this.setting[0].par_user+'&&'+this.setting[0].ck_date+'&&'+this.myBooolean;
  // //        this.http.get(url).subscribe((data:any)=>{
  // //          this.check = data;
  // //        }
  // //        );
  // //     }else{
  // //       let newarry = this.selectedArray.filter(function (el){
  // //         return el.ck_status != item.ck_status;
  // //       });
  // //       this.selectedArray = newarry;
  // //       let url = Enums.APIURL.URL +'/public/index.php/settingstudent2/'+this.setting[0].st_id+'&&'+this.setting[0].student_name
  // //        +'&&'+this.setting[0].student_sname+'&&'+this.setting[0].student_nickname+'&&'+this.setting[0].Student_sex+'&&'+this.setting[0].class_id
  // //        +'&&'+this.setting[0].par_user+'&&'+this.setting[0].ck_date+'&&'+this.myBooolean;
  // //        this.http.get(url).subscribe((data:any)=>{
  // //       this.check = data;

  // //     }
  // //     );
  // //   }
  // //   console.log(this.selectedArray);
  // // }else if(item == null){

  // // }
  // //  }
  //     }

  //     editstatus(data){
  //       console.log(data);
  //       console.log(data.st_id);
  //       console.log(this.ck_date2);
  //       console.log(this.setting3.check_id);
  //        if(data != ""){
  //          let url =  Enums.APIURL.URL +'/public/index.php/addsettingstudent2';
  //          let url1 = Enums.APIURL.URL +'/public/index.php/allcheckstudentname2';
  //          let url5 = Enums.APIURL.URL +'/public/index.php/checkaddsettingstudent2/'+data.st_id+'&&'+this.setting3.check_id;
  //         this.http.get(url5).subscribe((err:any)=>{
  //           console.log(err);
  //           if(err['st_id'] == data.st_id && err['ck_date'] == this.setting3.check_id){ //err['st_id'] == data.st_id && err['ck_date'] == this.ck_date2
  //   /////////
  //   //////////
  //   /////////
  //             this.navCtrl.push(EditstatusPage,{
  //               idclass3:data.class_id,
  //               ck_date3:this.ck_date2

  //             })
  //           }else if(err['st_id'] == data.st_id && err['ck_date'] != this.setting3.check_id){
  //             let setdata = JSON.stringify({
  //                        st_id: data.st_id,
  //                        student_name: data.student_name,
  //                        student_sname: data.student_sname,
  //                        student_nickname: data.student_nickname,
  //                        Student_sex: data.Student_sex,
  //                        class_id: this.idclass,
  //                        par_user: data.par_user,
  //                        ck_date: this.setting3.check_id,
  //                        ck_status: this.ck_status,
  //                        ck_receive: this.ck_receive,
  //                        ck_other: this.ck_other


  //             });
  //             let datapost = JSON.parse(setdata);
  //                       this.http.post(url,datapost).subscribe((status:any)=>{
  //                         console.log(status);
  //                       });
  //                     this.navCtrl.setRoot(EditstatusPage,{
  //                       idclass3:data.class_id,
  //                       ck_date3:this.ck_date2
  //                     });

  //           }
  //         });
  //       }else{

  //       }


  //     }

  onMyBooleanChange(i,s){

    console.log(s);
    console.log(i);
    // console.log(this.ck_date2);

    // console.log(s);


      // let url = Enums.APIURL.URL +'/public/index.php/settingstudent2/'+s.st_id+'&&'+s.student_name
      //       +'&&'+s.student_sname+'&&'+s.student_nickname+'&&'+s.Student_sex+'&&'+s.class_id
      //       +'&&'+s.par_user+'&&'+s.ck_date+'&&'+this.myBooolean;
      //      this.http.get(url).subscribe((data:any)=>{
      //       this.check = data;
      //       console.log(this.check);
      //      })
      // let url = "http://localhost/public/index.php/addsettingstudent2";
      // let setdata = JSON.stringify({
      //   st_id: this.setting.st_id,
      //   student_name: this.setting.student_name,
      //   student_sname: this.setting.student_sname,
      //   student_nickname: this.setting.student_nickname,
      //   Student_sex: this.setting.Student_sex,
      //   class_id: this.idclass,
      //   par_user: this.setting.par_user,
      //   ck_date: this.ck_date,
      //   ck_status: this.ck_status,
      //   ck_receive: this.ck_receive,
      //   ck_other: this.ck_other


  }

//   let datapost = JSON.parse(setdata);
//   this.http.post(url,datapost).subscribe((status:any)=>{
//     console.log(status);
//   })

// }

test(item){
  console.log(item.editstudent);

}


addck(idcl,setting){
  console.log(setting);
  if(setting != ""){


    let url = Enums.APIURL.URL +'/public/index.php/addsettingstudent2';
    let url2 = Enums.APIURL.URL +'/public/index.php/checkstudentname2/'+this.ck_date2;

    this.http.get(url2).subscribe((err:any)=>{
      if(err['ck_date'] == this.ck_date2){

/////////
//////////
/////////
        this.navCtrl.push(SettingPage,{
          class_id:idcl,

          check_data:setting
        })
      }else if(err['ck_date'] != this.ck_date2){
        let setdata = JSON.stringify({
          st_id: this.setting.st_id,
          student_name: this.setting.student_name,
          student_sname: this.setting.student_sname,
          student_nickname: this.setting.student_nickname,
          Student_sex: this.setting.Student_sex,
          class_id: this.idclass,
          par_user: this.setting.par_user,
          ck_date: this.ck_date2,
          ck_status: this.ck_status,
          ck_receive: this.setting.ck_receive,
          ck_other: this.ck_other

        });
        let datapost = JSON.parse(setdata);

                  this.http.post(url,datapost).subscribe((status:any)=>{
                    console.log(status);
                  });


                this.navCtrl.setRoot(SettingPage,{
                  class_id:idcl,

                  check_data:setting
                });

      }
    });
  }else{

  }
}


}
