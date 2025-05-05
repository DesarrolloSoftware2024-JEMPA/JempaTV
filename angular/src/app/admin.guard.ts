import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService, ConfigStateService } from '@abp/ng.core'; 

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const configStateService = inject(ConfigStateService);


  const isAuthenticated = authService.isAuthenticated; 
  const userRole = configStateService.getOne('currentUser').roles[0]; 

  if (isAuthenticated && userRole === 'Admin') {
    return true; 
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};