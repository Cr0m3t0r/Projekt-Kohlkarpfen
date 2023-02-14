import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './list/list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { ImpressumComponent } from './impressum/impressum.component';

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddTodoComponent,
    HomeComponent,
    LoginComponent,
    ChatComponent,
    ShoppingcartComponent,
    RegisterComponent,
    ProfileComponent,
    ProductComponent,
    ImpressumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
