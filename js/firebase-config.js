// ⚠️ AVISO DE SEGURANÇA
// Este arquivo contém credenciais sensíveis!
// NUNCA commite credenciais reais para o repositório.
//
// Para desenvolvimento:
// 1. Crie um arquivo .env.local com suas credenciais
// 2. Use variáveis de ambiente no código
// 3. Adicione .env.local ao .gitignore
//
// Exemplo de variáveis de ambiente:
// FIREBASE_API_KEY=your_api_key_here
// FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
// etc.

// ============================================
// CONFIGURAÇÃO TEMPORÁRIA (APENAS DEV)
// REMOVER EM PRODUÇÃO
// ============================================

const firebaseConfig = {
  // 🔴 SUBSTITUIR POR VARIÁVEIS DE AMBIENTE EM PRODUÇÃO
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "webstart-agency.firebaseapp.com",
  projectId: "webstart-agency",
  storageBucket: "webstart-agency.firebasestorage.app",
  messagingSenderId: "784392163899",
  appId: "1:784392163899:web:SUA_APP_ID_AQUI"
};

// Importante: Em produção, usar:
// import { initializeApp } from "firebase/app";
// const app = initializeApp(firebaseConfig);
// Onde firebaseConfig vem de: import.meta.env.VITE_FIREBASE_API_KEY

export { firebaseConfig };

/* 
   INSTRUÇÕES PARA PRODUÇÃO:
   
   1. Configure Firebase no Console: https://console.firebase.google.com
   
   2. Crie um arquivo .env.local na raiz do projeto:
      VITE_FIREBASE_API_KEY=sua_api_key
      VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
      VITE_FIREBASE_PROJECT_ID=seu_project_id
      VITE_FIREBASE_STORAGE_BUCKET=seu_bucket.firebasestorage.app
      VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
      VITE_FIREBASE_APP_ID=seu_app_id
   
   3. Adicione ao .gitignore:
      .env.local
   
   4. Use no código:
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        // ...
      };
   
   5. NUNCA faça push de credenciais para repositórios públicos!
*/