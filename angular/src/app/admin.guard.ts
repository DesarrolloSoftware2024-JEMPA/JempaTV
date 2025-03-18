import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService, ConfigStateService } from '@abp/ng.core'; // Importa el servicio de autenticación

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const configStateService = inject(ConfigStateService);

  // Verifica si el usuario está autenticado y tiene el rol de administrador
  const isAuthenticated = authService.isAuthenticated; // Ejemplo de método para verificar autenticación
  const userRole = configStateService.getOne('currentUser').roles[0]; // Ejemplo de método para obtener el rol del usuario

  if (isAuthenticated && userRole === 'administrador') {
    return true; // Permite el acceso
  } else {
    router.navigate(['/unauthorized']); // Redirige a una página de no autorizado
    return false; // Deniega el acceso
  }
};