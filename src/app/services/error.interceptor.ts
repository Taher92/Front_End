import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        return next.handle(req).pipe(catchError(err => {
            if (err instanceof HttpErrorResponse) {
                if(err.status === 401){
                    return throwError(err.statusText);
                }
                const applicatioError = err.headers.get('Application-Error');
                if (applicatioError) {
                    console.log('intercceptor:  ' + applicatioError);
                    return throwError(applicatioError);
                }
                const serverError = err.error;
                let modelStateErrors = '';
                if (serverError && typeof serverError === 'object') {

                    for (const index in serverError) {
                        if (serverError) {
                            modelStateErrors += serverError[index] + '\n';
                        }

                    }
                }
                console.log('Modelstate:  ' + applicatioError);
                console.log('sserver error' + serverError);
                return throwError(modelStateErrors || serverError || 'internal server error');
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
