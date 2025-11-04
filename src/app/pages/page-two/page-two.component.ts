import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TEST_IDS } from '../../constants/test-ids.constants';

@Component({
  selector: 'app-page-two',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-two.component.html',
  styleUrl: './page-two.component.scss'
})
export class PageTwoComponent {
  readonly testIds = TEST_IDS.PAGE_2;
}