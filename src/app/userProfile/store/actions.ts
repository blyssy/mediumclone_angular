import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {UserProfileInterface} from '../types/userProfile.interface'

export const userProfileActions = createActionGroup({
  source: 'User Profile',
  events: {
    'Get User Profile': props<{slug: string}>(),
    'Get User Profile Success': props<{userProfile: UserProfileInterface}>(),
    'Get User Profile Failure': emptyProps(),
  },
})
