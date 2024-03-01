import {BackendErrorsInterface} from '@shared/types/backendErrors.interface'

//store any errors we might get here so we can display them to the user
export interface CreateArticleStateInterface {
  isSubmitting: boolean
  validationErrors: BackendErrorsInterface | null
}
