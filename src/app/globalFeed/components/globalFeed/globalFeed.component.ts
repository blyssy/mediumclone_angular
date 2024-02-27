import {Component} from '@angular/core'
import {FeedComponent} from '../../../shared/components/feed/feed.component'
import {BannerComponent} from '../../../shared/components/banner/banner.component'
import {ErrorMessageComponent} from '../../../shared/components/errorMessage/errorMessage.component'

@Component({
  selector: 'mc-global-feed',
  templateUrl: './globalFeed.component.html',
  standalone: true,
  imports: [FeedComponent, BannerComponent],
})
export class GlobalFeedComponent {
  apiUrl = '/articles'
}
