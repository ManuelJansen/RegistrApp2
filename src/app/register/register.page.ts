import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../Servicios/auth.service';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../Servicios/api.service';
import { RecuperarPassService } from '../Servicios/recuperar-pass.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  constructor(
    private router: Router,
    private animation: AnimationController,
    private auth: AuthService,
    private toast: ToastController,
    private api: ApiService,
    private emailjs: RecuperarPassService
  ) { }

  ngOnInit() { }

  user = {
    usuario: '',
    correo: '',
    password: '',
    tipo: '',
  };

  tipo = '';
  msj = '';

  error = false;
  carga = false;

  //funcion para validar un correo electronico
  validarCorreo(correo: string): boolean {
    const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
  }

  // Función para validar la contraseña
  validarContrasena(contrasena: string): boolean {
    const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
    return regex.test(contrasena);
  }

  registerApi() {
    if (this.user.usuario.length > 0 && this.user.correo.length > 0 &&
      this.user.password.length > 0 && this.user.tipo.length > 0) {

      // Validar el formato del correo
      if (!this.validarCorreo(this.user.correo)) {
        this.generarToast('El formato del correo electrónico no es válido');
        return;
      }

      // Validar la contraseña
      if (!this.validarContrasena(this.user.password)) {
        this.generarToast('La contraseña debe tener una mayúscula, una minúscula y un numero');
        return;
      }

      const nuevoUsuario = {
        username: this.user.usuario,
        correo: this.user.correo,
        pass: this.user.password,
        rol: this.user.tipo
      };

      this.auth.registerApi(this.user.usuario, nuevoUsuario).then((res) => {
        console.log(res);
        if (res) {
          this.generarToast('Registro Exitoso');
          const data = {
            user_name: this.user.usuario,
            user_email: this.user.correo,
          }
          try{
            this.emailjs.sendEmail2(data);
          }catch{
            this.generarToast('Error enviando correo');
          }
          
          console.log(res);
        }
      });

    } else {
      this.generarToast('Completar campos vacíos');
    }
  }


  generarToast(mensaje: string) {
    const toast = this.toast.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
    });
    toast.then((res) => {
      res.present();
    });
  }

  recargarPagina() {
    this.router.navigate(['login']);
    this.user.usuario = '';
    this.user.password = '';
    this.user.tipo = '';
  }
}
