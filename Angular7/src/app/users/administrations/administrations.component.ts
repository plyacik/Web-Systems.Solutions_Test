import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-administrations',
  templateUrl: './administrations.component.html',
  styleUrls: []
})
export class AdministrationsComponent implements OnInit {

  constructor(private service: UserService) { }

  colorList = Array<string>();

  selectColor: string;

  ngOnInit(): void {

    this.colorList = Array<string>();
    this.colorList.push('Black');
    this.colorList.push('Green');
    this.colorList.push('Red');
    this.colorList.push('Pink');
    this.colorList.push('Orange');
    this.colorList.push('Blue');
    this.colorList.push('Yellow');

  }

}
