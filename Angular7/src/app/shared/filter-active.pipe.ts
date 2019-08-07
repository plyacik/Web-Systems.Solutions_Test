import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user.model';

@Pipe({
  name: 'filterActive'
})
export class FilterActivePipe implements PipeTransform {

  transform(users: User[], searchTerm: string): User[] {
    if (!users || !searchTerm) {
      return users;
    }
    return users.filter(user =>
      user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      || user.surName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  }

}
