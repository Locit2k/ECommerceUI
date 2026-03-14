import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { environment } from '../../../environments/environment';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    // Replace with actual logic to retrieve token
    const token = localStorage.getItem('access_token');
    const isApiUrl = req.url.startsWith(environment.apiUrl);

    if (token && isApiUrl) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req);
};
