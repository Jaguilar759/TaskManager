import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IdentityUser } from '@shared/models';
import { TokenStorageService } from '@shared/services';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly API_URL = `${environment.apiUrl}/auth`;

  private http: HttpClient = inject(HttpClient);
  private tokenStorageService: TokenStorageService = inject(TokenStorageService);

  public getCurrentUser(): IdentityUser {
    return this.tokenStorageService.getUser();
  }

  public login(username: string, password: string) {
    return of({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIxMjMiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbGFkZHJlc3MiOiJKb2huRG9lQGVtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.Fv3Gvq-uwlr79HQHBoxsDcvbxZIE5gtYtRCO9Y_Kx20',
      user: {
        id: '123',
        username: username,
        email: 'email@email.com',
        roles: ['admin']
      }
    });
  }


  public logout(): void {
    this.tokenStorageService.cleanTokens();
    localStorage.clear();
    sessionStorage.clear();
  }

}
