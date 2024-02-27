import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  // function to generate range of numbers start to end [start, start+1, ..., end-1]
  range(start: number, end: number): number[] {
    return [...Array(end - start).keys()].map((el) => el + start)
  }
}
