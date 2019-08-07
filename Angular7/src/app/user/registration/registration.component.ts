import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.service.formModel.reset();
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/users/list');
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if(res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('Новий користувач створено.', 'Реєстрація успішна.');
        } else {
          res.errors.forEach(element =>{
            switch (element.code) {
              case 'DuplicateUserName':
                  this.toastr.error('Користувач з таким email вже існує.', 'Реєстрація не пройшла.');
                break;
            
              default:
                  this.toastr.error(element.description, 'Реєстрація не пройшла.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
