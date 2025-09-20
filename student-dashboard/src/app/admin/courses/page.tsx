"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from "@/components/protected-route";
import { useCourses } from "@/contexts/course-context";
import { useAuth } from "@/contexts/auth-context";
import { 
  BookOpen, 
  Users, 
  Trash2, 
  Plus, 
  Edit,
  UserMinus,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { CourseCreationForm } from "@/components/course-creation-form";

export default function AdminCourseManagement() {
  const { courses, removeStudentFromCourse } = useCourses();
  const { user } = useAuth();
  const [removalStatus, setRemovalStatus] = useState<{[key: string]: string}>({});
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleRemoveStudent = (courseId: string, studentId: string, studentName: string) => {
    removeStudentFromCourse(courseId, studentId);
    setRemovalStatus(prev => ({ 
      ...prev, 
      [`${courseId}-${studentId}`]: `Removed ${studentName} from course` 
    }));
    setTimeout(() => {
      setRemovalStatus(prev => {
        const newStatus = { ...prev };
        delete newStatus[`${courseId}-${studentId}`];
        return newStatus;
      });
    }, 3000);
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
              <p className="text-muted-foreground">
                Manage courses and student enrollments.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button className="gap-2" onClick={() => setShowCreateForm(true)}>
                <Plus className="h-4 w-4" />
                Add New Course
              </Button>
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Courses
              </Button>
            </div>
          </div>

          {/* Removal Status Messages */}
          {Object.entries(removalStatus).map(([key, message]) => (
            <div key={key} className="p-3 rounded-lg border bg-green-50 border-green-200 text-green-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                {message}
              </div>
            </div>
          ))}

          <div className="grid gap-6">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        {course.title}
                      </CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {course.enrolledStudents.length}/{course.maxStudents} students
                      </Badge>
                      <Badge variant="secondary">
                        {course.department}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Course Details */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Course Information</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>Instructor:</strong> {course.instructor}</p>
                        <p><strong>Schedule:</strong> {course.schedule}</p>
                        <p><strong>Room:</strong> {course.room}</p>
                        <p><strong>Credits:</strong> {course.credits}</p>
                      </div>
                    </div>

                    {/* Enrolled Students */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Enrolled Students</h4>
                      {course.enrolledStudents.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No students enrolled</p>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {course.enrolledStudents.map((student) => (
                            <div 
                              key={student.id} 
                              className="flex items-center justify-between p-2 border rounded-lg"
                            >
                              <div className="space-y-1">
                                <p className="text-sm font-medium">{student.name}</p>
                                <p className="text-xs text-muted-foreground">{student.email}</p>
                                <p className="text-xs text-muted-foreground">{student.year}</p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRemoveStudent(course.id, student.id, student.name)}
                                className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <UserMinus className="h-3 w-3" />
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Course Actions */}
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit Course
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete Course
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Capacity: {Math.round((course.enrolledStudents.length / course.maxStudents) * 100)}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Course Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Course Statistics</CardTitle>
              <CardDescription>Overview of course enrollment and capacity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Total Courses</p>
                  <p className="text-2xl font-bold">{courses.length}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Total Enrollments</p>
                  <p className="text-2xl font-bold">
                    {courses.reduce((sum, course) => sum + course.enrolledStudents.length, 0)}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Average Capacity</p>
                  <p className="text-2xl font-bold">
                    {Math.round(
                      courses.reduce((sum, course) => 
                        sum + (course.enrolledStudents.length / course.maxStudents), 0
                      ) / courses.length * 100
                    )}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Creation Form Modal */}
        {showCreateForm && (
          <CourseCreationForm onClose={() => setShowCreateForm(false)} />
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
