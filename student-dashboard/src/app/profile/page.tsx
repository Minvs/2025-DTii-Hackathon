"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ProtectedRoute } from "@/components/protected-route";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export default function Profile() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and academic profile.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Avatar className="h-12 w-12">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                </Avatar>
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <p className="text-sm text-muted-foreground">John Doe</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Student ID</label>
                <p className="text-sm text-muted-foreground">STU2025001</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Major</label>
                <p className="text-sm text-muted-foreground">Computer Science</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Year</label>
                <p className="text-sm text-muted-foreground">Sophomore</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">john.doe@university.edu</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">123 University Ave, Campus City</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
