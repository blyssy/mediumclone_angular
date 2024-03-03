import {CommonModule} from '@angular/common'
import {Component} from '@angular/core'

@Component({
  selector: 'mc-user-profile',
  templateUrl: './userProfile.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class UserProfileComponent {
  constructor() {}
}
