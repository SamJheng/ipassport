import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isloading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  ); // BehaviorSubject holding current page
  count = 0;

  constructor() { }

  open() {
    this.count++;
    if (this.count === 1) {
      this.isloading.next(true);
    }
  }
  close() {
    this.count--;
    if (this.count === 0) {
      this.isloading.next(false)
    }
  }
  get isloading$() {
    return this.isloading.asObservable();
  }
}
