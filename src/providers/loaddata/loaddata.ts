import { HttpClient } from '@angular/common/http';
// import * as Enums from '../enums/enums';
import { Injectable } from '@angular/core';


/*
  Generated class for the LoaddataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoaddataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LoaddataProvider Provider');
  }


  searchrooms(query){
    let url  = 'http://localhost/todoslim3/public/index.php/search/'+query;
    return this.http.get(url);
  }

  searchclassroom(query){
    let url  = 'http://localhost/todoslim3/public/index.php/searchclassroom/'+query;
    return this.http.get(url);
  }

}
