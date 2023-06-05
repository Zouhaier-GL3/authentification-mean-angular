import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HundelersInterceptor } from "src/_helpers/hundelers.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  bootstrap: [AppComponent],
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: HundelersInterceptor,
     multi: true
    }
   ]
})
export class AppModule {}
