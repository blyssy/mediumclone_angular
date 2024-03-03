import {createFeature, createReducer, on} from '@ngrx/store'
import {routerNavigatedAction} from '@ngrx/router-store'
import {authActions} from 'src/app/auth/store/actions'
import {SettingsStateInterface} from '../types/settingsState.interface'

//just changing state here.  nothing else
const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
}

const settingsFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,
    on(authActions.updateCurrentUser, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.updateCurrentUserSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(authActions.updateCurrentUserFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
})

export const {
  name: settingsFeatureKey,
  reducer: settingsReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = settingsFeature
