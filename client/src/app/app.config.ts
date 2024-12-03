import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { errorInterceptor } from "./_interceptors/error.interceptor";
import { jwtInterceptor } from "./_interceptors/jwt.interceptor";
import { loadingInterceptor } from "./_interceptors/loading.interceptor";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./_modules/shared.module";
import { provideToastr } from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideToastr({
      positionClass: 'toast-bottom-right',
    }),
    importProvidersFrom(BrowserModule, FormsModule, ReactiveFormsModule, SharedModule),
    provideHttpClient(
      withInterceptors([errorInterceptor, jwtInterceptor, loadingInterceptor]),
      withInterceptorsFromDi()
    ),
    provideAnimations()
  ]
}
