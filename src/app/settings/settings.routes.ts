import {provideState} from '@ngrx/store'
import {SettingsComponent} from './components/settings.component'
import {Route} from '@angular/router'
import {settingsFeatureKey, settingsReducer} from './store/reducers'

export const routes: Route[] = [
  {
    path: '',
    component: SettingsComponent,
    providers: [provideState(settingsFeatureKey, settingsReducer)],
  },
]
