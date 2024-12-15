import { Injectable } from '@angular/core';
import { StudentDTO } from '../models/studentDTO';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  currentUserIsloggedIn: boolean = false;
  constructor() { }

  private studentKey = 'student'

  public getAgentUser(): StudentDTO | undefined {
    const value = sessionStorage.getItem(this.studentKey);
    if (value) {
      const agent: StudentDTO = JSON.parse(value);
      return agent;
    }

    return undefined;
  }


  public login(agentInfo: StudentDTO) {
    sessionStorage.setItem(this.studentKey, JSON.stringify(agentInfo));
    this.currentUserIsloggedIn = true;
  }

  public get isLoggedIn(): boolean {
    return this.currentUserIsloggedIn;
  }
}
