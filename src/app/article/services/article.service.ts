import {HttpClient} from '@angular/common/http'
import {Injectable, inject} from '@angular/core'
import {Observable} from 'rxjs'
import {environment} from '@environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  http: HttpClient = inject(HttpClient)
  constructor() {}

  deleteArticle(slug: string): Observable<{}> {
    const fullUrl = environment.apiUrl + '/articles/' + slug
    return this.http.delete(fullUrl)
  }
}
