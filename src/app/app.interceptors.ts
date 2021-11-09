import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';
import { AuthService } from './services';
import { Observable } from 'rxjs';
import { AuthToken } from './models';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let accessToken: AuthToken = this.authService.getCurrentAccessToken();
        if (!accessToken) {
            return next.handle(request);
        }

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken.access_token}`
            }
        });

        return next.handle(request);
    }
}