# XueEr Backend

A modern Go backend with Gin framework, Firebase Firestore, and comprehensive API development.

## 🚀 Tech Stack

- **Framework**: Gin (Go web framework)
- **Database**: Firebase Admin SDK (Firestore)
- **Environment**: godotenv
- **Code Quality**: go fmt, go vet
- **Development**: Hot reload with air (optional)
- **Security**: CORS middleware + secure headers

## 📋 Prerequisites

- Go >= 1.19
- Firebase project with service account credentials

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd XueEr/backend
```

2. Install dependencies:

```bash
go mod tidy
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure your Firebase service account credentials in `credentials/`
  1. You can download credentials from the GCP Console.(`IAM & Admin -> Service Accounts -> <Your Service Account> -> Keys -> Add Key -> Create New Key -> JSON`)
  2. Then place the downloaded JSON file in the `credentials/` directory.
  3. Change the path in `.env` if necessary.(default is `credentials/firebase-credentials.json`)
  

## 🔧 Development

Start Firestore emulator (optional):

```bash
firebase emulators:start
```

Start the development server:

```bash
go run src/main.go
```

The server will start on `http://localhost:3000` by default.

## 🧪 Testing

Not implemented yet.

## 🏗️ Build & Production

Build the project:

```bash
go build -o bin/main src/main.go
```

Start the production server:

```bash
./bin/main
```

## 🧪 Code Quality

Format Go code:

```bash
go fmt ./...
```

Check for issues:

```bash
go vet ./...
```

## 📡 API Endpoints


### Courses

- **GET** `/courses` - Get courses with pagination and sorting
  - Query params:
    - `page`: Page number (default: 1)
    - `pageSize`: Items per page (default: 10)
    - `sort`: Sort field (e.g., `CourseYear:desc`, `CourseNameZh:asc`)

### Test Endpoints (Development Only)

These endpoints are commented out in production:

- **POST** `/add-course` - Add multiple courses
- **PATCH** `/edit-course/:id` - Update a course partially

## 🔐 Environment Variables

- `PORT`: Server port (default: 3000)
- `CORS_ORIGINS`: Allowed CORS origins (comma-separated, default: `localhost:3000,localhost:5173`)
- `FIREBASE_CREDENTIALS_PATH`: Path to Firebase service account JSON file (default: `credentials/firebase-credentials.json`)

## 🚀 Firebase Setup

1. Create a Firebase project
2. Generate a service account key
3. Download the JSON file
4. Place it in the `credentials/` directory
5. Update the `FIREBASE_CREDENTIALS_PATH` in `.env` if necessary

### Firestore Usage

Access Firestore in Go:

```go
import "XueEr-backend/src/lib/firestoreDB"

client := firestoreDB.FirestoreClient
```

### Firestore Emulator (Development)

To use Firestore emulator, uncomment the line in `main.go`:

```go
testOnly.InitFirestoreEmulator()
```

## 📝 Project Structure

```
backend/
├── src/
│   ├── main.go                 # Server entry point
│   ├── lib/
│   │   ├── courses/
│   │   │   └── ReadCourses.go  # GET /courses handler
│   │   ├── firestoreDB/
│   │   │   └── InitFirestore.go # Firebase initialization
│   │   ├── schema/
│   │   │   ├── Course.go       # Course data structures
│   │   │   └── ClassSchedule.go
│   │   └── testOnly/
│   │       ├── CourseTestAPI.go # Test API handlers
│   │       └── firestoreEmulator.go
│   └── utils/
│       └── logger.ts
├── credentials/               # Firebase credentials (gitignored)
│   └── firebase-credentials.json # Firebase service account
├── go.mod                      # Go dependencies
├── go.sum                      # Dependency checksums
└── README.md
```

## 🔒 Security Features

- **CORS**: Configurable cross-origin resource sharing
- **Secure Headers**: Frame deny, XSS protection, content type sniffing prevention
- **Input Validation**: Schema validation with regex checks for course times

## 🚀 Deployment

### Local Development

```bash
go run src/main.go
```

### Docker Deployment

```bash
docker build -t xueer-backend .
docker run -p 3000:3000 xueer-backend
```

### Cloud Run Deployment

1. Build and push to Google Container Registry
2. Deploy to Cloud Run with Firebase service account

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

The pre-commit hooks will automatically run Go code quality checks (formatting, vetting, and dependency cleanup).

## 📄 License

This project is licensed under the ISC License.
XueEr Backend Service
