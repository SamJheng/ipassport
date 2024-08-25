import { inject, Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isloading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  ); // BehaviorSubject holding current page
  count = 0;
  private toast = inject(HotToastService);

  constructor() {}
  toastObserve(){
    const obs = this.toast.observe<any>({
      loading: 'Loading...',
      success: 'Success!',
      error: 'Fail!',
    });
    return obs;
  };
  open() {
    this.count++;
    if (this.count === 1) {
      this.isloading.next(true);
    }
  }
  close() {
    this.count--;
    if (this.count === 0) {
      this.isloading.next(false);
    }
  }
  get isloading$() {
    return this.isloading.asObservable();
  }
}
