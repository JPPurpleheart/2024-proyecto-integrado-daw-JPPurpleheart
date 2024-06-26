import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from 'src/app/core/services/cursos/examen.service';
import { AuthHandlerService } from 'src/app/core/services/login/auth-handler.service';

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
  preguntaCounter = 0;

  constructor(public examenService: ExamenService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, public authHandler: AuthHandlerService) {
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
    const userType = this.authHandler.getLoggedInUserType();
    if (userType !== 'profesor' && userType !== 'alumno') {
      this.router.navigateByUrl('login'); // Redirect to login
    }
    this.id_curso = this.route.snapshot.paramMap.get('id_course');
  }

  addExam() {
    const pregunta = this?.form?.get('pregunta')?.value;
    const opcion_a = this?.form?.get('opcion_a')?.value;
    const opcion_b = this?.form?.get('opcion_b')?.value;
    const opcion_c = this?.form?.get('opcion_c')?.value;
    const opcion_d = this?.form?.get('opcion_d')?.value;
    const opcion_correcta = this?.form?.get('opcion_correcta')?.value;
    let formData = {
      id_curso: this.id_curso,
      pregunta: pregunta,
      opcion_a: opcion_a,
      opcion_b: opcion_b,
      opcion_c: opcion_c,
      opcion_d: opcion_d,
      opcion_correcta: opcion_correcta
    };
    this.examenService.store(formData).subscribe(data => {
      console.log("Pregunta añadida");
      this.preguntaCounter ++;
      if (this.preguntaCounter === 5) {
        this.router.navigateByUrl('/course/' + this.id_curso);
      } else {
        this.router.navigateByUrl('/exam/store/' + this.id_curso);
      }
    });
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
