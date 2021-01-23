import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  constructor(private _gaservice: GoogleAnalyticsService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {}
}
