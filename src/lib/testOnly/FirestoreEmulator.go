package testOnly

import (
	"XueEr-backend/src/lib/firestoreDB"
	"context"
	"log"
	"os"

	firebase "firebase.google.com/go/v4"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

func InitFirestoreEmulator() {
	config, err := godotenv.Read()
	if err != nil {
		panic("Error loading .env file")
	}
	os.Setenv("FIRESTORE_EMULATOR_HOST", config["FIRESTORE_EMULATOR_HOST"])
	ctx := context.Background()
	log.Println(config["FIREBASE_PROJECT_ID"])
	app, err := firebase.NewApp(ctx, &firebase.Config{
		ProjectID: config["FIREBASE_PROJECT_ID"],
	}, option.WithoutAuthentication())
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	firestoreDB.FirestoreClient, err = app.Firestore(ctx)
	if err != nil {
		log.Fatalf("error initializing Firestore: %v\n", err)
	}
}
