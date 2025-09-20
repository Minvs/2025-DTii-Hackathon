"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ProtectedRoute } from "@/components/protected-route";
import { Users, MessageCircle, Mail } from "lucide-react";

export default function Classmates() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classmates</h1>
          <p className="text-muted-foreground">
            Connect with your fellow students and study groups.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4" />
                  </div>
                </Avatar>
                Sarah Johnson
              </CardTitle>
              <CardDescription>Computer Science 101</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Study partner for CS101</p>
                <div className="flex gap-2">
                  <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    <MessageCircle className="h-3 w-3 inline mr-1" />
                    Message
                  </button>
                  <button className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    <Mail className="h-3 w-3 inline mr-1" />
                    Email
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4" />
                  </div>
                </Avatar>
                Mike Chen
              </CardTitle>
              <CardDescription>Calculus II</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Math study group member</p>
                <div className="flex gap-2">
                  <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    <MessageCircle className="h-3 w-3 inline mr-1" />
                    Message
                  </button>
                  <button className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    <Mail className="h-3 w-3 inline mr-1" />
                    Email
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4" />
                  </div>
                </Avatar>
                Emma Davis
              </CardTitle>
              <CardDescription>English Literature</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Literature discussion group</p>
                <div className="flex gap-2">
                  <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    <MessageCircle className="h-3 w-3 inline mr-1" />
                    Message
                  </button>
                  <button className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    <Mail className="h-3 w-3 inline mr-1" />
                    Email
                  </button>
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
