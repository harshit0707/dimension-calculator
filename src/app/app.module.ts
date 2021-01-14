import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DimensionComponent } from './dimension/dimension.component';
import { ConverterComponent } from './converter/converter.component';
import { HomeComponent } from './home/home.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    DimensionComponent,
    ConverterComponent,
    HomeComponent,
    FeedbackComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
