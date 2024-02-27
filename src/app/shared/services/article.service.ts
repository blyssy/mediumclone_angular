import {HttpClient} from '@angular/common/http'
import {Injectable, inject} from '@angular/core'
import {Observable, map} from 'rxjs'
import {environment} from '../../../environments/environment'
import {ArticleInterface} from '../types/article.interface'
import {ArticleResponseInterface} from '../types/articleResponse.interface'

@Injectable({
  providedIn: 'root',
})
export class ArticledService {
  http: HttpClient = inject(HttpClient)
  constructor() {}

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = environment.apiUrl + '/articles/' + slug
    return this.http
      .get<ArticleResponseInterface>(fullUrl)
      .pipe(map((response: ArticleResponseInterface) => response.article))
  }
}
