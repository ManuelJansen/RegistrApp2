import { Injectable } from '@angular/core';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {
  //Data a guardar 
  scannedData: { IdClase: string; profesor: string; NomClase: string; }[] = [];

  constructor() { }


  //Verifica permisos de Camara

  async checkPermissions() {
    const { camera } = await BarcodeScanner.checkPermissions();
    if (camera !== 'granted') {
      await BarcodeScanner.requestPermissions();
    }
  }

//Funcion extraer datos del QR

  extractData(scannedCode: string): { IdClase: string; profesor: string; NomClase: string } {
    try {
      const parsedData = JSON.parse(scannedCode); // Intenta convertir el string en JSON
      return {
        IdClase: parsedData.IdClase || 'Desconocido',
        profesor: parsedData.profesor || 'Desconocido',
        NomClase: parsedData.NomClase || 'Desconocido',
      };
    } catch (error) {
      console.error('Error al procesar el QR:', error);
      return { IdClase: 'Error', profesor: 'Error', NomClase: 'Error' };
    }
  }


    //Funcion scanear QR 

  async scanQrCode() {
    try {
      await this.checkPermissions();

      //  Oculta la UI antes de abrir la cámara
      document.body.classList.add('barcode-scanner-active');

      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode], // Solo escanea códigos QR
      });

      //  Restaura la UI después de escanear
      document.body.classList.remove('barcode-scanner-active');

      if (barcodes.length > 0) {
        const scannedCode = barcodes[0].rawValue || 'Qr Invalido';
        const extractedData = this.extractData(scannedCode);
        this.saveScannedData(extractedData.IdClase, extractedData.profesor, extractedData.NomClase);
        return extractedData;
      }
      return null;
    } catch (error) {
      console.error('Error escaneando el QR:', error);
      //  Asegura que la UI se restaure en caso de error
      document.body.classList.remove('barcode-scanner-active');
      return null;
    }
  }

  //Funcion guardar data extraida

  saveScannedData(IdClase: string, profesor: string, NomClase: string) {
    const newScan = {
      IdClase: IdClase,
      profesor: profesor,
      NomClase: NomClase,
    };

    this.scannedData.push(newScan);
    console.log('Datos guardados:', this.scannedData);
  }

    //Funcion obtener data scaneada

  getScannedData() {
    return this.scannedData;
  }
}


