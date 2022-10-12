import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponent } from './components/first/first.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './lib/interceptors/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { SecondComponent } from './components/second/second.component';
import { ValidatorInterceptor } from './lib/validator.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: ValidatorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
