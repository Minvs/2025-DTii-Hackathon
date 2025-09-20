"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  BarChart3, 
  Clock, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  LogOut,
  Settings
} from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleAdminAccess = () => {
    router.push("/admin");
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.username}! Here's what's happening with your studies.
            </p>
          </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                Spring 2025
              </Badge>
              {user?.isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAdminAccess}
                  className="gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Admin Panel
                </Button>
              )}
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

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                +1 from last semester
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                2 due this week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                +2% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Class</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h 15m</div>
              <p className="text-xs text-muted-foreground">
                Computer Science 101
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Upcoming Assignments */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>
                Your assignments due in the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Math Problem Set 5</p>
                  <p className="text-sm text-muted-foreground">Calculus II</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">Due Tomorrow</Badge>
                  <Button size="sm">View</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Research Paper Draft</p>
                  <p className="text-sm text-muted-foreground">English Literature</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Due in 3 days</Badge>
                  <Button size="sm">View</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Lab Report</p>
                  <p className="text-sm text-muted-foreground">Physics Lab</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Due in 5 days</Badge>
                  <Button size="sm">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest academic updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Assignment submitted</p>
                  <p className="text-xs text-muted-foreground">Math Problem Set 4</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Grade updated</p>
                  <p className="text-xs text-muted-foreground">History Essay - 92%</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Assignment reminder</p>
                  <p className="text-xs text-muted-foreground">Physics Lab Report due soon</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks you might want to perform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                View Schedule
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Submit Assignment
              </Button>
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Courses
              </Button>
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Grades
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
