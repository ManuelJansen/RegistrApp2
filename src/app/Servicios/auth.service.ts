import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static isLogged: boolean = false;

  private storage: LocalStorageService = new LocalStorageService();

  private router: Router = new Router();

  private api: ApiService = new ApiService();

  private tipo: string = "";

  private errorMsg: string = "";

  private correo: string = "";

  private toast: ToastController = new ToastController();

  constructor() { }

  cambiarPass(user: string, newPass: string): Promise<boolean>{
    return new Promise((resolve)=>{
      this.api.login(user).subscribe((response: any)=>{
        const usuario = {
          id: response.id,
          username: user,
          correo: response.correo,
          pass: newPass,
          rol: response.rol,
        };
        console.log(usuario);
        this.api.eliminarUsuario(usuario.id).subscribe((response: any)=>{
          console.log(response);
        });
        const usuarioNew = {
          username: user,
          correo: usuario.correo,
          pass: newPass,
          rol: usuario.rol
        }
        this.api.register(usuarioNew).subscribe((response: any)=>{
          console.log(response);
          this.generarToast('Contraseña cambiada exitosamente');
          this.router.navigate(['/login']);
          resolve(true);
        })
      })
    })
  }

  recuperarPassApi(user: string): Promise<boolean>{
    return new Promise((resolve)=>{
      this.api.login(user).subscribe((response: any)=>{
        if(response){
          console.log('usuario existe');
          this.correo = response.correo;
          resolve(true);
        }else{
          console.log('usuario no existe');
          this.generarToast('Usuario no existe')
          resolve(false);
        };
      });
    });
  };

  registerApi(user: string, data: any): Promise<boolean>{
    return new Promise((resolve)=>{
      this.api.listarUsuarios().subscribe((response: any)=>{
        const listarUsuarios = response;
        console.log(listarUsuarios);
        if(listarUsuarios.find((userFind: any)=>userFind.username == user)){
          this.generarToast('Usuario ya existe');
          console.log('Usuario ya existe');
          resolve(false);
        }else{
          console.log('usuario no existe');
          this.api.register(data).subscribe((response: any)=>{
            console.log(response);
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 1500);
            resolve(true);
          });
        };
      });
    });
  };

  loginApi(user: string, pass: string): Promise<boolean>{
    console.log(user);
    return new Promise((resolve)=>{
      this.api.login(user).subscribe((response: any)=>{
        console.log(response)
        if(response){
          if((response.username == user || response.correo == user) && response.pass == pass){
            console.log(response.username)
            this.storage.setItem('conectado', JSON.stringify(response));
            this.tipo = response.rol;
            resolve(true);
          }else{
            resolve(false);
            console.log('Credenciales no válidas');
          }
        }else{
          resolve(false);
          console.log('Credenciales no válidas2');
        };
      });
    });
  };

  loginStorage(user: string, pass: string): boolean{
    const listaUsuarios = this.storage.getItem('users') || [];

    const conectado = listaUsuarios.find((userFind: any) =>
       userFind.username == user && userFind.pass == pass);

    if(conectado){
      if(conectado.tipo == "alum"){
        this.router.navigate(['/home-alumno'])
      }else{
        this.router.navigate(['/home']);
      };
      this.storage.setItem('conectado', conectado);
      return true;
    }else{
      return false;
    };
  };

  registrar(user: string, pass: string, tipo: string){
    const listaUsuarios = this.storage.getItem('users') || [];

    if(listaUsuarios.find(
      (userFind: any) =>
        userFind.username == user
    )){
      return false;
    };

    const nuevoUsuario = {
      id: listaUsuarios.length + 1,
      username: user,
      tipo: tipo,
      pass: pass,
    };

    listaUsuarios.push(nuevoUsuario);

    this.storage.setItem('users', listaUsuarios);
    return true;
  };

  login(user:string, pass:string):boolean{
    if (user=="j.riquelme" && pass=="pass1234"){
      AuthService.isLogged = true;
      return true;
    }else if(user=="m.jansen" && pass=="pass1234"){
      AuthService.isLogged = true;
      return true;
    }else{
      return false;
    };
  };

  isConected():boolean{
    return this.storage.getItem('conectado') !== null;
  };

  logOut(){
    this.storage.removeItem('conectado');
  };

  getRol(){
    return this.tipo;
  };

  getEmail(){
    return this.correo;
  }

  getErrMsg(){
    return this.errorMsg;
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
};
