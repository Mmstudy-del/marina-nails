# Marina Nails - Cartão Fidelidade Digital 💅

Um sistema web completo de cartão fidelidade para salão de manicure, desenvolvido com **Next.js** e **Firebase**. O aplicativo oferece autenticação segura para a administradora, gerenciamento de clientes e um sistema de recompensas com desconto progressivo.

## ✨ Funcionalidades

- **🔐 Autenticação Segura**: Login exclusivo para administradora do salão
- **👥 Gerenciamento de Clientes**: Cadastro e visualização de todos os clientes
- **💳 Cartão Fidelidade Digital**: 5 manutenções = 50% de desconto na 6ª
- **🔗 Links Exclusivos**: Cada cliente recebe um link único para acessar seu cartão
- **📊 Dashboard Admin**: Interface intuitiva para adicionar manutenções
- **📱 Responsivo**: Design adaptado para celular, tablet e desktop
- **🎨 Design Elegante**: Tema rosa, rosa claro e preto

## 🚀 Tecnologias

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Firebase Firestore, Firebase Authentication
- **Deployment**: Vercel
- **Autenticação**: Firebase Auth
- **Banco de Dados**: Cloud Firestore

## 📋 Requisitos

- Node.js 16+
- npm ou yarn
- Conta Firebase (gratuita)
- Conta Vercel (para deployment)

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/marina-nails.git
cd marina-nails
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Habilite: Authentication (Email/Password) e Firestore Database
4. Copie suas credenciais

### 4. Configure variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=seu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
NEXT_PUBLIC_ADMIN_EMAIL=admin@marinanails.com
```

### 5. Crie o usuário administrador no Firebase

1. No Firebase Console, acesse Authentication
2. Crie um novo usuário com o email definido em `NEXT_PUBLIC_ADMIN_EMAIL`
3. Defina uma senha segura

### 6. Configure Firestore

No Firebase Console, acesse Firestore Database e crie a coleção `clients` com a seguinte estrutura:

```
clients/
├── clientId (string)
├── name (string)
├── phone (string)
├── email (string)
├── maintenanceCount (number)
├── createdAt (timestamp)
└── updatedAt (timestamp)
```

## 🏃 Executar Localmente

```bash
npm run dev
```

Acesse em `http://localhost:3000`

## 📱 Como Usar

### Para a Administradora

1. Acesse `/login` com seu email e senha
2. No dashboard:
   - **Adicionar Cliente**: Preencha nome, telefone e email
   - **Adicionar Manutenção**: Clique em "+Manutenção" para registrar uma manutenção
   - **Ver Cartão do Cliente**: Clique em "Ver Cartão" para visualizar o cartão

### Para os Clientes

1. Receba um link único do tipo: `https://seu-dominio.com/card/[clientId]`
2. Acesse o link para visualizar seu cartão fidelidade
3. Veja seu progresso em tempo real
4. Ao completar 5 manutenções, ganhe 50% de desconto na 6ª!

## 🎨 Personalização de Cores

As cores podem ser customizadas em `tailwind.config.js`:

```javascript
colors: {
  'marina-dark': '#000000',      // Preto
  'marina-pink': '#FF69B4',       // Rosa
  'marina-light': '#FFB6D9',      // Rosa Claro
  'marina-pale': '#FFF0F5',       // Rosa Muito Claro
}
```

## 🚀 Deploy na Vercel

### 1. Prepare o repositório

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Conecte à Vercel

1. Acesse [Vercel Dashboard](https://vercel.com)
2. Clique em "New Project"
3. Selecione o repositório `marina-nails`
4. Configure as variáveis de ambiente

### 3. Configure Environment Variables no Vercel

Na página do projeto, vá para Settings → Environment Variables e adicione:

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_ADMIN_EMAIL
```

### 4. Deploy

Clique em "Deploy" e aguarde o deployment ser concluído!

## 📂 Estrutura do Projeto

```
marina-nails/
├── app/
│   ├── layout.js              # Layout raiz
│   ├── page.js                # Home
│   ├── login/
│   │   └── page.js            # Página de login
│   ├── admin/
│   │   └── page.js            # Dashboard admin
│   ├── card/
│   │   └── [clientId]/
│   │       └── page.js        # Cartão cliente
│   └── globals.css            # Estilos globais
├── components/
│   ├── Header.js              # Componente header
│   ├── LoyaltyCard.js         # Cartão fidelidade
│   ├── ClientForm.js          # Formulário novo cliente
│   └── ClientsList.js         # Lista de clientes
├── lib/
│   ├── firebase.js            # Configuração Firebase
│   └── utils.js               # Funções utilitárias
├── public/                    # Arquivos estáticos
├── .env.local.example         # Exemplo de variáveis
├── package.json               # Dependências
├── tailwind.config.js         # Configuração Tailwind
└── README.md                  # Este arquivo
```

## 🔒 Segurança

- ✅ Autenticação com Firebase Auth
- ✅ Dados protegidos no Firestore
- ✅ Links únicos por cliente
- ✅ Validação de entrada
- ✅ Proteção contra acesso não autorizado

## 🐛 Troubleshooting

### "Firebase not initialized"
- Verifique se `.env.local` está preenchido corretamente
- Reinicie o servidor: `npm run dev`

### "Client not found"
- Verifique se o `clientId` está correto
- Certifique-se de que o cliente foi criado com sucesso

### "Permission denied" no Firestore
- Verifique as regras de segurança do Firestore:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /clients/{document=**} {
      allow read, write: if true;
    }
  }
}
```

## 📧 Suporte

Para dúvidas ou problemas, entre em contato ou abra uma issue no GitHub.

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

**Desenvolvido com ❤️ para Marina Nails**
