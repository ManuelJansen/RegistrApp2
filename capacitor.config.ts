import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'RegistrApp',
  webDir: 'www',
  plugins: {
    BarcodeScanner: {
      googleBarcodeScannerModule: true
    }
  }
};

export default config;
