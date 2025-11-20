package main

import (
	"XueEr-backend/src/lib/courses"
	"XueEr-backend/src/lib/firestoreDB"
	"XueEr-backend/src/lib/testOnly"
	"log"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/secure"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// read APP_ENV from .env file and don't read from system environment variables
	config, err := godotenv.Read()
	if err != nil {
		panic("Error loading .env file")
	}
	// configure gin mode based on APP_ENV
	if config["APP_ENV"] == "prd" {
		gin.SetMode(gin.ReleaseMode)
		log.Println("Starting in production mode")
	} else if config["APP_ENV"] == "dev" {
		gin.SetMode(gin.DebugMode)
		log.Println("Starting in development mode")
	} else if config["APP_ENV"] == "test" {
		gin.SetMode(gin.DebugMode)
		log.Println("Starting in test mode")
	} else {
		panic("Unknown APP_ENV: " + config["APP_ENV"] + ". \nMust be one of prd, dev, test.")
	}

	// Firestore initialization
	if config["FIRESTORE_EMULATOR"] == "true" {
		testOnly.InitFirestoreEmulator()
	} else if config["FIRESTORE_EMULATOR"] == "false" {
		if config["FIREBASE_CREDENTIALS_PATH"] == "" {
			panic("FIREBASE_CREDENTIALS_PATH must be set when FIRESTORE_EMULATOR is false")
		}
		firestoreDB.InitFirestore(config["FIREBASE_CREDENTIALS_PATH"])
		defer firestoreDB.FirestoreClient.Close()
	} else {
		panic("FIRESTORE_EMULATOR must be 'true' or 'false'")
	}
	r := gin.Default()

	corsOrigins := config["CORS_ORIGINS"]
	if corsOrigins == "" {
		corsOrigins = "http://localhost:3000,http://localhost:5173"
	}
	origins := strings.Split(corsOrigins, ",")
	for i, origin := range origins {
		origins[i] = strings.TrimSpace(origin)
	}
	r.Use(cors.New(cors.Config{
		AllowOrigins:     origins,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))
	r.Use(secure.New(secure.Config{
		FrameDeny:          true,
		ContentTypeNosniff: true,
		BrowserXssFilter:   true,
	}))

	r.GET("/courses", courses.GetCoursesHandler)

	/* test only api */
	if config["APP_ENV"] == "test" {
		r.POST("/courses", testOnly.AddCourseHandler)
		r.PATCH("/course/:id", testOnly.EditCourseHandler)
	}

	PORT := config["PORT"]
	if PORT == "" {
		PORT = "3000"
	}
	r.Run(":" + PORT)
}
