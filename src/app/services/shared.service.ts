import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private router: Router
  ) { }

  public setStorageItem(name: string, data: any) {
    if (localStorage.getItem(name)) {
      this.removeStorageItem(name);
    }
    localStorage.setItem(name, JSON.stringify(data));
  }

  public getStorageItem(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  public removeStorageItem(key: string) {
    return localStorage.removeItem(key);
  }

  public clear() {
    if (localStorage.getItem('rememberMe')) {
      localStorage.clear();
    } else {
      sessionStorage.clear();
    }
    return localStorage.clear();
  }

  public redirect(url: string, parameters?: any[]) {
    let extend_url = '';
    if (parameters) {
      for (let i = 0; i < parameters.length; i++) {
        extend_url = extend_url + '/' + parameters[i];
      }
    }
    this.router.navigateByUrl(url + extend_url);
  }
}
