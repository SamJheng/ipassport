import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ZorroModule } from '../../ng-zorro-antd.module';
import { User } from '../../models/user';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [ZorroModule, CommonModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
})
export class PersonComponent implements OnInit, AfterViewInit {
  @Input() person!: User;
  ngOnInit(): void {
    // console.log(this.person);
  }
  ngAfterViewInit(): void {}
}
