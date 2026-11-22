import {
  BadgeDollarSign,
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  Dumbbell,
  FileClock,
  LayoutDashboard,
  MessageSquareText,
  QrCode,
  ReceiptText,
  Settings,
  Users,
  UserRoundCog,
  type LucideIcon,
} from "lucide-react";
import type { Permission, StaffRole } from "./shared/contract";

export type SectionId =
  | "overview"
  | "members"
  | "pricing"
  | "payments"
  | "gym-qr"
  | "attendance"
  | "trainers"
  | "bookings"
  | "reports"
  | "expenses"
  | "inquiries"
  | "users"
  | "audit-log"
  | "settings";

export type Role = StaffRole;

export type NavigationItem = {
  id: SectionId;
  label: string;
  icon: LucideIcon;
  permission: Permission;
};

export const navigation: NavigationItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, permission: "reports" },
  { id: "members", label: "Members", icon: Users, permission: "members" },
  { id: "pricing", label: "Pricing", icon: BadgeDollarSign, permission: "pricing" },
  { id: "payments", label: "Payments", icon: CreditCard, permission: "payments" },
  { id: "gym-qr", label: "Gym QR", icon: QrCode, permission: "attendance" },
  { id: "attendance", label: "Attendance", icon: ClipboardCheck, permission: "attendance" },
  { id: "trainers", label: "Trainers", icon: Dumbbell, permission: "trainers" },
  { id: "bookings", label: "Bookings", icon: CalendarDays, permission: "trainers" },
  { id: "reports", label: "Reports", icon: BarChart3, permission: "reports" },
  { id: "expenses", label: "Expenses", icon: ReceiptText, permission: "expenses" },
  { id: "inquiries", label: "Inquiries", icon: MessageSquareText, permission: "inquiries" },
  { id: "users", label: "Staff & roles", icon: UserRoundCog, permission: "users" },
  { id: "audit-log", label: "Audit log", icon: FileClock, permission: "auditLog" },
  { id: "settings", label: "Settings", icon: Settings, permission: "settings" },
];

export const weeklyRevenue = [
  { day: "Mon", value: 42, amount: "₱8,400" },
  { day: "Tue", value: 61, amount: "₱12,200" },
  { day: "Wed", value: 48, amount: "₱9,600" },
  { day: "Thu", value: 78, amount: "₱15,600" },
  { day: "Fri", value: 66, amount: "₱13,200" },
  { day: "Sat", value: 94, amount: "₱18,800" },
  { day: "Sun", value: 73, amount: "₱14,600" },
];

export const members = [
  { id: "PLY-0042", name: "Mara Santos", plan: "Monthly", status: "Active", expires: "Today" },
  { id: "PLY-0037", name: "Eli Navarro", plan: "Daily", status: "Active", expires: "Today" },
  { id: "PLY-0031", name: "Jules Reyes", plan: "Monthly", status: "Active", expires: "Nov 25" },
  { id: "PLY-0028", name: "Nico Flores", plan: "Monthly", status: "Expired", expires: "Nov 18" },
  { id: "PLY-0022", name: "Sam Dizon", plan: "Daily", status: "Active", expires: "Today" },
  { id: "PLY-0018", name: "Alex Lim", plan: "Monthly", status: "Suspended", expires: "—" },
];

export const pendingPayments = [
  { id: "PAY-0081", name: "Mara Santos", plan: "Monthly membership", method: "GCash", amount: "₱1,500", time: "8:42 AM" },
  { id: "PAY-0080", name: "Eli Navarro", plan: "Daily session", method: "Maya", amount: "₱180", time: "8:16 AM" },
  { id: "PAY-0079", name: "Jules Reyes", plan: "Monthly membership", method: "Bank", amount: "₱1,500", time: "Yesterday" },
];

export const expiringMembers = [
  { name: "Mara Santos", plan: "Monthly", date: "Today", days: "Today" },
  { name: "Jules Reyes", plan: "Monthly", date: "Nov 23", days: "2 days" },
  { name: "Toni Garcia", plan: "Monthly", date: "Nov 25", days: "4 days" },
];

export const attendanceToday = [
  { time: "9:02 AM", name: "Mara Santos", id: "PLY-0042", access: "Monthly", source: "QR" },
  { time: "8:40 AM", name: "Eli Navarro", id: "PLY-0037", access: "Daily", source: "QR" },
  { time: "8:15 AM", name: "Toni Garcia", id: "PLY-0014", access: "Monthly", source: "Staff" },
  { time: "7:50 AM", name: "Sam Dizon", id: "PLY-0022", access: "Daily", source: "QR" },
];

export const activities = [
  { icon: CreditCard, title: "Payment verified", detail: "Mara Santos · Monthly membership", time: "12 min ago", color: "lime" },
  { icon: ClipboardCheck, title: "Member checked in", detail: "Eli Navarro · QR check-in", time: "24 min ago", color: "blue" },
  { icon: Users, title: "New member registered", detail: "Sam Dizon · Daily session", time: "1 hr ago", color: "violet" },
];
