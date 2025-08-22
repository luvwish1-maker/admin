import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../interceptor/auth.service';
import { AlertService } from '../../shared/alert/service/alert.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const alertService = inject(AlertService)
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  alertService.showAlert({
    message: 'Not Logged In. Please Log In!',
    type: 'error',
    autoDismiss: true,
    duration: 4000
  });

  router.navigate(['/login']);
  return false;
};
