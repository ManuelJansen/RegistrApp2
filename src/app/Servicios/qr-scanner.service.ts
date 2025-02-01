import { Injectable } from '@angular/core';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class QrScannerService {
  //Data a guardar 
  

  constructor(private toastController: ToastController) { }


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

        // 🔹 Extraer los datos desde el código QR
        const extractedData = this.extractData(scannedCode);

        // 🔹 Mostrar toast con los datos extraídos
        this.generarToast(
          `📌 ID Clase: ${extractedData.IdClase} | 👨‍🏫 Profesor: ${extractedData.Profesor} | 📚 Clase: ${extractedData.NomClase}`
        );

        return extractedData;
      }
      return null;
    } catch (error) {
      console.error('Error escaneando el QR:', error);
      return null;
    }
  }

  // Función para extraer datos del QR (debe estar en formato JSON)
  extractData(scannedCode: string): { IdClase: string; Profesor: string; NomClase: string } {
    try {
      const parsedData = JSON.parse(scannedCode);
      return {
        IdClase: parsedData.IdClase || 'Desconocido',
        Profesor: parsedData.Profesor || 'Desconocido',
        NomClase: parsedData.NomClase || 'Desconocido',
      };
    } catch (error) {
      console.error('Error al procesar el QR:', error);
      return { IdClase: 'Error', Profesor: 'Error', NomClase: 'Error' };
    }
  }

  // 🔹 Función para mostrar un toast con los datos escaneados
  async generarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      cssClass: 'custom-toast', // Opción para personalizar el estilo del toast
    });

    await toast.present();
  }
 
}
