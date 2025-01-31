import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../Servicios/auth.service';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../Servicios/api.service';

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
  ) {}

  ngOnInit() {}

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

 

  registerApi(){
    if (this.user.usuario.length>0 && this.user.correo.length>0 &&
        this.user.password.length>0 &&this.user.tipo.length>0){
          const nuevoUsuario = {
            username: this.user.usuario,
            correo: this.user.correo,
            pass: this.user.password,
            rol: this.user.tipo
          }
          this.auth.registerApi(this.user.usuario, nuevoUsuario).then((res)=>{
            console.log(res)
            if(res){      
              this.generarToast('Registro Exitoso')        
              console.log(res);
            };
          });
    } else {
      this.generarToast('Completar campos vacíos')
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
  }

  recargarPagina() {
    this.router.navigate(['login']);
    this.user.usuario = '';
    this.user.password = '';
    this.user.tipo = '';
  }
}
