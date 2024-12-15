import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginInfo } from '../models/loginInfo';
import { StudentDTO } from '../models/studentDTO';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
    this.api = `${environment.API}/Student`
  }
  private api: string;

  public async login(clave: string) {
    const info: LoginInfo = {
      clave
    }
    return await lastValueFrom( this.http.post<StudentDTO>(`${this.api}/Login`, info));
  }
}
