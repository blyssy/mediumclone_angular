import {HttpClient} from '@angular/common/http'
import {Injectable, inject} from '@angular/core'
import {Observable, map} from 'rxjs'
import {PopularTagType} from '../../../types/popularTag.type'
import {environment} from '../../../../../environments/environment'
import {GetPopularTagsResponse} from '../types/getPopularTagsResponse.interface'

@Injectable({
  providedIn: 'root',
})
export class PopularTagService {
  http = inject(HttpClient)

  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + '/tags'
    return this.http
      .get<GetPopularTagsResponse>(url)
      .pipe(map((response) => response.tags))
  }
}
