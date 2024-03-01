import {ArticleInterface} from '@shared/types/article.interface'
import {BackendErrorsInterface} from '@shared/types/backendErrors.interface'

//store any errors we might get here so we can display them to the user
export interface EditArticleStateInterface {
  article: ArticleInterface | null
  isLoading: boolean
  isSubmitting: boolean
  validationErrors: BackendErrorsInterface | null
}
