import {createFeature, createReducer, on} from '@ngrx/store'
import {routerNavigatedAction} from '@ngrx/router-store'
import {UserProfileStateInterface} from '../types/userProfileState.interface'
import {userProfileActions} from './actions'

const initialState: UserProfileStateInterface = {
  isLoading: false,
  error: null,
  data: null,
}

export const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(userProfileActions.getUserProfile, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(userProfileActions.getUserProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })),
    on(userProfileActions.getUserProfileFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
})

export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectIsLoading,
  selectError,
  selectData: selectUserProfileData,
} = userProfileFeature
