import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { messageAppStore } from '../../store/store';
import { NewMessage } from '../../models/newMessage';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-add-message',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './add-message.component.html',
  styleUrl: './add-message.component.scss'
})
export class AddMessageComponent {

  private _bottomSheetRef = inject<MatBottomSheetRef<AddMessageComponent>>(MatBottomSheetRef);
  public message = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public store = inject(messageAppStore);
  private sesionService = inject(SessionService);

  public async addComment() {
    const newMessage: NewMessage = {
      studentid: this.sesionService.getAgentUser()?.id!,
      text: this.message.value!
    }
    await this.store.addMessage(newMessage);
    //this._bottomSheetRef.dismiss();
  }
}
