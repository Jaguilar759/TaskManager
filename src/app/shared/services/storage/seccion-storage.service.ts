import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SeccionStorageService {

  constructor(private storageService: StorageService) { }

  setJsonValue(key: string, value: any) {
    this.storageService.secureSessionStorage.setItem(key, value);
  }

  getJsonValue(key: string) {
    return this.storageService.secureSessionStorage.getItem(key);
  }

  clearToken() {
    return this.storageService.secureSessionStorage.clear();
  }
}
