import {createFeature, createReducer, on} from '@ngrx/store'
import {popularTagsActions} from './actions'
import {routerNavigatedAction} from '@ngrx/router-store'
import {PopularTagStateInterface} from '../types/popularTagsState.interface'

const initialState: PopularTagStateInterface = {
  isLoading: false,
  error: null,
  data: null,
}

export const popularTagsFeature = createFeature({
  name: 'popularTags',
  reducer: createReducer(
    initialState,
    on(popularTagsActions.getPopularTags, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(popularTagsActions.getPopularTagsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.popularTags,
    })),
    on(popularTagsActions.getPopularTagsFailure, (state) => ({
      ...state,
      isLoading: false,
    }))
  ),
})

export const {
  name: popularTagsFeatureKey,
  reducer: popularTagsReducer,
  selectIsLoading,
  selectError,
  selectData: selectPopularTagsData,
} = popularTagsFeature
