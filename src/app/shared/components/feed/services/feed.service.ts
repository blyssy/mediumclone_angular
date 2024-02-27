import {HttpClient} from '@angular/common/http'
import {Injectable, inject} from '@angular/core'
import {GetFeedResponseInterface} from '../types/getFeedResponse.interface'
import {Observable} from 'rxjs'
import {environment} from '../../../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  http: HttpClient = inject(HttpClient)
  constructor() {}

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    const fullUrl = environment.apiUrl + url
    return this.http.get<GetFeedResponseInterface>(fullUrl)
  }
}
