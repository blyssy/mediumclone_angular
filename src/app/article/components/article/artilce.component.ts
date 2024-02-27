import {Component, OnInit, inject} from '@angular/core'
import {Store} from '@ngrx/store'
import {articleActions} from '../../store/actions'
import {ActivatedRoute, RouterLink} from '@angular/router'
import {combineLatest, filter, map} from 'rxjs'
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../../store/reducers'
import {selectCurrentUser} from '../../../auth/store/reducers'
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface'
import {CommonModule} from '@angular/common'
import {LoadingComponent} from '../../../shared/components/loading/loading.component'
import {ErrorMessageComponent} from '../../../shared/components/errorMessage/errorMessage.component'
import {TagListComponent} from '../../../shared/components/tagList/tagList.component'

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
  ],
})
export class ArticleComponent implements OnInit {
  store = inject(Store)
  route = inject(ActivatedRoute)

  //get article and user streams and return a boolean
  //if the current user is the author of the selected (slug) article
  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(
        filter(
          (currentUser): currentUser is CurrentUserInterface | null =>
            currentUser !== undefined
        )
      ),
  }).pipe(
    // nned to check if article and currentUser are not null
    // and then make sure current user is the author of the article
    map(({article, currentUser}) => {
      if (!article || !currentUser) {
        return false
      }
      return article.author.username === currentUser.username
    })
  )

  data$ = combineLatest({
    article: this.store.select(selectArticleData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    isAuthor: this.isAuthor$,
  })

  slug = this.route.snapshot.paramMap.get('slug') ?? ''

  constructor() {}

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({slug: this.slug}))
  }
}
