import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }

  sendEvent(action: string, category: string, label: string) {
    gtag('event', action, {'event_category': category, 'event_label': label})
  }
}
