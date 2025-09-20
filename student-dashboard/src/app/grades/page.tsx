"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from "@/components/protected-route";
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";

export default function Grades() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Grades</h1>
          <p className="text-muted-foreground">
            Track your academic performance and progress.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.7</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                +0.2 from last semester
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
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                +2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Earned</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                Out of 120 required
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rank</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15th</div>
              <p className="text-xs text-muted-foreground">
                Out of 200 students
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Course Grades</CardTitle>
              <CardDescription>Your current grades by course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Computer Science 101</p>
                  <p className="text-sm text-muted-foreground">Introduction to Programming</p>
                </div>
                <Badge variant="secondary">A- (90%)</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Calculus II</p>
                  <p className="text-sm text-muted-foreground">Advanced Calculus</p>
                </div>
                <Badge variant="secondary">B+ (87%)</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">English Literature</p>
                  <p className="text-sm text-muted-foreground">Modern Literature Analysis</p>
                </div>
                <Badge variant="secondary">A (92%)</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Physics Lab</p>
                  <p className="text-sm text-muted-foreground">Laboratory Physics</p>
                </div>
                <Badge variant="secondary">B (85%)</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Grade Updates</CardTitle>
              <CardDescription>Your latest grade changes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">History Essay</p>
                  <p className="text-xs text-muted-foreground">World History - 92%</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Math Quiz</p>
                  <p className="text-xs text-muted-foreground">Calculus II - 88%</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <TrendingDown className="h-4 w-4 text-red-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Lab Report</p>
                  <p className="text-xs text-muted-foreground">Physics Lab - 78%</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
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
