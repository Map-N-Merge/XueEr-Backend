package courses

import (
	"XueEr-backend/src/lib/firestoreDB"
	"XueEr-backend/src/lib/schema"
	"context"
	"fmt"
	"net/http"
	"strings"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"
)

func GetCoursesHandler(c *gin.Context) {
	page := 1
	pageSize := 10
	if p := c.Query("page"); p != "" {
		fmt.Sscanf(p, "%d", &page)
	}
	if ps := c.Query("pageSize"); ps != "" {
		fmt.Sscanf(ps, "%d", &pageSize)
	}
	if page < 1 {
		page = 1
	}
	if pageSize < 1 {
		pageSize = 10
	}
	offset := (page - 1) * pageSize

	sortParam := c.Query("sort") // like "CourseYear:desc"
	query := firestoreDB.FirestoreClient.Collection("courses").Offset(offset).Limit(pageSize)
	if sortParam != "" {
		parts := strings.Split(sortParam, ":")
		fieldName := parts[0]
		direction := firestore.Asc
		if len(parts) > 1 && strings.ToLower(parts[1]) == "desc" {
			direction = firestore.Desc
		}
		query = query.OrderBy(fieldName, direction)
	}

	iter := query.Documents(context.Background())

	type CourseWithID struct {
		schema.Course
		ID string `json:"id"`
	}
	var courses []CourseWithID
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
			return
		}
		var course schema.Course
		if err := doc.DataTo(&course); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
			return
		}
		courses = append(courses, CourseWithID{
			Course: course,
			ID:     doc.Ref.ID,
		})
	}
	c.JSON(http.StatusOK, gin.H{"courses": courses})
}
