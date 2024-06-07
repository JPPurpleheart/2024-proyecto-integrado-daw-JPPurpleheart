import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { ExamenService } from 'src/app/core/services/cursos/examen.service';
import { MatriculaService } from 'src/app/core/services/usuarios/matricula.service';

@Component({
  selector: 'app-solve-exam',
  templateUrl: './solve-exam.component.html',
  styleUrls: ['./solve-exam.component.css']
})
export class SolveExamComponent implements OnInit {
  
  questions: any[] = [
    { 
      pregunta: '',
      opcion_a: '',
      opcion_b: '',
      opcion_c: '',
      opcion_d: '',
      opcion_correcta: '' 
    },
  ];
  idCurso: number = 0;
  studentAnswers: string[] = new Array(this.questions.length).fill('');
  matriculaData: any = [];
  
  constructor(public cursosService: CursoService, public examenService: ExamenService, public matriculaService: MatriculaService, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.idCurso = Number(this.route.snapshot.paramMap.get('id_course'));
    this.getQuestions(this.idCurso);
    this.getMatricula(this.idCurso);
  }

  getQuestions(idCurso: number) {
    this.examenService.show(idCurso).subscribe(data => {
      this.questions = data.slice(); // Make a copy of the data array
  
      for (let i = 9; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
      }
    });
  }

  getMatricula(idCurso: number) {
    this.matriculaService.findEnrollmentByCourse(idCurso).subscribe(data => {
      this.matriculaData = data;
    });
  }

  updateAnswer(questionIndex: number, answer: string) {
    this.studentAnswers[questionIndex] = answer;
  }

  calculateScore() {
    let correctAnswers = 0;
    this.studentAnswers.forEach((answer, index) => {
      if (answer === this.questions[index].correctAnswer) {
        correctAnswers++;
      }
    });
    this.completeCourse(correctAnswers);
  }

  completeCourse(correctAnswers: number) {
    if (correctAnswers < 6) {
      this.router.navigateByUrl("/course/"+this.idCurso);
    } else {
      for (let matricula of this.matriculaData) {
        let idMatricula = matricula.id;
        let matriculaToUpdate = {
        id: matricula.id,
        id_alumno: matricula.id_alumno,
        id_curso: matricula.id_curso,
        id_clase: matricula.id_clase,
        comp_curso: 1,
        comp_clase: this.matriculaData.comp_clase,
      };
      this.matriculaService.update(idMatricula, matriculaToUpdate).subscribe(data => {
        this.router.navigateByUrl("/complete-course/"+this.idCurso);
      });
      }
    }
  }

}
