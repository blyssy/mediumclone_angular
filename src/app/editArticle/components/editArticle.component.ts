import {CommonModule} from '@angular/common'
import {Component, OnInit, inject} from '@angular/core'
import {Store, select} from '@ngrx/store'
import {ArticleFormComponent} from '@shared/components/articleForm/articleForm.component'
import {ArticleFormValuesInterface} from '@shared/components/articleForm/types/articleFormValues.interface'
import {Observable, combineLatest, filter, map} from 'rxjs'
import {
  selectArticle,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
} from '../store/reducers'
import {editArticleActions} from '../store/actions'
import {ArticleRequestInterface} from '@shared/types/articleRequest.interface'
import {LoadingComponent} from '@shared/components/loading/loading.component'
import {ActivatedRoute} from '@angular/router'
import {ArticleInterface} from '@shared/types/article.interface'

@Component({
  selector: 'mc-edit-article',
  templateUrl: './editArticle.component.html',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent, LoadingComponent],
})
export class EditArticleComponent implements OnInit {
  store = inject(Store)
  route = inject(ActivatedRoute)

  slug = this.route.snapshot.paramMap.get('slug') ?? ''

  constructor() {}

  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({slug: this.slug}))
  }

  initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      }
    })
  )

  data$ = combineLatest({
    article: this.store.select(selectArticle),
    isLoading: this.store.select(selectIsLoading),
    isSubmitting: this.store.select(selectIsSubmitting),
    errors: this.store.select(selectValidationErrors),
    initialValues: this.initialValues$,
  })

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    }
    this.store.dispatch(
      editArticleActions.updateArticle({request, slug: this.slug})
    )
  }
}
