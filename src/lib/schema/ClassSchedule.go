package schema

type Visibility string

const (
	PRIVATE     Visibility = "private"
	FRIENDSONLY Visibility = "friendsOnly"
	LINKONLY    Visibility = "linkOnly"
	PUBLIC      Visibility = "public"
)

type ClassSchedule struct {
	Name       string     `json:"Name"`
	Year       int        `json:"Year" binding:"required"`
	Semester   int        `json:"Semester" binding:"required"`
	Visibility Visibility `json:"Visibility" binding:"required,oneof=private friendsOnly linkOnly public"`
	Courses    []string   `json:"Courses" binding:"dive"`
}
