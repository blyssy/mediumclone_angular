import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {GetFeedResponseInterface} from '../types/getFeedResponse.interface'

export const feedActions = createActionGroup({
  source: 'feed',
  events: {
    GetFeed: props<{url: string}>(),
    'GetFeed Success': props<{feed: GetFeedResponseInterface}>(),
    'GetFeed Failure': emptyProps(),
  },
})
