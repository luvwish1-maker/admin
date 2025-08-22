import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';
import { AlertService } from '../../shared/alert/service/alert.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const alertService = inject(AlertService);
  const token = authService.getToken();

  if (token) {

    if (authService.isTokenExpired(token)) {
      alertService.showAlert({
        message: 'Your session has expired. Please log in again.',
        type: 'warning',
        autoDismiss: true,
        duration: 4000
      });
      authService.logout();

      return throwError(() => new Error('Token expired'));
    }

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }

  return next(req);
};
