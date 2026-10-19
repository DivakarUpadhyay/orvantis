import {
  Activity, BadgeCheck, Boxes, BrainCircuit, Building2, Cable, Car, CircuitBoard, ClipboardCheck,
  Cloud, Code2, Cpu, Factory, FlaskConical, Gauge, Globe, HeartPulse, Layers, LifeBuoy, Network,
  Palette, PenTool, Plug, RefreshCw, Rocket, ScanEye, Search, Server, ShieldCheck, ShoppingCart,
  Smartphone, Sprout, Timer, Truck, Users, Warehouse, Wifi, Workflow, Wrench, Zap, Sparkles,
  Blocks, Camera, CreditCard, Fingerprint, MapPin, MessageSquareText, PackageCheck, Receipt, ScanFace,
  Bot, BrainCog, ChartLine, FileScan, Forklift, House, Megaphone, MessagesSquare, MousePointerClick,
  ScanSearch, ServerCog, Waypoints, Glasses, Headset, Orbit, Rotate3d, ScanLine, Store,
  Aperture, Gamepad2, PartyPopper, Projector, TabletSmartphone, Ticket, Tv, Video,
  ChartPie, Clapperboard, SearchCheck, Share2, Target,
  Antenna, BellRing, CalendarClock, ClipboardList, Compass, Database, Hammer, Leaf, Lightbulb, PlugZap, ScanBarcode, ShieldAlert,
  Router, RadioTower, Signal, Microscope, Flame, Thermometer, Handshake, GitBranch, Briefcase, Building, Earth, Mail,
  Gift, Download, Cog, GraduationCap, BadgePercent, UserPlus, ShoppingBag, Scale, Undo2, FileText, Package,
  HeartHandshake, Recycle, Laptop,
  type LucideProps,
} from "lucide-react";

// Content files reference icons by name so the data stays serialisable.
const icons = {
  Activity, BadgeCheck, Boxes, BrainCircuit, Building2, Cable, Car, CircuitBoard, ClipboardCheck,
  Cloud, Code2, Cpu, Factory, FlaskConical, Gauge, Globe, HeartPulse, Layers, LifeBuoy, Network,
  Palette, PenTool, Plug, RefreshCw, Rocket, ScanEye, Search, Server, ShieldCheck, ShoppingCart,
  Smartphone, Sprout, Timer, Truck, Users, Warehouse, Wifi, Workflow, Wrench, Zap,
  Blocks, Camera, CreditCard, Fingerprint, MapPin, MessageSquareText, PackageCheck, Receipt, ScanFace,
  Bot, BrainCog, ChartLine, FileScan, Forklift, House, Megaphone, MessagesSquare, MousePointerClick,
  ScanSearch, ServerCog, Waypoints, Glasses, Headset, Orbit, Rotate3d, ScanLine, Store,
  Aperture, Gamepad2, PartyPopper, Projector, TabletSmartphone, Ticket, Tv, Video,
  ChartPie, Clapperboard, SearchCheck, Share2, Target,
  Antenna, BellRing, CalendarClock, ClipboardList, Compass, Database, Hammer, Leaf, Lightbulb, PlugZap, ScanBarcode, ShieldAlert,
  Router, RadioTower, Signal, Microscope, Flame, Thermometer, Handshake, GitBranch, Briefcase, Building, Earth, Mail,
  Gift, Download, Cog, GraduationCap, BadgePercent, UserPlus, ShoppingBag, Scale, Undo2, FileText, Package,
  HeartHandshake, Recycle, Laptop,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = icons[name as keyof typeof icons] ?? Sparkles;
  return <Cmp aria-hidden="true" {...props} />;
}
