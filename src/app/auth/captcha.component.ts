import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-captcha',
  template: '<re-captcha [siteKey]="siteKey" (resolved)="resolved.emit($event)"></re-captcha>'
})
export class CaptchaComponent {
  siteKey = '6LczZDUUAAAAACVk2if90vH-j_El8jFOJOrfuVhU';
 @Output() resolved = new EventEmitter<string>();
}
