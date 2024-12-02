import {Component, Input} from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href]="href1"></svg:use>',
  styles: ['']
})
export class SvgIconComponent {
  @Input() icon = '';

  get href1() {
    return `/assets/svg/${this.icon}.svg#${this.icon}`;
    // return `/assets/svg/${this.icon}.svg`;
  }
}
