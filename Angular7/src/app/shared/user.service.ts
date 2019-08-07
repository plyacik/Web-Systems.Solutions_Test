import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms"
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient,
    private router: Router) { }

  readonly BaseURI = 'http://localhost:52784/api';

  formModel = this.fb.group({
    Email: ['', [Validators.email, Validators.required]],
    Password: ['', [Validators.required, Validators.minLength(6)]]
  });

  userList: User[];
  activeUsers: User[];

  textColor: string;

  hideName: boolean;
  hideSurName: boolean;
  hideAge: boolean;
  hideActive: boolean;

  register() {
    var body = {
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Password,
      Name: "no name",
      SurName: "no surname",
      Age: 0,
      isActive: false
    }
    return this.http.post(this.BaseURI + '/Account/Registration', body);
  }

  login() {
    var body = {
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Password
    }
    return this.http.post(this.BaseURI + '/Account/Login', body);
  }

  refreshList() {
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    this.http.get(this.BaseURI + '/Account/Users', { headers: tokenHeader })
      .toPromise().then(res => this.userList = res as User[]);
  }

  changeActive(id: string) {
    var body = {
      UserId: id
    }
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return this.http.post(this.BaseURI + '/Account/ChangeActive', body, { headers: tokenHeader });
  }

  sortUserList(field: string, sortFlag: number) {
    switch (field) {
      case 'name':
        this.userList.sort(function (a, b) {
          if (a.name < b.name)
            return -1 * sortFlag;
          if (a.name > b.name)
            return 1 * sortFlag;
          return 0;
        });
        break;

      case 'age':
        this.userList.sort(function (a, b) {
          if (a.age < b.age)
            return -1 * sortFlag;
          if (a.age > b.age)
            return 1 * sortFlag;
          return 0;
        });
        break;

      case 'surName':
        this.userList.sort(function (a, b) {
          if (a.surName < b.surName)
            return -1 * sortFlag;
          if (a.surName > b.surName)
            return 1 * sortFlag;
          return 0;
        });
        break;

      case 'isActive':
        this.userList.sort(function (a, b) {
          if (a.isActive < b.isActive)
            return 1 * sortFlag;
          if (a.isActive > b.isActive)
            return -1 * sortFlag;
          return 0;
        });
        break;

      default:
        break;
    }
  }

  userInfo(id: string) {
    var body = {
      UserId: id
    }
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return this.http.post(this.BaseURI + '/Account/UserInfo', body, { headers: tokenHeader });
  }

  activeUserList() {
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    this.http.get(this.BaseURI + '/Account/ActiveUsers', { headers: tokenHeader })
      .toPromise().then(res => this.activeUsers = res as User[]);
  }

  sortActiveUserList(field: string, sortFlag: number) {
    switch (field) {
      case 'name':
        this.activeUsers.sort(function (a, b) {
          if (a.name < b.name)
            return -1 * sortFlag;
          if (a.name > b.name)
            return 1 * sortFlag;
          return 0;
        });
        break;

      case 'surName':
        this.activeUsers.sort(function (a, b) {
          if (a.surName < b.surName)
            return -1 * sortFlag;
          if (a.surName > b.surName)
            return 1 * sortFlag;
          return 0;
        });
        break;

      default:
        break;
    }
  }

}
