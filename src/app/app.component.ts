import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { messageAppStore } from './store/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MessageApp';

  public store = inject(messageAppStore);

}
