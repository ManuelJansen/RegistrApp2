import { Component, OnInit } from '@angular/core';
import { RecuperarPassService } from '../Servicios/recuperar-pass.service';
import { AuthService } from '../Servicios/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
  standalone: false,
})
export class RecuperarPassPage implements OnInit {

  constructor(private recupService: RecuperarPassService, private auth: AuthService, private toast: ToastController) { }

  numeroAleatorio: number|null = null;

  numeroIngresado: number|null = null;

  correoEnviado = false;

  carga = false;

  error = false;

  cambiar = false;

  newPass = "";

  generarNumero(): number|null{
    return Math.floor(100000 + Math.random() * 900000);
  };

  ngOnInit() {
  };

  user = {
    usuario: "",
    password: "",
    correo: "",
  };
  
  recuperar(){
    if (this.user.usuario.length>0){
      this.auth.recuperarPassApi(this.user.usuario).then((res)=>{
        if(res == true){
          const correo = this.auth.getEmail();
          this.error = false;
          this.carga = true;
          this.numeroAleatorio = this.generarNumero();
          this.sendEmail(this.user.usuario, this.numeroAleatorio, correo);
        }else{
          console.log('no se puede recuperar')
        }
      })
    }else{
      this.error = true;
    };
  };

  comparar(){
    if(this.numeroIngresado == this.numeroAleatorio){
      this.correoEnviado = false;
      this.cambiar = true;
      this.generarToast('Correo Verificado')
    }else{
      this.generarToast('Los Números no coinciden')
    };
  };

  cambiarPass(){
    this.auth.cambiarPass(this.user.usuario, this.newPass).then((response)=>{
      console.log(response);
    });
  };

  async sendEmail(nombre: string, codigo: number|null, mail: string){
    const formData = {
      user_email: mail,
      to_name: nombre,
      codigo: codigo,
    };
    try{
      const response = await this.recupService.sendEmail(formData);
      this.carga = false;
      this.correoEnviado = true;
      console.log(response);
    }catch (error){
      console.error('Error enviando correo', error);
      this.error = true;
      this.carga = false;
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
};
