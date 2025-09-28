package main

import (
	"XueEr-backend/src/lib/courses"
	"XueEr-backend/src/lib/firestoreDB"
	"os"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/secure"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	/* for firestore emulator on 8081 port */
	// testOnly.InitFirestoreEmulator()

	firestoreDB.InitFirestore()

	defer firestoreDB.FirestoreClient.Close()

	r := gin.Default()

	corsOrigins := os.Getenv("CORS_ORIGINS")
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
	// r.POST("/add-course", testOnly.AddCourseHandler)
	// r.PATCH("/edit-course/:id", testOnly.EditCourseHandler)

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "3000"
	}
	r.Run(":" + PORT)
}
