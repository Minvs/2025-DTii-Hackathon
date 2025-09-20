"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Student {
  id: string;
  name: string;
  email: string;
  year: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  schedule: string;
  credits: number;
  room: string;
  enrolledStudents: Student[];
  maxStudents: number;
  department: string;
}

interface CourseContextType {
  courses: Course[];
  enrolledCourses: string[];
  addCourse: (course: Omit<Course, 'id' | 'enrolledStudents'>) => void;
  enrollInCourse: (courseId: string) => boolean;
  unenrollFromCourse: (courseId: string) => void;
  removeStudentFromCourse: (courseId: string, studentId: string) => void;
  isLoading: boolean;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Mock data
const mockCourses: Course[] = [
  {
    id: "cs101",
    title: "Computer Science 101",
    description: "Introduction to Programming",
    instructor: "Dr. Smith",
    schedule: "Mon, Wed, Fri 10:00 AM",
    credits: 3,
    room: "Room 201",
    enrolledStudents: [
      { id: "s1", name: "Sarah Johnson", email: "sarah@university.edu", year: "Sophomore" },
      { id: "s2", name: "Mike Chen", email: "mike@university.edu", year: "Junior" },
    ],
    maxStudents: 45,
    department: "Computer Science"
  },
  {
    id: "calc2",
    title: "Calculus II",
    description: "Advanced Calculus",
    instructor: "Prof. Johnson",
    schedule: "Tue, Thu 2:00 PM",
    credits: 4,
    room: "Room 105",
    enrolledStudents: [
      { id: "s3", name: "Emma Davis", email: "emma@university.edu", year: "Sophomore" },
    ],
    maxStudents: 32,
    department: "Mathematics"
  },
  {
    id: "englit",
    title: "English Literature",
    description: "Modern Literature Analysis",
    instructor: "Dr. Williams",
    schedule: "Mon, Wed 1:00 PM",
    credits: 3,
    room: "Room 105",
    enrolledStudents: [],
    maxStudents: 28,
    department: "English"
  },
  {
    id: "physics",
    title: "Physics Lab",
    description: "Laboratory Physics",
    instructor: "Dr. Brown",
    schedule: "Tue, Thu 3:00 PM",
    credits: 1,
    room: "Lab 301",
    enrolledStudents: [
      { id: "s4", name: "Alex Wilson", email: "alex@university.edu", year: "Freshman" },
    ],
    maxStudents: 20,
    department: "Physics"
  }
];

export function CourseProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load enrolled courses from localStorage
    const savedEnrollments = localStorage.getItem("enrolledCourses");
    if (savedEnrollments) {
      setEnrolledCourses(JSON.parse(savedEnrollments));
    }
  }, []);

  const addCourse = (courseData: Omit<Course, 'id' | 'enrolledStudents'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `course_${Date.now()}`,
      enrolledStudents: []
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const enrollInCourse = (courseId: string): boolean => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return false;
    
    if (course.enrolledStudents.length >= course.maxStudents) {
      return false; // Course is full
    }
    
    if (enrolledCourses.includes(courseId)) {
      return false; // Already enrolled
    }

    setEnrolledCourses(prev => {
      const newEnrollments = [...prev, courseId];
      localStorage.setItem("enrolledCourses", JSON.stringify(newEnrollments));
      return newEnrollments;
    });
    return true;
  };

  const unenrollFromCourse = (courseId: string) => {
    setEnrolledCourses(prev => {
      const newEnrollments = prev.filter(id => id !== courseId);
      localStorage.setItem("enrolledCourses", JSON.stringify(newEnrollments));
      return newEnrollments;
    });
  };

  const removeStudentFromCourse = (courseId: string, studentId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          enrolledStudents: course.enrolledStudents.filter(student => student.id !== studentId)
        };
      }
      return course;
    }));
  };

  return (
    <CourseContext.Provider value={{
      courses,
      enrolledCourses,
      addCourse,
      enrollInCourse,
      unenrollFromCourse,
      removeStudentFromCourse,
      isLoading
    }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
}
