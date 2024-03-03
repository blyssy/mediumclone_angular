import {CommonModule} from '@angular/common'
import {Component, OnDestroy, OnInit, inject} from '@angular/core'
import {FormBuilder, ReactiveFormsModule} from '@angular/forms'
import {Store, select} from '@ngrx/store'
import {CurrentUserInterface} from '@shared/types/currentUser.interface'
import {Subscription, combineLatest, filter} from 'rxjs'
import {selectCurrentUser} from 'src/app/auth/store/reducers'
import {selectIsSubmitting, selectValidationErrors} from '../store/reducers'
import {BackendErrorMessagesComponent} from '@shared/components/backendErrorMessages/backendErrorMessages.component'
import {authActions} from 'src/app/auth/store/actions'
import {CurrentUserRequestInterface} from '@shared/types/currentUserRequest.interface'
//import { settingsActions } from 'src/app/auth/store/actions'

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackendErrorMessagesComponent],
})
export class SettingsComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder)
  store = inject(Store)
  currentUser?: CurrentUserInterface
  currentUserSubscription?: Subscription

  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  })

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor() {}

  ngOnInit(): void {
    this.currentUserSubscription = this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser) => {
        this.currentUser = currentUser
        this.initializeForm()
      })
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe()
  }

  initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('currentUser is not defined')
    }

    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    })
  }

  submit(): void {
    if (!this.currentUser) {
      throw new Error('currentUser is not defined')
    }

    const currentUserRequest: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    }

    this.store.dispatch(authActions.updateCurrentUser({currentUserRequest}))
  }

  logout(): void {
    this.store.dispatch(authActions.logout())
  }
}
