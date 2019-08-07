import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/users/list');
  }

  onSubmit(form: NgForm) {
    this.service.login().subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/users/list');
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Невірний email чи пароль.', 'Помилка автентифікації.');
        else
          console.log(err);
      }
    );
  }

}
