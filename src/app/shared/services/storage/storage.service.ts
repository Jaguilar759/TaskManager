import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as CryptoJS from 'crypto-js';
import SecureStorage from 'secure-web-storage';

const SECRET_KEY = environment.secret_key_storage;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public secureLocalStorage = new SecureStorage(localStorage, {
    hash: function hash(key: string | CryptoJS.lib.WordArray) {
      key = CryptoJS.SHA256(key);

      return key.toString();
    },
    encrypt: function encrypt(data: any) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);

      data = data.toString();

      return data;
    },
    decrypt: function decrypt(data: any) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);

      data = data.toString(CryptoJS.enc.Utf8);

      return data;
    }
  });

  public secureSessionStorage = new SecureStorage(sessionStorage, {
    hash: function hash(key: string | CryptoJS.lib.WordArray) {
      key = CryptoJS.SHA256(key);

      return key.toString();
    },
    encrypt: function encrypt(data: any) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);

      data = data.toString();

      return data;
    },
    decrypt: function decrypt(data: any) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);

      data = data.toString(CryptoJS.enc.Utf8);

      return data;
    }
  });
}
