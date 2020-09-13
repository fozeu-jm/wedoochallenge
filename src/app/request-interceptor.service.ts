import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class RequestInterceptor implements HttpInterceptor{
    readonly SECRETKEY: string = "tokenTest123";

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let modified_request = req.clone({
            headers: req.headers.append("Authorization", this.SECRETKEY) 
        });
        return next.handle(modified_request);
    }

}