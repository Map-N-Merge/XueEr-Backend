
import { z } from 'zod';

export const route = (courseId: string) => `/course/${courseId}`;

export const CourseSchema = z.object({
	uuid: z.uuid().describe('Unique identifier for the course'),
	course_classroom: z.string().min(0).max(16).describe('Classroom location'), // can be empty "" string
	course_year: z.number().describe('Academic year'),
	course_semester: z.number().describe('Semester'),
	course_credit: z.number().describe('Course credit'),
	course_number: z.string().min(1).max(16).describe('Course number').optional(),
	course_name_zh: z.string().min(1).max(32).describe('Course name in Chinese').optional(),
	course_name_en: z.string().min(1).max(128).describe('Course name in English').optional(),
	course_provider: z.array(z.string().min(1).max(64)).describe('Course provider').optional(),
	course_department: z.string().min(1).max(32).describe('Course department'),
	course_time: z.array(
		z.object({
			start: z.string().regex(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)-([01]\d|2[0-3]):([0-5]\d)$/).describe('Start time in format <Weekday>-<hour>:<minute> ex: Mon-09:00'),
			end: z.string().regex(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)-([01]\d|2[0-3]):([0-5]\d)$/).describe('End time in format <Weekday>-<hour>:<minute> ex: Mon-10:00')
		})
	).describe('Course time').default([]), // [] is also valid
	update_at: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?([+-]\d{2}:\d{2}|Z)$/).describe('Last update time in ISO 8601 format'),
	emi: z.boolean().describe('Whether the course is EMI (English as Medium of Instruction)').default(false),
	course_category: z.enum(["Compulsory", "Elective", "GeneralEducation", "PE", "MilitaryTraining", "TeacherEducation", "Other"]).describe('Course category').default("Other"),
	course_student_count: z.number().describe('Number of students enrolled'),
	url: z.url().min(1).max(2048).describe('Course URL').optional(),
	others: z.string().min(1).max(1024).describe('Other information').optional(),
	exist: z.boolean().describe('Whether the course still exists').default(true)
});

export type Course = z.infer<typeof CourseSchema>;