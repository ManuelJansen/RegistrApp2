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
  mostrarModal = false;
  qrSeleccionado = '';

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
  


   // 🔹 Mostrar QR en grande cuando se presiona el botón
   mostrarQR(qrPath: string) {
    this.qrSeleccionado = qrPath;
    this.mostrarModal = true;
  }

  // 🔹 Cerrar el modal de QR
  cerrarQR() {
    this.mostrarModal = false;
  }

  
};
