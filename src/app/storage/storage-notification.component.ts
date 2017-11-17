import { Component } from '@angular/core';
import { StorageService } from './storage.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-storage-notification',
  templateUrl: './storage-notification.component.html',
  styleUrls: ['./storage-notification.component.scss'],
  animations: [
    trigger('messageState', [
      state('1', style({
        transform: 'translateY(100%)'
      })),
      state('0', style({
        transform: 'translateY(0%)'
      })),
      transition('0 => 1', animate(200, keyframes([
        style({transform: 'translateY(100%)', offset: 1})
      ]))),
      transition('1 => 0', animate(200, keyframes([
        style({transform: 'translateY(0%)', offset: 1})
      ])))
    ])
  ]
})
export class StorageNotificationComponent {
  messageSuppressed = true;

  constructor(private storageService: StorageService) {
    window.setTimeout(() => {
      this.messageSuppressed = storageService.isLocalStorageAccepted();
    }, 500);
  }

  onAcceptButtonClicked() {
    this.messageSuppressed = true;
    this.storageService.setLocalStorageAccepted(true);
  }

  onDisagreeButtonClicked() {
    this.messageSuppressed = true;
  }
}
