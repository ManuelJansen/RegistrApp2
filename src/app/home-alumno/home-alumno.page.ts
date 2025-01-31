import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
 

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
  standalone: false,
})
export class HomeAlumnoPage implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

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
    this.router.navigate(["login"]);
  };

  logOut(){
    this.auth.logOut();
    this.router.navigate(['/login']);
  };

  //QR

  async startScan() {
    try {
      // Escuchar el evento "barcodesScanned"
      BarcodeScanner.addListener('barcodesScanned', (event) => {
        // Verifica si se ha escaneado un código QR
        if (event && event.barcodes && event.barcodes.length > 0) {
          const scannedBarcode = event.barcodes[0]; // Obtiene el primer código escaneado
          console.log('Código QR escaneado:', scannedBarcode.displayValue);
          // Aquí puedes manejar el contenido del código QR
        } else {
          console.log('No se detectó ningún código QR');
        }
      });

      // Comienza el escaneo
      await BarcodeScanner.startScan();
    } catch (error) {
      console.error('Error al escanear:', error);
    }
  }

};
