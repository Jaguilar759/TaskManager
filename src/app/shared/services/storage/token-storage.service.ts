import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-usuario';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  public cleanTokens(): void {
    this.localStorageService.remove(TOKEN_KEY);
    this.localStorageService.remove(USER_KEY);
  }

  public saveToken(token: string): void {
    this.localStorageService.remove(TOKEN_KEY);
    this.localStorageService.setJsonValue(TOKEN_KEY, token);
  }

  public getToken() {
    return this.localStorageService.getJsonValue(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    this.localStorageService.remove(USER_KEY);
    this.localStorageService.setJsonValue(USER_KEY, user);
  }

  public getUser(): any {
    return this.localStorageService.getJsonValue(USER_KEY);
  }
}
