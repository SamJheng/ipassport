import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [UserService],
})
export class ListComponent {
  userService = inject(UserService);
  constructor() {
    this.userService.getAllUser().subscribe(res=>{
      console.log(res)
    })
  }
}
