import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private router: Router, private auth: AuthService) {}

  user = {
    usuario: '',
    password: '',
  };

  nombreUsuario = '';

  ngOnInit() {
    this.user = history.state.user;
    this.nombreUsuario = this.user.usuario;
  };

  volverInicio(){
    this.router.navigate(["login"])
  };

  logOut(){
    this.auth.logOut();
    this.router.navigate(['/login']);
  };
  

  verQR(clase: number) {
    if (clase === 1) {
      console.log("Mostrando QR de la Clase 1");
    } else if (clase === 2) {
      console.log("Mostrando QR de la Clase 2");
    }
  }
  
  
};
