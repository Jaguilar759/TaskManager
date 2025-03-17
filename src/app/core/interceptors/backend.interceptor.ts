import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

export const BackendInterceptor: HttpInterceptorFn = (request, next) => {
  const translateService = inject(TranslateService);
  const snackBar = inject(MatSnackBar);

  if (request.url.includes("assets")) {
    return next(request);
  }

  const apiKey = environment.apiKey;
  const clonedRequest = request.clone({
    setHeaders: {
      'X-Api-Key': apiKey
    }
  });

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'generalError';

      if (!environment.production) {
        console.log({ error });
      }

      if (error.error && error.error.isBusinessError) {
        errorMessage = `backExeptions.${error.error.title}`;
      }

      errorMessage = translateService.instant(errorMessage);
      snackBar.open(errorMessage, 'Ok');

      return throwError(() => error.error?.message || error.statusText);
    })
  );
};
