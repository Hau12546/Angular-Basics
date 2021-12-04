import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { AuthInterceptorInterceptor } from "./auth-interceptor-service/auth-interceptor.interceptor";
import { AuthenService } from "./authen/authen.service";
import { DataStorageService } from "./data-storage-service/data-storage.service";
import { RecipeService } from "./recipe-services/recipe.service";
import { ShoppingService } from "./shopping-services/shopping.service";


@NgModule({
  declarations: [],
  imports: [],
  providers: [
    RecipeService,
    ShoppingService,
    DataStorageService,
    AuthenService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true, }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: []
})

export class CoreModule { }
