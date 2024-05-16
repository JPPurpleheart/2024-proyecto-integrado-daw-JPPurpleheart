[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/fE1utJVw)

Enlace al despliegue de AWS:

Como desplegar la aplicación en local:

  Frontend:
  
    1. cd forntend/
    2. kill -9 $(lsof -t -i:4200)
    3. npm install --save-dev @angular-devkit/build-angular -N
    4. npm cache clean --force
    5. rm -rf node_modules
    6. npm install
    7. npm install ngx-bootstrap bootstrap
    8. ng serve
  
  Backend:
    
    1. cd backend/
    2. kill -9 $(lsof -t -i:8000)
    3. composer install
    4. cp .env.example .env
    5. DB_DATABASE=m28onboard (Línea 13)
    6. DB_PASSWORD=root (Línea 15)
    7. php artisan serve


Usuarios de Prueba de la aplicación

  Profesores de Prueba:
  
    Profesor 1:
    
      username: moisespeinado
      password: IEBCadiz23
    
    Profesor 2:
      
      username: miguelangelprado
      password: HorebSanPablo23
  
  Alumnos de Prueba:
    
    Alumno 1:
      
      username: alumnotestaccount
      password: testAccount123
    
    Alumno 1:
      
      username: jppurpleheart
      password: LogosHope23
