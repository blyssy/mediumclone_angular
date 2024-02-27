import {ApplicationConfig, isDevMode} from '@angular/core'
import {provideRouter} from '@angular/router'

import {appRoutes} from './app.routes'
import {provideState, provideStore} from '@ngrx/store'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {authFeatureKey, authReducer} from './auth/store/reducers'
import {provideHttpClient, withInterceptors} from '@angular/common/http'
import {provideEffects} from '@ngrx/effects'
import * as authEffects from './auth/store/effects'
import * as feedEffects from './shared/components/feed/store/effects'
import {provideRouterStore, routerReducer} from '@ngrx/router-store'
import {authInterceptor} from './shared/services/authInterceptor'
import {
  feedFeatureKey,
  feedReducer,
} from './shared/components/feed/store/reducers'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideStore({
      router: routerReducer,
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouterStore(),
    provideEffects(authEffects, feedEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
  ],
}
