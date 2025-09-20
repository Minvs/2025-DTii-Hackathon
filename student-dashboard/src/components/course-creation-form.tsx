"use client";

import { useState } from "react";
import { useCourses } from "@/contexts/course-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface CourseFormData {
  title: string;
  description: string;
  instructor: string;
  schedule: string;
  credits: number;
  room: string;
  maxStudents: number;
  department: string;
}

interface CourseCreationFormProps {
  onClose: () => void;
}

export function CourseCreationForm({ onClose }: CourseCreationFormProps) {
  const { addCourse } = useCourses();
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    instructor: "",
    schedule: "",
    credits: 3,
    room: "",
    maxStudents: 30,
    department: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    addCourse(formData);
    setIsSubmitting(false);
    onClose();
  };

  const handleChange = (field: keyof CourseFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Course
              </CardTitle>
              <CardDescription>
                Add a new course to the system
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Course Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  placeholder="e.g., Computer Science 101"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-medium">
                  Department *
                </label>
                <input
                  id="department"
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  placeholder="e.g., Computer Science"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="Course description..."
                rows={3}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="instructor" className="text-sm font-medium">
                  Instructor *
                </label>
                <input
                  id="instructor"
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => handleChange("instructor", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  placeholder="e.g., Dr. Smith"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="schedule" className="text-sm font-medium">
                  Schedule *
                </label>
                <input
                  id="schedule"
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => handleChange("schedule", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  placeholder="e.g., Mon, Wed, Fri 10:00 AM"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label htmlFor="credits" className="text-sm font-medium">
                  Credits *
                </label>
                <input
                  id="credits"
                  type="number"
                  min="1"
                  max="6"
                  value={formData.credits}
                  onChange={(e) => handleChange("credits", parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="room" className="text-sm font-medium">
                  Room *
                </label>
                <input
                  id="room"
                  type="text"
                  value={formData.room}
                  onChange={(e) => handleChange("room", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  placeholder="e.g., Room 201"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="maxStudents" className="text-sm font-medium">
                  Max Students *
                </label>
                <input
                  id="maxStudents"
                  type="number"
                  min="1"
                  max="200"
                  value={formData.maxStudents}
                  onChange={(e) => handleChange("maxStudents", parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Course"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
