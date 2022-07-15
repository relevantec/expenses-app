import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken = localStorage.getItem('Bearer');
        if(userToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${userToken}`
                }
            })
        }
        return next.handle(req);
        
    }
}