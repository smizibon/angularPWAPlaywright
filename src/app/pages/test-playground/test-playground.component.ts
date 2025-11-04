import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TEST_IDS } from '../../constants/test-ids.constants';

interface TableRow {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-test-playground',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './test-playground.component.html',
  styleUrl: './test-playground.component.scss'
})
export class TestPlaygroundComponent {
  readonly testIds = TEST_IDS.TEST_PLAYGROUND;

  // Form
  testForm: FormGroup;
  formSubmitted = false;

  // State
  counter = 0;
  isToggled = false;
  showConditional = true;
  showModal = false;
  showAlert = true;
  showLoading = false;
  progressValue = 45;

  // Tab state
  activeTab = 0;

  // Accordion state
  accordionOpen: { [key: string]: boolean } = {
    '1': false,
    '2': false,
    '3': false
  };

  // Lists
  unorderedItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  orderedItems = ['First', 'Second', 'Third', 'Fourth'];
  ngForItems = ['Angular', 'React', 'Vue', 'Svelte'];

  // Table data
  tableData: TableRow[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
  ];

  // Pipes demo
  todayDate = new Date();
  largeNumber = 1234567.89;
  uppercaseText = 'hello world';

  constructor(private fb: FormBuilder) {
    this.testForm = this.fb.group({
      textInput: ['', Validators.required],
      emailInput: ['', [Validators.required, Validators.email]],
      passwordInput: ['', [Validators.required, Validators.minLength(6)]],
      numberInput: [0, [Validators.required, Validators.min(1)]],
      textarea: [''],
      checkbox: [false],
      radio: ['option1'],
      dropdown: ['', Validators.required],
      datePicker: ['']
    });
  }

  // Counter methods
  increment(): void {
    this.counter++;
  }

  decrement(): void {
    this.counter--;
  }

  // Toggle methods
  toggle(): void {
    this.isToggled = !this.isToggled;
  }

  toggleConditional(): void {
    this.showConditional = !this.showConditional;
  }

  // Modal methods
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  // Accordion methods
  toggleAccordion(id: string): void {
    this.accordionOpen[id] = !this.accordionOpen[id];
  }

  // Tab methods
  selectTab(index: number): void {
    this.activeTab = index;
  }

  // Toast/Alert methods
  showToast(): void {
    alert('Toast notification triggered!');
  }

  closeAlert(): void {
    this.showAlert = false;
  }

  // Loading methods
  toggleLoading(): void {
    this.showLoading = !this.showLoading;
  }

  // Form methods
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.testForm.valid) {
      console.log('Form submitted:', this.testForm.value);
      alert('Form submitted successfully!');
    } else {
      console.log('Form is invalid');
    }
  }

  // File upload
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log('File selected:', input.files[0].name);
    }
  }

  // Helper methods
  get isFormInvalid(): boolean {
    return this.formSubmitted && this.testForm.invalid;
  }
}
