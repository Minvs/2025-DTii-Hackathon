"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  isAvailable: boolean;
  psychologistId: string;
  psychologistName: string;
}

export interface Reservation {
  id: string;
  studentId: string;
  studentName: string;
  timeSlotId: string;
  date: string;
  time: string;
  psychologistId: string;
  psychologistName: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  notes?: string;
}

interface ReservationContextType {
  reservations: Reservation[];
  timeSlots: TimeSlot[];
  addReservation: (reservation: Omit<Reservation, 'id' | 'createdAt'>) => void;
  cancelReservation: (reservationId: string) => void;
  getAvailableSlots: (date: string) => TimeSlot[];
  getStudentReservations: (studentId: string) => Reservation[];
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  // Generate time slots for the next 30 days
  useEffect(() => {
    const generateTimeSlots = () => {
      const slots: TimeSlot[] = [];
      const psychologists = [
        { id: 'psych1', name: 'Dr. Sarah Johnson' },
        { id: 'psych2', name: 'Dr. Michael Chen' },
        { id: 'psych3', name: 'Dr. Emily Davis' }
      ];

      // Mock booked slots - more realistic distribution
      const bookedSlots = [
        // January 15th
        '2025-01-15-09:00-psych1',
        '2025-01-15-10:30-psych1',
        '2025-01-15-14:30-psych2',
        '2025-01-15-16:00-psych2',
        '2025-01-15-11:00-psych3',
        '2025-01-15-15:00-psych3',
        
        // January 16th
        '2025-01-16-09:30-psych1',
        '2025-01-16-10:00-psych3',
        '2025-01-16-13:00-psych2',
        '2025-01-16-15:30-psych1',
        '2025-01-16-14:00-psych3',
        
        // January 17th
        '2025-01-17-09:00-psych2',
        '2025-01-17-11:30-psych2',
        '2025-01-17-13:30-psych1',
        '2025-01-17-15:00-psych3',
        
        // January 20th
        '2025-01-20-09:30-psych1',
        '2025-01-20-11:00-psych1',
        '2025-01-20-13:00-psych2',
        '2025-01-20-14:30-psych2',
        '2025-01-20-16:00-psych3',
        
        // January 21st
        '2025-01-21-10:30-psych3',
        '2025-01-21-12:00-psych3',
        '2025-01-21-14:00-psych1',
        '2025-01-21-16:00-psych1',
        '2025-01-21-11:30-psych2',
        
        // January 22nd
        '2025-01-22-09:00-psych2',
        '2025-01-22-11:00-psych2',
        '2025-01-22-13:30-psych3',
        '2025-01-22-14:00-psych3',
        '2025-01-22-15:30-psych1',
        
        // January 23rd
        '2025-01-23-09:00-psych1',
        '2025-01-23-10:30-psych1',
        '2025-01-23-12:00-psych2',
        '2025-01-23-15:30-psych2',
        '2025-01-23-14:00-psych3',
        
        // January 24th
        '2025-01-24-09:30-psych3',
        '2025-01-24-10:00-psych3',
        '2025-01-24-11:30-psych1',
        '2025-01-24-13:30-psych1',
        '2025-01-24-15:00-psych2',
        
        // January 27th
        '2025-01-27-09:00-psych1',
        '2025-01-27-10:30-psych2',
        '2025-01-27-13:00-psych3',
        '2025-01-27-14:30-psych1',
        '2025-01-27-16:00-psych2',
        
        // January 28th
        '2025-01-28-09:30-psych2',
        '2025-01-28-11:00-psych3',
        '2025-01-28-13:30-psych1',
        '2025-01-28-15:00-psych2',
        '2025-01-28-16:30-psych3'
      ];

      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];

        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;

        // Generate slots for each psychologist
        psychologists.forEach(psychologist => {
          // Available times: 9:00 AM to 5:00 PM, 30-minute slots
          const startHour = 9;
          const endHour = 17;
          
          for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
              const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
              const slotId = `${dateStr}-${timeStr}-${psychologist.id}`;
              
              slots.push({
                id: slotId,
                date: dateStr,
                time: timeStr,
                isAvailable: !bookedSlots.includes(slotId),
                psychologistId: psychologist.id,
                psychologistName: psychologist.name
              });
            }
          }
        });
      }

      setTimeSlots(slots);
    };

    generateTimeSlots();
  }, []);

  // Load reservations from localStorage
  useEffect(() => {
    const savedReservations = localStorage.getItem('psychologist-reservations');
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations));
    } else {
      // Add some mock reservations for demonstration
      const mockReservations: Reservation[] = [
        {
          id: 'mock-1',
          studentId: 'student1',
          studentName: 'John Doe',
          timeSlotId: '2025-01-15-09:00-psych1',
          date: '2025-01-15',
          time: '09:00',
          psychologistId: 'psych1',
          psychologistName: 'Dr. Sarah Johnson',
          status: 'confirmed',
          createdAt: '2025-01-10T10:00:00Z',
          notes: 'Feeling anxious about upcoming exams'
        },
        {
          id: 'mock-2',
          studentId: 'student2',
          studentName: 'Jane Smith',
          timeSlotId: '2025-01-15-14:30-psych2',
          date: '2025-01-15',
          time: '14:30',
          psychologistId: 'psych2',
          psychologistName: 'Dr. Michael Chen',
          status: 'confirmed',
          createdAt: '2025-01-11T14:00:00Z',
          notes: 'Need help with study motivation'
        },
        {
          id: 'mock-3',
          studentId: 'student3',
          studentName: 'Mike Wilson',
          timeSlotId: '2025-01-16-10:00-psych3',
          date: '2025-01-16',
          time: '10:00',
          psychologistId: 'psych3',
          psychologistName: 'Dr. Emily Davis',
          status: 'confirmed',
          createdAt: '2025-01-12T09:30:00Z',
          notes: 'Social anxiety concerns'
        },
        {
          id: 'mock-4',
          studentId: 'student4',
          studentName: 'Sarah Brown',
          timeSlotId: '2025-01-16-15:30-psych1',
          date: '2025-01-16',
          time: '15:30',
          psychologistId: 'psych1',
          psychologistName: 'Dr. Sarah Johnson',
          status: 'pending',
          createdAt: '2025-01-13T11:00:00Z',
          notes: 'Stress management techniques'
        },
        {
          id: 'mock-5',
          studentId: 'student5',
          studentName: 'Alex Johnson',
          timeSlotId: '2025-01-17-11:30-psych2',
          date: '2025-01-17',
          time: '11:30',
          psychologistId: 'psych2',
          psychologistName: 'Dr. Michael Chen',
          status: 'confirmed',
          createdAt: '2025-01-14T16:00:00Z',
          notes: 'Academic pressure and burnout'
        }
      ];
      setReservations(mockReservations);
    }
  }, []);

  // Save reservations to localStorage
  useEffect(() => {
    localStorage.setItem('psychologist-reservations', JSON.stringify(reservations));
  }, [reservations]);

  const addReservation = (reservationData: Omit<Reservation, 'id' | 'createdAt'>) => {
    const newReservation: Reservation = {
      ...reservationData,
      id: `res-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };

    setReservations(prev => [...prev, newReservation]);
    
    // Mark the time slot as unavailable
    setTimeSlots(prev => 
      prev.map(slot => 
        slot.id === reservationData.timeSlotId 
          ? { ...slot, isAvailable: false }
          : slot
      )
    );
  };

  const cancelReservation = (reservationId: string) => {
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation) return;

    setReservations(prev => prev.filter(r => r.id !== reservationId));
    
    // Mark the time slot as available again
    setTimeSlots(prev => 
      prev.map(slot => 
        slot.id === reservation.timeSlotId 
          ? { ...slot, isAvailable: true }
          : slot
      )
    );
  };

  const getAvailableSlots = (date: string) => {
    return timeSlots.filter(slot => 
      slot.date === date && slot.isAvailable
    );
  };

  const getStudentReservations = (studentId: string) => {
    return reservations.filter(r => r.studentId === studentId);
  };

  return (
    <ReservationContext.Provider 
      value={{ 
        reservations, 
        timeSlots, 
        addReservation, 
        cancelReservation, 
        getAvailableSlots, 
        getStudentReservations 
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
}
