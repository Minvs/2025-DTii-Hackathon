"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from "@/components/protected-route";
import { useCourses, Course } from "@/contexts/course-context";
import { useAuth } from "@/contexts/auth-context";
import { BookOpen, Clock, Users, Calendar, Plus, X, AlertCircle } from "lucide-react";
import { useState } from "react";
import { CourseCreationForm } from "@/components/course-creation-form";

export default function Courses() {
  const { courses, enrolledCourses, enrollInCourse, unenrollFromCourse } = useCourses();
  const { user } = useAuth();
  const [enrollmentStatus, setEnrollmentStatus] = useState<{[key: string]: string}>({});
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleEnroll = (courseId: string) => {
    const success = enrollInCourse(courseId);
    if (success) {
      setEnrollmentStatus(prev => ({ ...prev, [courseId]: "Enrolled successfully!" }));
      setTimeout(() => {
        setEnrollmentStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[courseId];
          return newStatus;
        });
      }, 3000);
    } else {
      setEnrollmentStatus(prev => ({ ...prev, [courseId]: "Enrollment failed - course may be full or already enrolled" }));
      setTimeout(() => {
        setEnrollmentStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[courseId];
          return newStatus;
        });
      }, 3000);
    }
  };

  const handleUnenroll = (courseId: string) => {
    unenrollFromCourse(courseId);
    setEnrollmentStatus(prev => ({ ...prev, [courseId]: "Unenrolled successfully!" }));
    setTimeout(() => {
      setEnrollmentStatus(prev => {
        const newStatus = { ...prev };
        delete newStatus[courseId];
        return newStatus;
      });
    }, 3000);
  };

  const isEnrolled = (courseId: string) => enrolledCourses.includes(courseId);
  const isCourseFull = (course: Course) => course.enrolledStudents.length >= course.maxStudents;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
              <p className="text-muted-foreground">
                Browse and enroll in available courses.
              </p>
            </div>
            {user?.isAdmin && (
              <Button className="gap-2" onClick={() => setShowCreateForm(true)}>
                <Plus className="h-4 w-4" />
                Add New Course
              </Button>
            )}
          </div>

          {/* Enrollment Status Messages */}
          {Object.entries(enrollmentStatus).map(([courseId, message]) => (
            <div key={courseId} className={`p-3 rounded-lg border ${
              message.includes("successfully") 
                ? "bg-green-50 border-green-200 text-green-800" 
                : "bg-red-50 border-red-200 text-red-800"
            }`}>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {message}
              </div>
            </div>
          ))}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="relative">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {course.title}
                  </CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {course.schedule}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {course.enrolledStudents.length}/{course.maxStudents} students
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {course.credits} credits
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Instructor: {course.instructor}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Room: {course.room}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Department: {course.department}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    {isEnrolled(course.id) ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Enrolled</Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUnenroll(course.id)}
                          className="gap-1"
                        >
                          <X className="h-3 w-3" />
                          Unenroll
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleEnroll(course.id)}
                        disabled={isCourseFull(course)}
                        className="gap-1"
                      >
                        <Plus className="h-3 w-3" />
                        {isCourseFull(course) ? "Course Full" : "Enroll"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Course Creation Form Modal */}
        {showCreateForm && (
          <CourseCreationForm onClose={() => setShowCreateForm(false)} />
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
