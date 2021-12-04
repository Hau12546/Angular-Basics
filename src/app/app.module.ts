import { RecipeService } from './share/services/recipe-services/recipe.service';
import { CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingService } from './share/services/shopping-services/shopping.service';
import { DataStorageService } from './share/services/data-storage-service/data-storage.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthPageComponent } from './auth/auth-page/auth-page.component';
import { AuthenService } from './share/services/authen/authen.service';
import { AuthInterceptorInterceptor } from './share/services/auth-interceptor-service/auth-interceptor.interceptor';
import { AlertComponentComponent } from './share/alert-component/alert-component.component';
import { RecipeModuleModule } from './recipe/recipe-module/recipe-module.module';
import { ShoppingRouteScopeModule } from './shopping-list/shopping--route--scope/shopping--route--scope.module';
import { SharedModule } from './share/shared/shared.module';
import { CoreModule } from './share/services/core-module';
import { AuthModule } from './auth/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecipeModuleModule,
    ShoppingRouteScopeModule,
    SharedModule,
    CoreModule,
    AuthModule,
  ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
  entryComponents:[
    AlertComponentComponent
  ],
})
export class AppModule { }
