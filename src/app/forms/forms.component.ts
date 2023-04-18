import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  myForm: FormGroup; 
  constructor() {
    this.myForm = new FormGroup({ 
      firstName: new FormControl(),
      lastName: new FormControl(),
      birthDate: new FormControl(),
      hireDate: new FormControl(),
      gender: new FormControl()
    });

  }
}
