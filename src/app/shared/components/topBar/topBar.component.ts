import {CommonModule} from '@angular/common'
import {Component, inject} from '@angular/core'
import {Store} from '@ngrx/store'
import {combineLatest} from 'rxjs'
import {selectCurrentUser} from '../../../auth/store/reducers'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'mc-topbar',
  templateUrl: './topBar.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class TopBarComponent {
  store = inject(Store)

  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  })
}
