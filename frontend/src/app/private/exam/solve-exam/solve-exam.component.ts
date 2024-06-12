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
      id: 0, 
      pregunta: '',
      opcion_a: '',
      opcion_b: '',
      opcion_c: '',
      opcion_d: '',
      opcion_correcta: '' 
    },
  ];
  idCurso: number = 0;
  studentAnswers: any[] = [
    {
      questionId: 0,
      answer: '',
    }
  ];
  matriculaData: any = [];
  
  constructor(public cursosService: CursoService, public examenService: ExamenService, public matriculaService: MatriculaService, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.idCurso = Number(this.route.snapshot.paramMap.get('id_course'));
    this.getQuestions(this.idCurso);
    this.getMatricula(this.idCurso);
  }

  getQuestions(idCurso: number) {
    this.examenService.findQuestionsByCourse(idCurso).subscribe(data => {
      const questions = data.slice(); // Make a copy of the data array

      // Shuffle the questions using Fisher-Yates shuffle
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }

      // Get the first 10 shuffled questions
      this.questions = questions.slice(0, 10);
      console.log(this.questions);
    });
  }

  getMatricula(idCurso: number) {
    this.matriculaService.findEnrollmentByCourse(idCurso).subscribe(data => {
      this.matriculaData = data;
    });
  }

  updateAnswer(questionIndex: number, answer: string) {
    const studentAnswer = {
      questionId: this.questions[questionIndex].id, // Assuming 'id' property in question object
      answer: answer,
    };
    this.studentAnswers[questionIndex] = studentAnswer;
    console.log(this.studentAnswers);
  }

  calculateScore() {
    let correctAnswers = 0;
    this.studentAnswers.forEach((answer) => {
      const matchingQuestion = this.questions.find(
        (question) => question.id === answer.questionId
      );
      if (matchingQuestion && answer.answer === matchingQuestion.opcion_correcta) {
        correctAnswers++;
        console.log(correctAnswers);
      }
    });
    this.completeCourse(correctAnswers);
  }
  
  completeCourse(correctAnswers: number) {
    if (correctAnswers < 6) {
      this.router.navigateByUrl("/course/"+this.idCurso);
    } else {
      for (let matricula of this.matriculaData) {
        if (matricula.id_curso === this.idCurso) { // Check for matching course
          matricula.comp_curso = 1; // Update comp_curso directly
          this.matriculaService.update(matricula.id, matricula).subscribe(data => {
            this.router.navigateByUrl("/complete-course/"+this.idCurso);
          }, error => {
            console.error("Error updating enrollment:", error); // Handle update error
          });
          break; // Exit loop after updating the matching enrollment
        }
      }
    }
  }

}
