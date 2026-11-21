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

export type Role = "Owner" | "Staff";

export type NavigationItem = {
  id: SectionId;
  label: string;
  icon: LucideIcon;
  ownerOnly?: boolean;
};

export const navigation: NavigationItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "members", label: "Members", icon: Users },
  { id: "pricing", label: "Pricing", icon: BadgeDollarSign, ownerOnly: true },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "gym-qr", label: "Gym QR", icon: QrCode },
  { id: "attendance", label: "Attendance", icon: ClipboardCheck },
  { id: "trainers", label: "Trainers", icon: Dumbbell },
  { id: "bookings", label: "Bookings", icon: CalendarDays },
  { id: "reports", label: "Reports", icon: BarChart3, ownerOnly: true },
  { id: "expenses", label: "Expenses", icon: ReceiptText, ownerOnly: true },
  { id: "inquiries", label: "Inquiries", icon: MessageSquareText },
  { id: "users", label: "Users & roles", icon: UserRoundCog, ownerOnly: true },
  { id: "audit-log", label: "Audit log", icon: FileClock },
  { id: "settings", label: "Settings", icon: Settings, ownerOnly: true },
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
