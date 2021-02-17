import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import * as Enums from '../enums/enums';
import { HttpClient } from '@angular/common/http';
import { AllrarentPage } from '../allrarent/allrarent';

/**
 * Generated class for the EditparentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editparent',
  templateUrl: 'editparent.html',
})
export class EditparentPage {

  par_id;

  parent:any=['par_id','par_user','par_id','par_password','par_name','par_sname','par_tel','latitude','longitude'];
  editparent: boolean=false;
  title2:  any=['นางสาว','นาง','นาย'];


  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,
    public alertCtrl:AlertController,public loadingCtrl: LoadingController) {

    this.par_id = this.navParams.get('par_id');
    console.log(this.par_id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditparentPage');

    let url = Enums.APIURL.URL +'/public/index.php/checkparentparid/'+this.par_id;
    this.http.get(url).subscribe((data:any)=>{

      this.parent = data;
      // if(this.parent[0].par_title == '1'){
      //   this.title2 = "นาย"
      // }else if(this.parent[0].par_title == '2'){
      //   this.title2 = "นาง"
      // }else if(this.parent[0].par_title == '3'){
      //   this.title2 = "นางสาว"
      // }
      // console.log(data);

    })
  }
  ionViewDidLeave(){

    this.editparent=false
    // this.editstatus=false
    this.dorefres();

  }
  ionViewWillLoad(){
    this.ionViewDidLoad();
  }

  editAccountparent(){
    let url =  Enums.APIURL.URL +'/public/index.php/editparent2/'+this.parent[0].par_id+'&&'+this.parent[0].par_user+'&&'+this.parent[0].par_title+'&&'+this.parent[0].par_name
    +'&&'+this.parent[0].par_sname+'&&'+this.parent[0].par_tel+'&&'+this.parent[0].par_address;

    this.http.get(url).subscribe(data=>{
    this.parent[0] = data;


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

pop(){
  this.navCtrl.setRoot(AllrarentPage);
}



  dorefres(){
    setTimeout(()=>{
    this.ionViewWillLoad();
  },500)
}


}
