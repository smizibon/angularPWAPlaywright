import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TEST_IDS } from './constants/test-ids.constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('demo-chat-app');
  readonly testIdsApp = TEST_IDS.APP;
}
