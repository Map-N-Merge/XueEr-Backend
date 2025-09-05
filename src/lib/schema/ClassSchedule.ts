import { z } from 'zod';

export const route = (classScheduleId: string) => `/course/${classScheduleId}`;

export const ClassSchedule = z.object({
	uuid: z.uuid().describe('Unique identifier for the class schedule'),
    name: z.string().min(1).max(64).describe('Name of the class schedule').optional(), // if it is undefined, set in frontend
    year: z.number().describe('Academic year'),
    semester: z.number().describe('Semester'),
    visibility: z.enum(['private', "friendsOnly", "linkOnly", 'public']).describe('Visibility of the class schedule').default('private'),
    courses: z.array(z.uuid()).describe('Array of course UUIDs').default([]),
});

export type ClassSchedule = z.infer<typeof ClassSchedule>;
