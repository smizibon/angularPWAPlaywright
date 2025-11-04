import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TEST_IDS } from '../../constants/test-ids.constants';

@Component({
  selector: 'app-page-one',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-one.component.html',
  styleUrl: './page-one.component.scss'
})
export class PageOneComponent {
  readonly testIds = TEST_IDS.PAGE_1;
}