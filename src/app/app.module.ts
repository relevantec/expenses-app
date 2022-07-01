import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ExpenseComponent } from './expense/expense.component';
import { FeedComponent } from './expense/feed/feed.component';
import { DetailsComponent } from './expense/details/details.component';
import { ExpenseFormComponent } from './expense/expense-form/expense-form.component';
import { FormsModule } from '@angular/forms';
import { LoginResultComponent } from './login-result/login-result.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ExpenseComponent,
    FeedComponent,
    DetailsComponent,
    ExpenseFormComponent,
    LoginResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
