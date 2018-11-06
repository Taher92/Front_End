import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        return next.handle(req).pipe(catchError(err => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    return throwError(err.statusText);
                }
                const applicatioError = err.headers.get('Application-Error');
                if (applicatioError) {
                    console.log('intercceptor:  ' + applicatioError);
                    return throwError(applicatioError);
                }
                const serverError = err.error;

                if (serverError && typeof serverError === 'object') {
                    const modelStateErrors = [];
                    for (const index in serverError) {
                        if (serverError) {
                            modelStateErrors.push(serverError[index]);
                        }

                    }
                    return throwError(modelStateErrors);
                }

                return throwError(serverError || 'internal server error');
            }
        }
        ));
    }
}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
