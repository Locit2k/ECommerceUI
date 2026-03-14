import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { Loading } from '../services/loading';

let totalRequests = 0;

export const errorLoadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(Loading);
    const router = inject(Router);

    totalRequests++;
    // Enable loading spinner (assume loadingService has setLoading method)
    // loadingService.setLoading(true); // You will need to implement this in LoadingService

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMsg = '';
            if (error.error instanceof ErrorEvent) {
                errorMsg = `Client error: ${error.error.message}`;
            } else {
                errorMsg = `Server error: ${error.status} - ${error.message}`;
                if (error.status === 401) {
                    router.navigate(['/auth/login']);
                }
            }
            console.error(errorMsg);
            return throwError(() => new Error(errorMsg));
        }),
        finalize(() => {
            totalRequests--;
            if (totalRequests === 0) {
                // Disable loading spinner
                // loadingService.setLoading(false);
            }
        })
    );
};
