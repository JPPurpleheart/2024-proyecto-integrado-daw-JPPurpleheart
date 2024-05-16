import { Component, OnInit } from '@angular/core';
import { APIConnectionsService } from '../../core/services/login/apiconnections.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/core/services/usuarios/usuario.service';
import { AlumnoService } from 'src/app/core/services/usuarios/alumno.service';
import { ProfesorService } from 'src/app/core/services/usuarios/profesor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  form: FormGroup;
  public default_errors_front: any = {
    error_name: 'El nombre de alumno o profesor debe de tener al menos un nombre y un apellido sin hacer uso de números o carácteres de alfabetos distintos del alfabeto español, tíldes, una comilla simple por nombre o un guión por nombre.',
    error_username: 'El nombre de usuario debe tener entre 8 y 20 carácteres, sin _ ni . permitido al principio, no __ o _. o ._ o .. permitidos adentro, solo se permiten carácteres alfanuméricos, no _ o . permitido al final.',
    error_password: 'La contraseña debe de tener entre 8 y 20 carácteres. La contraseña debe de tener al menos un número y un carácter en mayúscula',
    error_password_confirmation: 'Las contraseñas deben coincidir.'
  };
  showUsernameError: boolean = false;
  usernameErrorMessage: string = '';

  constructor(private backend:APIConnectionsService, private fb: FormBuilder, private userService: UsuarioService, private alumnoService: AlumnoService, private profesorService: ProfesorService, private route: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(new RegExp('^[a-zA-ZáéíóúñÁÉÍÓÚÑ]+(\\s[a-zA-ZáéíóúñÁÉÍÓÚÑ]+)+$'))]],
      username: ['', [Validators.required, Validators.pattern(new RegExp('^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-ZñÑ0-9._]+(?<![_.])$'))]],
      password: ['', [Validators.required, Validators.pattern(new RegExp('^(?=.{8,20}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]'))]],
      confirmPassword: ['', Validators.required],
      userType: ['student', Validators.required],
      infoTeacher: [''], // optional field for teacher
      email: ['', Validators.email] // optional field for student
    });
    
    // bind submitForm to the correct context
    this.submitForm = this.submitForm.bind(this);
  }

  ngOnInit(): void {
  }

  submitForm = () => {
    const userType = this?.form?.get('userType')?.value;
    const name = this?.form?.get('name')?.value;
    if(this.getErrorMessage('name') == '') {
      const username = this?.form?.get('username')?.value;
      if(this.getErrorMessage('username') == '') {
        const password = this?.form?.get('password')?.value;
        if(this.getErrorMessage('password') == '') {
          const confirmPassword = this?.form?.get('confirmPassword')?.value;
          if (password != confirmPassword && this.getErrorMessage('confirmPassword') != '') {
            alert("Las contraseñas deben coincidir.");
          } else {
            this.userService.findUserIdByUsername(username).subscribe((user: any) => {
              if(!(user.id > 0)) {
                let userId;
                let userForm = {
                  name: name,
                  username: username,
                  password: password,
                  password_confirmation: confirmPassword
                };
                // submit form data
                this.backend.signup(userForm).subscribe(
                  data => {
                    console.log(data);
                    this.userService.findUserIdByUsername(username).subscribe((newUser: any) => {
                      userId = newUser.id;
                      if (userType === 'teacher') {
                        const infoTeacher = this?.form?.get('infoTeacher')?.value;
                        // do something with infoTeacher
                        let profesorForm = {
                          id: userId,
                          info_profesor: infoTeacher
                        };
                        this.profesorService.store(profesorForm).subscribe(
                          data => {
                            console.log(data);
                            this.route.navigateByUrl('/login');
                          }
                        );
                      } else if (userType === 'student') {
                        const studentEmail = this?.form?.get('email')?.value;
                        // do something with email
                        let alumnoForm = {
                          id: userId,
                          email: studentEmail
                        };
                        this.alumnoService.store(alumnoForm).subscribe(
                          data => {
                            console.log(data);
                            this.route.navigateByUrl('/login');
                          }
                        );
                      }
                    });
                  }
                );
              } else {
                alert("¡Este nombre de usuario ya existe! Por favor escribe otro nombre de usuario diferente.");
              }
            });   
          }
        }
      }
    }
  }

  getErrorMessage(controlName: string): string {
    let control = this?.form?.get(controlName);

    if (!control) {
      return '';
    }
  
    switch (controlName) {
      case 'name':
        if (control.hasError('required')) {
          return `El nombre de alumno o profesor es obligatorio.`;
        }
        if (control.hasError('pattern')) {
          return `El nombre de alumno o profesor debe de tener al menos un nombre y un apellido sin hacer uso de números o carácteres de alfabetos distintos del alfabeto español, tíldes, una comilla simple por nombre o un guión por nombre.`;
        }
        return '';

      case 'username':
        if (control.hasError('required')) {
          return `El nombre de usuario es obligatorio.`;
        }
        if (control.hasError('pattern')) {
          return `El nombre de usuario debe tener entre 8 y 20 carácteres, sin _ ni . permitido al principio, no __ o _. o ._ o .. permitidos adentro, solo se permiten carácteres alfanuméricos, no _ o . permitido al final.`;
        }
          return '';

        case 'password':
          if (control.hasError('required')) {
            return `La contraseña es obligatoria.`;
          }
          if (control.hasError('pattern')) {
            return `La contraseña debe de tener entre 8 y 20, al menos un número y un carácter en mayúscula.`;
          }
          return '';

        case 'confirmPassword':
          if (control.hasError('required')) {
            return `Repite la contraseña.`;
          }
            return '';

      default:
        return '';
    }
  }

}