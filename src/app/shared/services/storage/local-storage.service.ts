import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;

  constructor(private storageService: StorageService) { }

  setJsonValue(key: string, value: any) {
    this.storageService.secureLocalStorage.setItem(key, value);
  }

  getJsonValue(key: string) {
    return this.storageService.secureLocalStorage.getItem(key);
  }

  clearToken() {
    return this.storageService.secureLocalStorage.clear();
  }

  remove(key: string) {
    this.storageService.secureLocalStorage.removeItem(key);
  }

}
