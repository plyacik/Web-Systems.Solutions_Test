import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {

  searchTerm: string;

  constructor(private service: UserService, private toastr: ToastrService, private router: Router) { }

  nameSortFlag: number = 1;
  ageSortFlag: number = 1;
  surNameSortFlag: number = 1;
  isActiveSortFlag: number = 1;

  ngOnInit() {
    this.service.refreshList();
  }

  onCheckActive(id: string) {
    this.service.changeActive(id).subscribe(
      (res: any) => {
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Такого користувача не існує', 'Помилка.');
        else
          console.log(err);
      }
    );
  }

  sortList(field: string, sortFlag: number) {
    this.service.sortUserList(field, sortFlag);
    switch (field) {
      case 'name':        
        this.nameSortFlag = this.nameSortFlag * -1;
        break;
      case 'age':
        this.ageSortFlag = this.ageSortFlag * -1;
        break;
      case 'surName':
        this.surNameSortFlag = this.surNameSortFlag * -1;
        break;
      case 'isActive':
        this.isActiveSortFlag = this.isActiveSortFlag * -1;
        break;

      default:
        break;
    }
  }

  userDetails(id: string) {
    this.router.navigateByUrl('/users/' + id);
  }

}
