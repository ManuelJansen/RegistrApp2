import { Injectable } from '@angular/core';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { ToastController } from '@ionic/angular';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class QrScannerService {
  scannedLinks: string[] = []; // Almacenar los enlaces escaneados

  constructor() {}

  private toastController: ToastController = new ToastController();

  private api: ApiService = new ApiService();

  private auth: AuthService = new AuthService();

  private link = "";

  async checkPermissions() {
    const { camera } = await BarcodeScanner.checkPermissions();
    if (camera !== 'granted') {
      await BarcodeScanner.requestPermissions();
    }
  }

  async scanQrCode() {
    try {
      await this.checkPermissions();

      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode], // Solo escanea códigos QR
      });

      if (barcodes.length > 0) {
        const scannedCode = barcodes[0].rawValue || 'QR Inválido';

        // 🔹 Almacenar el link escaneado
        this.scannedLinks.push(scannedCode);

        // 🔹 Mostrar toast con el enlace escaneado
        this.link = scannedCode;
        this.api.infoClase(scannedCode).subscribe((response: any)=>{
          this.generarToast(response.NomClase);
          let user = this.auth.getUser();
          this.api.asist(response.IdClase, user).subscribe((response)=>{
            console.log(response);
          })
          console.log(response);
        });
        return scannedCode;
      }
      return null;
    } catch (error) {
      console.error('Error escaneando el QR:', error);
      return null;
    };
  };

  // 🔹 Función para mostrar un toast con el link escaneado
  async generarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      cssClass: 'custom-toast', // Opción para personalizar el estilo del toast
    });

    await toast.present();
  }

  getLink(){
    return this.link;
  }
 
}
