import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';
import { QrScannerService } from '../Servicios/qr-scanner.service';
 

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
  standalone: false,
})
export class HomeAlumnoPage implements OnInit {

  scannedList: { IdClase: string; profesor: string; NomClase: string }[] = [];

  constructor(private router: Router, private auth: AuthService,private qrScannerService: QrScannerService ) {}

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



// Apartado LectorQR

async scanCode() {
  const scannedData = await this.qrScannerService.scanQrCode();
  if (scannedData) {
    this.scannedList = this.qrScannerService.getScannedData();
  }



  //QR

//  async startScan() {
//    try {
//      // Escuchar el evento "barcodesScanned"
//      BarcodeScanner.addListener('barcodesScanned', (event) => {
//        // Verifica si se ha escaneado un código QR
//        if (event && event.barcodes && event.barcodes.length > 0) {
//          const scannedBarcode = event.barcodes[0]; // Obtiene el primer código escaneado
//          console.log('Código QR escaneado:', scannedBarcode.displayValue);
//          // Aquí puedes manejar el contenido del código QR
//        } else {
//          console.log('No se detectó ningún código QR');
//        }
//      });

      // Comienza el escaneo
//      await BarcodeScanner.startScan();
//    } catch (error) {
//      console.error('Error al escanear:', error);
//    }

}
  
};
