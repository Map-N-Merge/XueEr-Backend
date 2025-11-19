package firestoreDB

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go/v4"
	"google.golang.org/api/option"
)

var FirestoreClient *firestore.Client // export this
func InitFirestore(credentialsPath string) {
	ctx := context.Background()
	sa := option.WithCredentialsFile(credentialsPath)
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		log.Fatalln(err)
	}

	FirestoreClient, err = app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
}
