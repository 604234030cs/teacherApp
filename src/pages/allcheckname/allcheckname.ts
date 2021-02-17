import { text } from '@angular/core/src/render3/instructions';
import { TeacherPage } from './../teacher/teacher';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { AllrarentPage } from '../allrarent/allrarent';
import * as Enums from '../enums/enums';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AllchecknamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allcheckname',
  templateUrl: 'allcheckname.html',
})
export class AllchecknamePage {

  alllistcheckdate:any=['check_id','check_data'];
  alllistclass:any=[];
  listchecknameformdate:any=[];
  updatecheckname:any=[];
  deletechecknamefromdata:any=[];

  ck_date;
  class_id;
  receive;
  status;
  i = 0;
  c_length = 0;
  c_success = 0;
  arry:any=[];
  // title;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,
    public alertCtrl:AlertController,public loadingCtrl: LoadingController,private storage: Storage) {

      // this.dorefres()
      this.loaddata();
      this.loaddataclass();

  }


  ionViewWillEnter() {
    console.log('ionViewDidLoad AllchecknamePage');



  }

  loaddata(){
    this.storage.get('accoutuser').then((data:any)=>{


    let url = Enums.APIURL.URL +'/public/index.php/allcheckdate/'+data.teacher_id;
    this.http.get(url).subscribe((data:any)=>{
      this.alllistcheckdate = data;
      console.log(this.alllistcheckdate);
    });
  });
  }

  loaddataclass(){
    this.storage.get('accoutuser').then((data:any)=>{

    let url2 = Enums.APIURL.URL +'/public/index.php/allclass/'+data.teacher_id;
    this.http.get(url2).subscribe((data:any)=>{
      this.alllistclass = data;
      console.log(this.alllistclass);
    });
  });
  }


  setkey(ck_date,class_id){


    let key = {
      ck_date:ck_date,
      class_id:class_id
    }
    this.listcheckname(key);
    // this.storage.set('keylistcheckname',key);
    // this.storage.get('keylistcheckname').then((keydata:any)=>{
    //   this.arry = null
    //   this.listcheckname(keydata);
    // })

  }


  listcheckname(data){
    console.log(data);


    // this.storage.get('keylistcheckname').then((data:any)=>{ storage keylistcheckname


    let url2 = Enums.APIURL.URL +'/public/index.php/checknamefromdate/'+data.ck_date+'&&'+data.class_id;
    this.http.get(url2).subscribe((data2:any)=>{
      // this.listchecknameformdate = data2;
      console.log(data2);
      this.arry=[];
      this.checklistname(data2)



    });


  // })storage keylistcheckname



  }

  checklistname(data3){
    console.log(data3);
    console.log(data3.length);

    for(let i = 0;i<data3.length;i++){

    if(data3[i].ck_receive == '1'){
      this.receive = "ยังไม่ถูกรับ"
      if(data3[i].ck_status == '1'){
        this.status = "มาเรียน"
      }else if(data3[i].ck_status == '2'){
        this.status = "ลาป่วย"
      }else if(data3[i].ck_status == '3'){
        this.status = "ลากิจ"
      }else if(data3[i].ck_status == '4'){
        this.status = "ไม่มาเรียน"
      }
    }else if(data3[i].ck_receive == '2'){
      this.receive = "รับกลับแล้ว"
      if(data3[i].ck_status == '1'){
        this.status = "มาเรียน"
      }else if(data3[i].ck_status == '2'){
        this.status = "ลาป่วย"
      }else if(data3[i].ck_status == '3'){
        this.status = "ลากิจ"
      }else if(data3[i].ck_status == '4'){
        this.status = "ไม่มาเรียน"
      }
    }
    let receive = data3[i]['ck_other'];
    console.log();

    this.arry.push({
      ck_id:data3[i]['ck_id'],
      st_id:data3[i]['st_id'],
      student_name:data3[i]['student_name'],
      student_sname:data3[i]['student_sname'],
      student_nickname:data3[i]['student_nickname'],
      Student_sex:data3[i]['student_sex'],
      class_id:data3[i]['class_id'],
      par_user:data3[i]['par_user'],
      ck_date:data3[i]['ck_date'],
      ck_status:data3[i]=this.status,
      ck_receive:data3[i]=this.receive,
      ck_other:receive
     });


  }
       // console.log(this.arry);
       let temp;
       let j:number;
       let k:number;
       // console.log(this.arry.length);
         for( k=0; k < this.arry.length-1; k++){
           // console.log(k);

             for( j = 0 ; j < this.arry.length-1; j++){
               // console.log(j);
               let index = j + 1;
               // console.log(this.arry[index]['valuedirec']);
            //     if(this.arry[j]['valuedirec'] > this.arry[j+1]['valuedirec']){
            //      temp =this.arry[j];
            //      this.arry[j]=this.arry[j+1];
            //   this.arry[j+1]=temp;
            //  }

             // console.log(this.arry[j]['directionscaculat']);

        }
     }
     console.log('หลังเรียง');
     console.log(this.arry);


    //  this.return();

  }
  // return(){
  //   this.checklistname();
  // }

  pop(){
    this.navCtrl.setRoot(TeacherPage);
  }

  settingreceive(ckid,ckstatus,ckreceive,ckother){

    console.log(ckid);
    console.log(ckstatus);
    console.log(ckreceive);
    console.log(ckother);

    let url8 = Enums.APIURL.URL +'/public/index.php/checkaddsettingstudent2/'+ckid+'&&'+this.ck_date;
    this.http.get(url8).subscribe((data:any)=>{
      console.log(data);
      if(data['ck_id']==ckid && data['ck_date']==this.ck_date){
        console.log("2");
        // console.log(data.student_name);
        // console.log(data.student_sname);



        let url9 = Enums.APIURL.URL +'/public/index.php/settingstudent2/'+ckid+'&&'+data.st_id+'&&'+data.ck_date+'&&'+ckstatus+'&&'+ckreceive+'&&'+ckother;
                   this.http.get(url9).subscribe((data2:any)=>{
                    console.log(url9);
        this.updatecheckname = data2;
        if(this.updatecheckname != null){
          const alert = this.alertCtrl.create({
            title: 'เสร็จสิน',
            subTitle: 'อัพเดคสถานะการรับสำเร็จ',
            buttons: [{
              text: 'ตกลง',
              handler: ()=>{
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
      else{

      }
    })




  }

  deletecleckname(ckid){

    let url8 = Enums.APIURL.URL +'/public/index.php/checkaddsettingstudent2/'+ckid+'&&'+this.ck_date;
    this.http.get(url8).subscribe((data:any)=>{
      console.log(data);
      if(data['ck_id']==ckid && data['ck_date']==this.ck_date){
        console.log("2");
        // console.log(data.student_name);
        // console.log(data.student_sname);
        const confirm = this.alertCtrl.create({
          title: 'ต้องการลบข้อมูลหรือไม่?',
          buttons:[{
            text: 'ตกลง',
            handler: ()=>{
              let url9 = Enums.APIURL.URL +'/public/index.php/deletecheckname/'+ckid;
              this.http.get(url9).subscribe((data2:any)=>{
              this.updatecheckname = data2;
              if(this.updatecheckname != null){
                const alert = this.alertCtrl.create({
                  title: 'เสร็จสิน',
                  subTitle: 'ลบข้อมูลรายการเช็คชื่อสำเร็จ',
                  buttons: [{
                    text: 'ตกลง',
                    handler: ()=>{
                      const loader = this.loadingCtrl.create({
                        content: "Pleas wait...",
                        duration: 200,

                      });
                      loader.present();

                    }
                  }]
                });
                alert.present();
                this.listcheckname(data);
                // this.dorefres
              }


              })
            }
          },
          {
            text: 'ยกเลิก',
            handler:()=>{}

          }]

        })
        confirm.present();

      }
      else{

      }
    })



    // const confirm = this.alertCtrl.create({
    //   title: 'ต้องการลบข้อมูลหรือไม่?',
    //   buttons:[{
    //     text: 'ตกลง',
    //     handler: () =>{
    //       let url = Enums.APIURL.URL +'/public/index.php/deletecheckname/'+ckid;
    //       this.http.get(url).subscribe(data=>{
    //         this.deletechecknamefromdata = data;
    //         console.log(this.deletechecknamefromdata);
    //       })

    //       this.navCtrl.setRoot(AllchecknamePage);

    //     }

    //   },
    //   {
    //     text: 'ยกเลิก',
    //     handler: () => {}
    //   }

    //   ]

    // });
    // confirm.present();


  }

//   dorefres(){
//     setTimeout(()=>{
//     this.listcheckname();
//   },500)
// }


gohome(){
  this.navCtrl.setRoot(TeacherPage);
}
goparent(){
  this.navCtrl.setRoot(AllrarentPage);
}
// goallcheckname(){
//   this.navCtrl.push(AllchecknamePage);
// }


}
