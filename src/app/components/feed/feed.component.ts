import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MessageDTO } from '../../models/messageDTO';
import { MessageService } from '../../services/message.service';
import { MatIconModule } from '@angular/material/icon';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { AddMessageComponent } from '../../modals/add-message/add-message.component';
import { messageAppStore } from '../../store/store';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';


@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule,
    CustomDatePipe],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {

  private messageService = inject(MessageService);
  private _snackBar = inject(MatSnackBar);
  private notificationAudio = new Audio('/notificacion.mp3');
  private _bottomSheet = inject(MatBottomSheet);
  public store = inject(messageAppStore);
  

  ngOnInit(): void {

    this.store.loadMessage();
    this.messageService.onNewMessage(message => {
      this.notificationAudio.play();
      this._snackBar.open("New Notification", "Ok", {
        duration: 2 * 1000,
        horizontalPosition: 'left',
        verticalPosition: 'top'
      });
      this.store.messageReceived(message);
    });
  }

  public openBottomSheet(): void {
    this._bottomSheet.open(AddMessageComponent);
  }

}
