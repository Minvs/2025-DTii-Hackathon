"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings,
  UserPlus,
  FileText,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  LogOut,
  ArrowLeft
} from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleBackToDashboard = () => {
    router.push("/");
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight title-font">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome, {user?.username}! Manage students, courses, and system administration.
            </p>
          </div>
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="text-sm">
                Admin Access
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToDashboard}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
        </div>

        {/* Admin Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                +23 new this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                12 departments
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                3 urgent
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">
                Uptime this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Recent Student Activity */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Student Activity</CardTitle>
              <CardDescription>
                Monitor student engagement and system usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Submitted assignment: Math Problem Set 5</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    2 minutes ago
                  </div>
                </div>
                <Badge variant="outline">CS101</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Mike Chen</p>
                  <p className="text-sm text-muted-foreground">Accessed course materials</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    5 minutes ago
                  </div>
                </div>
                <Badge variant="outline">Calculus II</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Emma Davis</p>
                  <p className="text-sm text-muted-foreground">Joined study group discussion</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    12 minutes ago
                  </div>
                </div>
                <Badge variant="outline">English Lit</Badge>
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>
                Important notifications and issues
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">High Server Load</p>
                  <p className="text-xs text-muted-foreground">CPU usage at 85%</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Backup Completed</p>
                  <p className="text-xs text-muted-foreground">Daily backup successful</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Peak Usage</p>
                  <p className="text-xs text-muted-foreground">1,200 concurrent users</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Student Management
              </CardTitle>
              <CardDescription>Manage student accounts and enrollments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                Add New Student
              </Button>
              <Button className="w-full" variant="outline">
                Bulk Import Students
              </Button>
              <Button className="w-full" variant="outline">
                View All Students
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Management
              </CardTitle>
              <CardDescription>Create and manage courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline" onClick={() => router.push("/admin/courses")}>
                Manage Courses
              </Button>
              <Button className="w-full" variant="outline">
                Manage Enrollments
              </Button>
              <Button className="w-full" variant="outline">
                Course Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                System Settings
              </CardTitle>
              <CardDescription>Configure system preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                System Configuration
              </Button>
              <Button className="w-full" variant="outline">
                User Permissions
              </Button>
              <Button className="w-full" variant="outline">
                Backup & Restore
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Analytics</CardTitle>
            <CardDescription>
              Key metrics and performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Login Success Rate</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-secondary rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-[98%]"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">98%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Assignment Submissions</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-secondary rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-[87%]"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">87%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Course Completion</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-secondary rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full w-[92%]"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Student Satisfaction</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-secondary rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full w-[94%]"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">94%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
