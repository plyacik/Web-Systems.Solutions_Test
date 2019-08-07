import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styles: []
})
export class UserDetailsComponent implements OnInit {

  private id: string;
  private subscription: Subscription;

  userDetails;

  constructor(private activateRoute: ActivatedRoute, private service: UserService, private toastr: ToastrService) {
    this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit() {
    this.service.userInfo(this.id).subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Такого користувача не існує.', 'Помилка.');
        else
          console.log(err);
      },
    );
  }

  

}
