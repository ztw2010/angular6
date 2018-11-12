import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {JwtService} from '../service/jwt.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.jwtService.getToken();
    if (token) {
      headerConfig['Authorization'] = `Token ${token}`;
    }
    const request = req.clone({setHeaders: headerConfig});
    return next.handle(request);
  }

}
