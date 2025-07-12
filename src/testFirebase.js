import { rtdb } from './firebaseConfig';
import { ref, set, get } from 'firebase/database';

export const testFirebaseConnection = async () => {
    try {
        console.log('Testando conexão com Firebase Realtime Database...');
        
        const testRef = ref(rtdb, 'test/connection');
        await set(testRef, {
            message: 'Conexão teste',
            timestamp: new Date().toISOString()
        });
        
        const snapshot = await get(testRef);
        if (snapshot.exists()) {
            console.log('Firebase conectado com sucesso!', snapshot.val());
            return true;
        } else {
            console.log('Erro: dados não encontrados');
            return false;
        }
    } catch (error) {
        console.error('Erro ao conectar com Firebase:', error);
        return false;
    }
};
