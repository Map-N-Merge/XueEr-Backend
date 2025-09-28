package testOnly

import (
	"XueEr-backend/src/lib/firestoreDB"
	"context"
	"log"
	"os"

	firebase "firebase.google.com/go/v4"
	"google.golang.org/api/option"
)

func InitFirestoreEmulator() {
	os.Setenv("FIRESTORE_EMULATOR_HOST", "localhost:8081")
	ctx := context.Background()
	print(os.Getenv("FIREBASE_PROJECT_ID"))
	app, err := firebase.NewApp(ctx, &firebase.Config{
		ProjectID: os.Getenv("FIREBASE_PROJECT_ID"),
	}, option.WithoutAuthentication())
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	firestoreDB.FirestoreClient, err = app.Firestore(ctx)
	if err != nil {
		log.Fatalf("error initializing Firestore: %v\n", err)
	}
}
