import {CommonModule} from '@angular/common'
import {Component, OnInit, computed} from '@angular/core'
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router'
import {Store, select} from '@ngrx/store'
import {userProfileActions} from '../store/actions'
import {combineLatest, filter, map} from 'rxjs'
import {
  selectError,
  selectIsLoading,
  selectUserProfileData,
} from '../store/reducers'
import {selectCurrentUser} from 'src/app/auth/store/reducers'
import {CurrentUserInterface} from '@shared/types/currentUser.interface'
import {UserProfileInterface} from '../types/userProfile.interface'
import {FeedComponent} from '@shared/components/feed/feed.component'

@Component({
  selector: 'mc-user-profile',
  templateUrl: './userProfile.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FeedComponent],
})
export class UserProfileComponent implements OnInit {
  slug: string = ''

  isCurrentUserProfile$ = combineLatest({
    currentUser: this.store.pipe(
      select(selectCurrentUser),
      filter((currentUser): currentUser is CurrentUserInterface =>
        Boolean(currentUser)
      )
      //   filter((currentUser): currentUser is CurrentUserInterface | null =>
      //     currentUser !== null
      //   )
    ),
    userProfile: this.store.pipe(
      select(selectUserProfileData),
      filter((userProfile): userProfile is UserProfileInterface =>
        Boolean(userProfile)
      )
    ),
  }).pipe(
    map(({currentUser, userProfile}) => {
      return currentUser.username === userProfile.username
    })
  )

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectUserProfileData),
    isCurrentUserProfile: this.isCurrentUserProfile$,
  })
  //using signals to avoid using async pipe in html.
  //everything in ../store stays the same
  //   isLoading = this.store.selectSignal(selectIsLoading)
  //   foo = computed(() => (this.isLoading() ? 'loading' : 'not loading'))

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.slug = params['slug']
      this.fetchUserProfile()
    })
  }

  fetchUserProfile(): void {
    //if (this.slug) {
    this.store.dispatch(userProfileActions.getUserProfile({slug: this.slug}))
    //}
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites')
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`
  }
}
