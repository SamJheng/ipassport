import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() {
  }

  saveDataValue(key:string,value:string){
    sessionStorage.setItem(key, value);
  }
  loadingDataValue(key: string){
    const data = sessionStorage.getItem(key);
    return data;
  }
  removeDataByKey(key: string){
    sessionStorage.removeItem(key);
  }
}
