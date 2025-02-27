import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-textarea-input',
    templateUrl: './textarea-input.component.html',
    styleUrls: ['./textarea-input.component.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule]
})
export class TextareaInputComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() rows = 3;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}
