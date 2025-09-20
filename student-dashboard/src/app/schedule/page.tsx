import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function Schedule() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
          <p className="text-muted-foreground">
            Your weekly class schedule and important dates.
          </p>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Monday, January 27, 2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Computer Science 101</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      10:00 AM - 11:30 AM
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Room 201
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">In Progress</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">English Literature</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      1:00 PM - 2:30 PM
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Room 105
                    </div>
                  </div>
                </div>
                <Badge variant="outline">Upcoming</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
              <CardDescription>Your schedule for the current week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium">Monday</span>
                  <span className="text-sm text-muted-foreground">2 classes</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium">Tuesday</span>
                  <span className="text-sm text-muted-foreground">1 class</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium">Wednesday</span>
                  <span className="text-sm text-muted-foreground">2 classes</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium">Thursday</span>
                  <span className="text-sm text-muted-foreground">1 class</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium">Friday</span>
                  <span className="text-sm text-muted-foreground">1 class</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
