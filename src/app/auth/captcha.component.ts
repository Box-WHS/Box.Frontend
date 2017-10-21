import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-captcha',
  template: '<re-captcha key siteKey="6LePUjUUAAAAAAMl5FPUAccsqMatqyG7MlR16TBK" (resolved)="resolved.emit()"></re-captcha>'
})
export class CaptchaComponent {
 @Output() resolved = new EventEmitter();
}
