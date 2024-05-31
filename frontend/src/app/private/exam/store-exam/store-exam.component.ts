import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from 'src/app/core/services/cursos/examen.service';

@Component({
  selector: 'app-store-exam',
  templateUrl: './store-exam.component.html',
  styleUrls: ['./store-exam.component.css']
})
export class StoreExamComponent implements OnInit {

  form: FormGroup;
  id_curso: any = "";
  default_errors_front: any = {
    error_opcion_correcta: 'Introduce solo a, b, c o d para elegir cual es la opción correcta'
  };

  constructor(public examenService: ExamenService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      pregunta:['', [Validators.required]],
      opcion_a: ['', [Validators.required]],
      opcion_b: ['', [Validators.required]],
      opcion_c: ['', [Validators.required]],
      opcion_d: ['', [Validators.required]],
      opcion_correcta: ['', [Validators.required, Validators.pattern(new RegExp('^[a|b|c|d]$'))]]
    })
  }

  ngOnInit(): void {
    this.id_curso = this.route.snapshot.paramMap.get('id_course');
  }

  addExam() {
    let formData = {
      id_curso: this.id_curso,
      pregunta:'',
      opcion_a: '',
      opcion_b: '',
      opcion_c: '',
      opcion_d: '',
      opcion_correcta: ''
    };
    for (let i = 0; i < 5; i++) {
      this.examenService.store(formData).subscribe(data => {
        console.log("Pregunta añadida");
        this.router.navigateByUrl('/exam/store/' + this.id_curso);
      });     
    }
    this.router.navigateByUrl('/course/' + this.id_curso);
  }

  getErrorMessage(controlName: string): string {
    let control = this?.form?.get(controlName);
    if (!control) {
      return '';
    } else {
      switch (controlName) {
        case 'opcion_correcta':
          if (control.hasError('required')) {
            return `La opcion correcta es obligatoria.`;
          }
          if (control.hasError('pattern')) {
            return 'Solo se puede escribir a, b, c o d; para obtener la opción correcta.';
          }
          return '';
          
        default:
          return '';
      }
    }
  }

}
