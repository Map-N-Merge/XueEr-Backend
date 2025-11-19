package testOnly

import (
	"XueEr-backend/src/lib/firestoreDB"
	"XueEr-backend/src/lib/schema"
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func AddCourseHandler(c *gin.Context) {
	// read APP_ENV from .env file and don't read from system environment variables
	config, err := godotenv.Read()
	if err != nil {
		panic("Error loading .env file")
	}
	env := config["APP_ENV"]
	if env != "test" {
		c.JSON(http.StatusForbidden, gin.H{"error": "This endpoint is only available in test environment"})
		return
	}

	var courses []schema.Course
	if err := c.ShouldBindJSON(&courses); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var failed []int
	var docIDs []string

	for i, course := range courses {
		// validate CourseTime format
		if !schema.CourseTimeRegexCheck(course) {
			failed = append(failed, i)
			continue
		}
		doc, _, err := firestoreDB.FirestoreClient.Collection("courses").Add(context.Background(), course)
		if err != nil {
			failed = append(failed, i)
			fmt.Println("Firestore add error:", err)
			continue
		}
		docIDs = append(docIDs, doc.ID)
	}

	if len(failed) > 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":      "Some courses failed to add",
			"failedRows": failed,
			"docIDs":     docIDs,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "All courses added successfully",
		"docIDs":  docIDs,
	})
}

func EditCourseHandler(c *gin.Context) {
	// read APP_ENV from .env file and don't read from system environment variables
	config, err := godotenv.Read()
	if err != nil {
		panic("Error loading .env file")
	}
	env := config["APP_ENV"]
	if env != "test" {
		c.JSON(http.StatusForbidden, gin.H{"error": "This endpoint is only available in test environment"})
		return
	}
	courseID := c.Param("id") // get course's firebase ID from URL
	if courseID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course ID is required"})
		return
	}

	// read existing course
	doc, err := firestoreDB.FirestoreClient.Collection("courses").Doc(courseID).Get(context.Background())
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}
	var existingCourse schema.Course
	if err := doc.DataTo(&existingCourse); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// get updates from body
	var updates map[string]interface{}
	if err := c.ShouldBindJSON(&updates); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// update existingCourse with updates for validation
	existingData := map[string]interface{}{}
	existingBytes, _ := json.Marshal(existingCourse)
	json.Unmarshal(existingBytes, &existingData)

	for key, value := range updates {
		existingData[key] = value
	}

	// put back to Course struct for validation
	var updatedCourse schema.Course
	updatedBytes, _ := json.Marshal(existingData)
	if err := json.Unmarshal(updatedBytes, &updatedCourse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data format"})
		return
	}

	// check CourseTime format
	if !schema.CourseTimeRegexCheck(updatedCourse) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid CourseTime format"})
		return
	}

	// update Firestore
	_, err = firestoreDB.FirestoreClient.Collection("courses").Doc(courseID).Set(context.Background(), updates, firestore.MergeAll)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update course"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Course updated successfully"})
}
