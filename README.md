# XueEr Backend

A modern Express.js backend with TypeScript, Firebase, and comprehensive development tooling.

## 🚀 Tech Stack

- **Framework**: Express.js + TypeScript (Strict Mode)
- **Database**: Firebase Admin SDK (Firestore + Realtime Database)
- **Environment**: dotenv + Zod validation
- **Code Quality**: ESLint, Prettier, EditorConfig
- **Git Hooks**: Husky + lint-staged
- **Development**: tsx (watch mode)
- **Logging**: Pino
- **Security**: Helmet + CORS
- **CI/CD**: GitHub Actions (Node 20 + pnpm)

## 📋 Prerequisites

- Node.js >= 20.0.0
- pnpm (recommended package manager)
- Firebase project with service account credentials

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd XueEr-Backend
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure your Firebase service account credentials in `.env`

5. Initialize Git hooks:

```bash
pnpm prepare
```

## 🔧 Development

Start the development server with hot reload:

```bash
pnpm dev
```

The server will start on `http://localhost:3000` by default.

## 🧪 Testing

Run tests with Vitest:

```bash
pnpm test          # Watch mode
pnpm test:run      # Run once
pnpm test:coverage # With coverage
pnpm test:ui       # UI interface
```

See [TESTING.md](TESTING.md) for detailed testing guide.

## 🏗️ Build & Production

Build the project:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## 🧪 Code Quality

Run type checking:

```bash
pnpm typecheck
```

Run linting:

```bash
pnpm lint
pnpm lint:fix  # Auto-fix issues
```

Run formatting:

```bash
pnpm format
pnpm format:check  # Check formatting
```

## 📡 API Endpoints

### Health Check

- **GET** `/health` - Server health status

### Test Endpoint

- **GET** `/api/test` - Test API and Firebase connection

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure:

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production/test)
- `FIREBASE_*`: Firebase service account credentials
- `CORS_ORIGINS`: Allowed CORS origins

## 🚀 Firebase Setup

1. Create a Firebase project
2. Generate a service account key
3. Download the JSON file
4. Extract the credentials to your `.env` file

### Firestore Usage

The project is configured with Firestore by default. Access it via:

```typescript
import { firestore } from './config/firebase';
```

### Realtime Database (Optional)

To enable Realtime Database, uncomment the relevant lines in:

- `src/config/firebase.ts`
- Add database URL to `.env`

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm clean` - Clean build directory
- `pnpm typecheck` - Run TypeScript checks
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm format` - Format with Prettier
- `pnpm format:check` - Check Prettier formatting

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Environment Validation**: Zod schema validation
- **Request Logging**: Structured logging with Pino

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

The pre-commit hooks will automatically run linting and formatting checks.

## 📄 License

This project is licensed under the ISC License.
XueEr Backend Service
