import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.infantrysim.garrison',
  appName: '11B Life Sim',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    // This allows Firebase Auth to work within the APK
    allowNavigation: ['your-project-id.firebaseapp.com']
  }
};
