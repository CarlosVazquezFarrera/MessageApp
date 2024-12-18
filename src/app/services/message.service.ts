import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { MessageDTO } from '../models/messageDTO';
import { NewMessage } from '../models/newMessage';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) {
    this.api = `${environment.API}/Message`
    this.startConnection();
  }

  private hubConnection!: signalR.HubConnection;
  private api: string;


  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.SERVER}/messageHub`)
      .build();

    this.hubConnection
      .start()
      .then()
      .catch((err) => console.error('Error al conectar a SignalR:', err));
  }

  // Escuchar mensajes nuevos
  public onNewMessage(callback: (message: MessageDTO) => void) {
    this.hubConnection.on('ReceiveMessage', (message: MessageDTO) => {
      callback(message);
    });
  }

  public async getAll(){
    return await lastValueFrom(this.http.get<Array<MessageDTO>>(`${this.api}`));
  }

  public async addMessage(newMessage: NewMessage) {
    return await lastValueFrom(this.http.post<MessageDTO>(`${this.api}`, newMessage));
  }

  public async removeMessage(id: string) {
    return await lastValueFrom(this.http.delete<void>(`${this.api}?id=${id}`));
  }
}
