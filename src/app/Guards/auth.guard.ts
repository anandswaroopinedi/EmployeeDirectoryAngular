import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

export const activateGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  var isAuthenticated:boolean=false;
  if(sessionStorage.getItem('token'))
    isAuthenticated=true;
  return isAuthenticated;
};
