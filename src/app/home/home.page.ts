import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';
import { Capacitor } from '@capacitor/core';

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
  qrSeleccionado: string | null = null;

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
  


  mostrarQR(qrPath: string) {
    const filePath = Capacitor.convertFileSrc(qrPath);
    console.log("Mostrando QR:", filePath); // Verificar el path en la consola
    this.qrSeleccionado = filePath;
    this.mostrarModal = true;
  }

  //  Cerrar el modal de QR y limpiar la imagen seleccionada
  cerrarQR() {
    this.mostrarModal = false;
    this.qrSeleccionado = null; // Ahora es válido
  }

  handleImageError() {
    console.error('Error al cargar la imagen del QR');
    this.qrSeleccionado = null;
  }

  
};
