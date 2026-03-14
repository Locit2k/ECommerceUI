import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // In a real app, implement isLoggedIn() in AuthService
    const isAuthenticated = !!localStorage.getItem('access_token');

    if (isAuthenticated) {
        return true;
    }

    router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
};
