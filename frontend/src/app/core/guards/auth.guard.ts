import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = authService.getToken();

    if (token !== null) return true;
    else router.navigate(['/']);
    return false;
}