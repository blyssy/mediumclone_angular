import {CurrentUserInterface} from './currentUser.interface'

//& adds password to the CurrentUserInterface object
export interface CurrentUserRequestInterface {
  user: CurrentUserInterface & {password: string}
}
