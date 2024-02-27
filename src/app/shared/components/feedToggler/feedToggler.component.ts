import {Component, Input, inject} from '@angular/core'
import {Store} from '@ngrx/store'
import {selectCurrentUser} from '../../../auth/store/reducers'
import {CommonModule} from '@angular/common'
import {Router, RouterLink, RouterLinkActive} from '@angular/router'

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feedToggler.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class FeedTogglerComponent {
  store = inject(Store)

  @Input() tagName?: string

  currentUser$ = this.store.select(selectCurrentUser)
}
