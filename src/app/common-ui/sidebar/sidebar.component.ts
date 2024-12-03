import {Component, inject} from '@angular/core';
import {SvgIconComponent} from "../svg-icon/svg-icon.component";
import {AsyncPipe, NgForOf} from '@angular/common';
import {SubscriberCardComponent} from './subscriber-card/subscriber-card.component';
import {RouterLink} from '@angular/router';
import {ProfileService} from '../../data/services/profile.service';
import {firstValueFrom} from 'rxjs';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [
    SvgIconComponent,
    NgForOf,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe
  ],
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;


  menuItems = [
    {
      label: 'My Page',
      icon: 'home',
      link:''
    },
    {
      label: 'Chats',
      icon: 'chat',
      link:'chats'
    },
    {
      label: 'Search',
      icon: 'search',
      link:'search'
    }
  ]

  ngOnInit(){
    firstValueFrom(this.profileService.getMe());
  }
}
