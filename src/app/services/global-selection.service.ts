import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalSelectionService {
  baseUrl = "http://localhost:3000/";
  user: any = {}
  
  constructor() { }
}
