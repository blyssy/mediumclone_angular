import {HttpClient} from '@angular/common/http'
import {Injectable, inject} from '@angular/core'
import {environment} from '@environments/environment'
import {ArticleRequestInterface} from '@shared/types/articleRequest.interface'
import {ArticleResponseInterface} from '@shared/types/articleResponse.interface'
import {map} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class EditArticleService {
  http: HttpClient = inject(HttpClient)

  constructor() {}

  updateArticle(slug: string, articleRequest: ArticleRequestInterface) {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`

    return this.http
      .put<ArticleResponseInterface>(fullUrl, articleRequest)
      .pipe(map((response: ArticleResponseInterface) => response.article))
  }
}
