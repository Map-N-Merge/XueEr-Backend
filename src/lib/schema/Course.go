package schema

import "regexp"

type CourseCategory string

const (
	COMPULSORY       CourseCategory = "Compulsory"
	ELECTIVE         CourseCategory = "Elective"
	GENERAL          CourseCategory = "General"
	PE               CourseCategory = "PE"
	MILITARY         CourseCategory = "Military"
	TEACHEREDUCATION CourseCategory = "TeacherEducation"
	OTHER            CourseCategory = "Other"
)

type CourseTime struct {
	Start string `json:"Start" binding:"required"`
	End   string `json:"End" binding:"required"`
}

type Course struct {
	CourseClassroom    string         `json:"CourseClassroom" binding:"required,min=0,max=16"`
	CourseYear         int            `json:"CourseYear" binding:"required"`
	CourseSemester     int            `json:"CourseSemester" binding:"required"`
	CourseCredit       int            `json:"CourseCredit" binding:"required"`
	CourseNumber       string         `json:"CourseNumber" binding:"omitempty,min=1,max=16"`
	CourseNameZh       string         `json:"CourseNameZh" binding:"omitempty,min=1,max=32"`
	CourseNameEn       string         `json:"CourseNameEn" binding:"omitempty,min=1,max=128"`
	CourseProvider     []string       `json:"CourseProvider" binding:"dive,min=1,max=64"`
	CourseDepartment   []string       `json:"CourseDepartment" binding:"dive,min=1,max=64"`
	CourseTime         []CourseTime   `json:"CourseTime" binding:"dive"`
	Emi                bool           `json:"Emi"`
	CourseCategory     CourseCategory `json:"CourseCategory" binding:"required,oneof=Compulsory Elective General PE Military TeacherEducation Other"`
	CourseStudentCount int            `json:"CourseStudentCount" binding:"required,gte=0"`
	CourseArea         []string       `json:"CourseArea" binding:"dive,min=1,max=64"` // for General Education or maybe can add Elective too
	Url                string         `json:"Url" binding:"omitempty,url"`
	Others             string         `json:"Others" binding:"omitempty,min=1,max=1024"`
	Exist              bool           `json:"Exist"` // bool can't use binding:"required"
}

func CourseTimeRegexCheck(course Course) bool {
	re := regexp.MustCompile(`^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)-([01]\d|2[0-3]):([0-5]\d)$`)
	for _, ct := range course.CourseTime {
		if !re.MatchString(ct.Start) || !re.MatchString(ct.End) {
			return false
		}
	}
	return true
}
