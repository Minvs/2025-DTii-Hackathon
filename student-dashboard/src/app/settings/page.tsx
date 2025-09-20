import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Bell, Shield, Palette, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Customize your dashboard experience and manage your preferences.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Notifications</label>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Assignment Reminders</label>
                <p className="text-sm text-muted-foreground">Get notified about upcoming deadlines</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Grade Updates</label>
                <p className="text-sm text-muted-foreground">Receive notifications when grades are posted</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme</label>
                <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <p className="text-sm text-muted-foreground">Select your preferred language</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Zone</label>
                <p className="text-sm text-muted-foreground">Set your local time zone</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>Manage your privacy and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Profile Visibility</label>
                <p className="text-sm text-muted-foreground">Control who can see your profile</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Two-Factor Authentication</label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Export</label>
                <p className="text-sm text-muted-foreground">Download your data</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Account
              </CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Change Password</label>
                <p className="text-sm text-muted-foreground">Update your account password</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Account Deactivation</label>
                <p className="text-sm text-muted-foreground">Temporarily disable your account</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Delete Account</label>
                <p className="text-sm text-muted-foreground">Permanently delete your account</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
