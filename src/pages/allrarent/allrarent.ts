import { AllchecknamePage } from './../allcheckname/allcheckname';
import { EditparentPage } from './../editparent/editparent';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import * as Enums from '../enums/enums';
import { HttpClient } from '@angular/common/http';
import { TeacherPage } from '../teacher/teacher';
import { LoaddataProvider } from '../../providers/loaddata/loaddata';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AllrarentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allrarent',
  templateUrl: 'allrarent.html',
})
export class AllrarentPage {

  parent:any=[];
  datadeleteparent:any=[];
  par_id;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,
    public alertCtrl:AlertController,public loadingCtrl: LoadingController,public parents:LoaddataProvider
    ,private storage: Storage) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad AllrarentPage');
    this.storage.get('accoutuser').then((data:any)=>{
    console.log(data.teacher_id);
    
    let url = Enums.APIURL.URL +'/public/index.php/allparent/'+data.teacher_id;
    this.http.get(url).subscribe((data:any)=>{
      this.parent = data;
      console.log(data);

    })
  })

  }
  ionViewWillLoad(){
    this.ionViewDidLoad();
  }

  editparent(par_id){
    this.navCtrl.setRoot(EditparentPage,{
      par_id:par_id
    })

  }
  pop(){
    this.navCtrl.setRoot(TeacherPage);
  }


  deleteparent(par_id){
    const confirm = this.alertCtrl.create({
      title: 'ต้องการลบข้อมูลหรือไม่?',
      buttons:[{
        text: 'ตกลง',
        handler: () =>{
          let url1 = Enums.APIURL.URL +'/public/index.php/deletepar/'+par_id;
          this.http.get(url1).subscribe(data=>{
            this.datadeleteparent = data;
            console.log(this.datadeleteparent);
          })

          this.dorefres();
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

  getItems(ev: any){
    let val = ev.target.value;

    if (val !=0) {
      let url  = Enums.APIURL.URL +'/public/index.php/search/'+val;
      this.http.get(url).subscribe((data:any)=>{
        this.parent = data;
      })
      // this.parents.searchrooms(val).subscribe(data=>{
      //   this.parent = data;
      // });
    }else {
     this.ionViewWillLoad();
  }
  }

  dorefres(){
    setTimeout(()=>{
    this.ionViewWillLoad();
  },500)
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


}
