import { Component } from '@angular/core';
import {SvgIconComponent} from "../svg-icon/svg-icon.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [
    SvgIconComponent
  ],
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
