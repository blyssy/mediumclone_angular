import {CommonModule} from '@angular/common'
import {Component, inject} from '@angular/core'
import {Store} from '@ngrx/store'
import {ArticleFormComponent} from '@shared/components/articleForm/articleForm.component'
import {ArticleFormValuesInterface} from '@shared/components/articleForm/types/articleFormValues.interface'
import {combineLatest} from 'rxjs'
import {selectIsSubmitting, selectValidationErrors} from '../store/reducers'
import {createArticleActions} from '../store/actions'
import {ArticleRequestInterface} from '@shared/types/articleRequest.interface'

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
})
export class CreateArticleComponent {
  store = inject(Store)

  constructor() {}
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  }

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    errors: this.store.select(selectValidationErrors),
  })

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    }
    this.store.dispatch(createArticleActions.createArticle({request}))
  }
}
