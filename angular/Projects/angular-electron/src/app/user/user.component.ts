import { Component, input, Input, Output, EventEmitter } from '@angular/core';
import { type User } from './user.model';

import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input({required: true}) user!:User
  @Input({required: true}) selected!:boolean
  @Output() select = new EventEmitter<string>()

  // avatar = input.required<string>();  using signals to ensure that only the ui associated with this data is rerendered
  // name = input.required<string>();

  //get imagePath() {
  //return 'assets/users/' + this.avatar();}

  get imagePath(){
    return 'assets/users/' + this.user.avatar;
  }

  onSelectUser(id: string){
    this.select.emit(this.user.id);
  }
}
