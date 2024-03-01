import {HttpClient} from '@angular/common/http'
import {Injectable, inject} from '@angular/core'
import {environment} from '@environments/environment'
import {ArticleRequestInterface} from '@shared/types/articleRequest.interface'
import {ArticleResponseInterface} from '@shared/types/articleResponse.interface'
import {map} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CreateArticleService {
  http: HttpClient = inject(HttpClient)

  constructor() {}

  createArticle(articleRequest: ArticleRequestInterface) {
    const fullUrl = environment.apiUrl + '/articles'

    return this.http
      .post<ArticleResponseInterface>(fullUrl, articleRequest)
      .pipe(map((response: ArticleResponseInterface) => response.article))
  }
}
