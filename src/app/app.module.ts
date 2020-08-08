import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
//rutas
import { APP_ROUTES } from './app.routes';

//modulo de pages
import { PagesModule } from './pages/pages.module';

//formulario luego lo quitaremos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from './services/service.module';


//servicios




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
    
    
  
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ServiceModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
