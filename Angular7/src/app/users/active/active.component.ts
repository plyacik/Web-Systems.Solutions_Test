import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styles: []
})
export class ActiveComponent implements OnInit {

  searchTerm: string;

  constructor(private service: UserService, private router: Router) { }

  nameSortFlag: number = 1;
  surNameSortFlag: number = 1;

  ngOnInit() {
    this.service.activeUserList();
  }

  sortList(field: string, sortFlag: number) {
    this.service.sortActiveUserList(field, sortFlag);
    switch (field) {
      case 'name':
        this.nameSortFlag = this.nameSortFlag * -1;
        break;
      case 'surName':
        this.surNameSortFlag = this.surNameSortFlag * -1;
        break;

      default:
        break;
    }
  }

  userDetails(id: string) {
    this.router.navigateByUrl('/users/' + id);
  }

}
