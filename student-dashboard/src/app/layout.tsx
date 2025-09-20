import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { CourseProvider } from "@/contexts/course-context";
import { ReservationProvider } from "@/contexts/reservation-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buddy Planner",
  description: "A comprehensive dashboard for students to manage their academic journey and mental health support",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} antialiased`}
      >
        <AuthProvider>
          <CourseProvider>
            <ReservationProvider>
              {children}
            </ReservationProvider>
          </CourseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
