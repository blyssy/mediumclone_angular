import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable, inject} from '@angular/core'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {Observable, map} from 'rxjs'
import {CurrentUserInterface} from '../../shared/types/currentUser.interface'
import {AuthResponseInterface} from '../types/authResponse.interface'
import {environment} from '../../../environments/environment'
import {LoginRequestInterface} from '../types/loginRequest.interface'
import {CurrentUserRequestInterface} from '@shared/types/currentUserRequest.interface'

//this was suggested by a google search to disable cors.
//not sure if this really does it since at the time
//it was the server that was not allowing the request
//becuase it was offline
// const httpOptions: any = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Headers': 'Content-Type',
//     'Access-Control-Allow-Methods': 'GET',
//     //disable cors
//     'Access-Control-Allow-Origin': 'http://localhost:4200',
//   }),
// }

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient)

  constructor() {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user'
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser))
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  updateCurrentUser(
    currentUserRequest: CurrentUserRequestInterface
  ): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user'
    return this.http
      .put<AuthResponseInterface>(url, currentUserRequest)
      .pipe(map(this.getUser))
  }
}
