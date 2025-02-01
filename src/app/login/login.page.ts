import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../Servicios/auth.service';
import { LocalStorageService } from '../Servicios/local-storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private animation: AnimationController, private auth: AuthService, private toast: ToastController) { }

  ngOnInit() {
    this.animacion();
  };

  user = {
    usuario: '',
    password: ''
  };

  tipo = "";
  msj = "";

  error = false;
  carga = false;

  animacion() {
    const imagen = document.querySelector(
      'ion-card ion-card-content ion-img'
    ) as HTMLElement;
    const animacion = this.animation
      .create()
      .addElement(imagen)
      .duration(6000)
      .iterations(Infinity)
      .keyframes([
        {
          offset: 0,
          transform: 'translateX(0px)',
        },
        {
          offset: 0.5,
          transform: 'translateX(200px)',
        },
        {
          offset: 1,
          transform: 'translateX(0px)',
        },
      ]);
    animacion.play();
  };

  ingresar() {
    if (this.user.usuario.length > 0 && this.user.password.length > 0) {
      this.error = false;
      this.auth.loginApi(this.user.usuario, this.user.password).then((res) => {
        if (res) {
          console.log(res);
          let navigationExtras: NavigationExtras = {
            state: { user: this.user }
          };
          this.carga = true;
          this.tipo = this.auth.getRol();

          setTimeout(() => {
            if (this.tipo == "alum") {
              this.generarToast('Ingreso exitoso')
              this.router.navigate(['/home-alumno'], navigationExtras);
              this.carga = false;
            } else {
              this.generarToast('Ingreso exitoso')
              this.router.navigate(['/home'], navigationExtras);
              this.carga = false;
            }
          }, 3000);
        } else {
          this.error = true;
          this.generarToast('Credenciales Erróneas')
        };
      });
    } else {
      this.error = true;
      this.generarToast('Credenciales no pueden estar vacías')
      
    };
  };

  generarToast(mensaje: string) {
    const toast = this.toast.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
    });
    toast.then((res) => {
      res.present();
    });
  };

  recargarPagina() {
    this.router.navigate(['login']);
    this.user.usuario = "";
    this.user.password = "";
  };
};
