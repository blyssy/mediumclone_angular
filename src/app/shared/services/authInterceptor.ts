import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http'
import {PersistanceService} from './persistance.service'
import {inject} from '@angular/core'

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const persistanceService = inject(PersistanceService)
  // add the access token to the request
  const accessToken = persistanceService.get('accessToken')
  request = request.clone({
    setHeaders: {
      Authorization: accessToken ? `Token ${accessToken}` : '',
    },
  })
  return next(request)
}
