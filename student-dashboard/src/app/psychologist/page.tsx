"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/contexts/auth-context";
import { useReservation } from "@/contexts/reservation-context";
import { useState } from "react";
import { 
  Heart, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Plus,
  Trash2
} from "lucide-react";

export default function PsychologistPage() {
  const { user } = useAuth();
  const { 
    reservations, 
    getAvailableSlots, 
    getStudentReservations, 
    addReservation, 
    cancelReservation 
  } = useReservation();
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedPsychologist, setSelectedPsychologist] = useState<string>('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingNotes, setBookingNotes] = useState('');

  const studentReservations = getStudentReservations(user?.id || '');
  
  // Add some mock reservations for the current user if they don't have any
  const mockUserReservations = user?.id ? [
    {
      id: 'user-mock-1',
      studentId: user.id,
      studentName: user.username,
      timeSlotId: '2025-01-18-10:00-psych1',
      date: '2025-01-18',
      time: '10:00',
      psychologistId: 'psych1',
      psychologistName: 'Dr. Sarah Johnson',
      status: 'confirmed' as const,
      createdAt: '2025-01-15T10:00:00Z',
      notes: 'Feeling overwhelmed with coursework'
    },
    {
      id: 'user-mock-2',
      studentId: user.id,
      studentName: user.username,
      timeSlotId: '2025-01-25-14:30-psych2',
      date: '2025-01-25',
      time: '14:30',
      psychologistId: 'psych2',
      psychologistName: 'Dr. Michael Chen',
      status: 'confirmed' as const,
      createdAt: '2025-01-16T14:00:00Z',
      notes: 'Need help with time management'
    }
  ] : [];

  const allUserReservations = [...studentReservations, ...mockUserReservations];
  const availableSlots = getAvailableSlots(selectedDate);
  const filteredSlots = selectedPsychologist 
    ? availableSlots.filter(slot => slot.psychologistId === selectedPsychologist)
    : availableSlots;

  const psychologists = [
    { id: 'psych1', name: 'Dr. Sarah Johnson', specialty: 'Anxiety & Stress Management' },
    { id: 'psych2', name: 'Dr. Michael Chen', specialty: 'Academic Performance & Motivation' },
    { id: 'psych3', name: 'Dr. Emily Davis', specialty: 'Relationship & Social Skills' }
  ];

  const handleBookSlot = (slot: any) => {
    if (!user) return;

    addReservation({
      studentId: user.id,
      studentName: user.username,
      timeSlotId: slot.id,
      date: slot.date,
      time: slot.time,
      psychologistId: slot.psychologistId,
      psychologistName: slot.psychologistName,
      status: 'confirmed',
      notes: bookingNotes
    });

    setBookingNotes('');
    setShowBookingForm(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight title-font flex items-center gap-2">
                <Heart className="h-8 w-8 text-red-500" />
                Psychologist Support
              </h1>
              <p className="text-muted-foreground">
                Book a 30-minute session with our mental health professionals
              </p>
            </div>
            <Button 
              onClick={() => setShowBookingForm(!showBookingForm)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Book Session
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{allUserReservations.length}</div>
                <p className="text-xs text-muted-foreground">
                  All time bookings
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {allUserReservations.filter(r => 
                    new Date(r.date) >= new Date() && r.status === 'confirmed'
                  ).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Confirmed appointments
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {getAvailableSlots(new Date().toISOString().split('T')[0]).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  30-minute slots
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          {showBookingForm && (
            <Card>
              <CardHeader>
                <CardTitle>Book a Session</CardTitle>
                <CardDescription>
                  Select a date and psychologist for your 30-minute session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Select Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Select Psychologist</label>
                    <select
                      value={selectedPsychologist}
                      onChange={(e) => setSelectedPsychologist(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background text-sm"
                    >
                      <option value="">All Psychologists</option>
                      {psychologists.map(psych => (
                        <option key={psych.id} value={psych.id}>
                          {psych.name} - {psych.specialty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Notes (Optional)</label>
                  <textarea
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder="Any specific concerns or topics you'd like to discuss..."
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background text-sm h-20 resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Available Time Slots */}
          {showBookingForm && (
            <Card>
              <CardHeader>
                <CardTitle>Available Time Slots</CardTitle>
                <CardDescription>
                  {formatDate(selectedDate)} - Choose a 30-minute slot
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredSlots.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No available slots for the selected date and psychologist.</p>
                    <p className="text-sm">Try selecting a different date or psychologist.</p>
                  </div>
                ) : (
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {filteredSlots.map(slot => (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer"
                        onClick={() => handleBookSlot(slot)}
                      >
                        <div>
                          <p className="font-medium">{slot.time}</p>
                          <p className="text-sm text-muted-foreground">{slot.psychologistName}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Book
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* My Reservations */}
          <Card>
            <CardHeader>
              <CardTitle>My Reservations</CardTitle>
              <CardDescription>
                Your scheduled and past psychologist sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {allUserReservations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No reservations yet.</p>
                  <p className="text-sm">Book your first session to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {allUserReservations
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map(reservation => (
                    <div
                      key={reservation.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(reservation.status)}`} />
                        <div>
                          <p className="font-medium">{formatDate(reservation.date)} at {reservation.time}</p>
                          <p className="text-sm text-muted-foreground">
                            {reservation.psychologistName}
                          </p>
                          {reservation.notes && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Notes: {reservation.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          reservation.status === 'confirmed' ? 'default' :
                          reservation.status === 'pending' ? 'secondary' : 'destructive'
                        }>
                          {reservation.status}
                        </Badge>
                        {reservation.status === 'confirmed' && new Date(reservation.date) >= new Date() && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => cancelReservation(reservation.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Psychologist Information */}
          <Card>
            <CardHeader>
              <CardTitle>Our Mental Health Team</CardTitle>
              <CardDescription>
                Meet our licensed psychologists who are here to support you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {psychologists.map(psych => (
                  <div key={psych.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{psych.name}</p>
                        <p className="text-sm text-muted-foreground">{psych.specialty}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Licensed psychologist with expertise in student mental health and academic support.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
