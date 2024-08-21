import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { ZorroModule } from 'src/app/shared/ng-zorro-antd.module';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ZorroModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  userService = inject(UserService);
  userList$: Observable<User[]>;
  constructor() {
    this.userService.getAllUser().subscribe((res) => {
      console.log(res);
    });
    this.userList$ = this.userService
      .getAllUser()
      .pipe(map((res) => res.result||[]));
  }
}
