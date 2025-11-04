import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TEST_IDS } from '../../constants/test-ids.constants';

@Component({
  selector: 'app-page-three',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-three.component.html',
  styleUrl: './page-three.component.scss'
})
export class PageThreeComponent {
  readonly testIds = TEST_IDS.PAGE_3;
}