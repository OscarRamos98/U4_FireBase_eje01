import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Estudiante} from '../models/estudiante';
import { StudentService } from '../services/student.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public myForm: FormGroup;
  public student: Estudiante;

  constructor(private studentService: StudentService, private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name: [''],
      controlnumber: [''],
      curp: [''],
      age: [0],
      active: [false]
    });
    this.initializeForm();
  }

  initializeForm(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])],
      controlnumber: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{10}')])],
      curp: ['', Validators.compose([Validators.required, Validators.pattern('[A-Z]{4}[0-9]{6}[A-Z]{6}[0-9]{2}')])],
      age: ['', Validators.compose([Validators.required])],
      active: ['', Validators.compose([Validators.required])],






    });
  }

  create() {
    this.student = {
      name: this.myForm.controls.name.value,
      controlnumber: this.myForm.controls.controlnumber.value,
      age: this.myForm.controls.age.value,
      curp: this.myForm.controls.curp.value,
      active: this.myForm.controls.active.value

    }
    this.studentService.createStudent(this.student);
  }

}
