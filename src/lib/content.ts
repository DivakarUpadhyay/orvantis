export const industryGroups = ["Manufacturing & Industrial", "Energy & Resources", "Health, Logistics & Commerce"] as const;

export type Industry = {
  slug: string;
  group: (typeof industryGroups)[number];
  title: string;
  icon: string;
  challenge: string;
  solutions: string[];
};

export const industries: Industry[] = [
  {
    slug: "discrete-manufacturing",
    group: industryGroups[0],
    title: "Discrete Manufacturing",
    icon: "Factory",
    challenge: "Paper travellers, disconnected machines and late visibility into scrap and downtime.",
    solutions: ["MES and digital work instructions", "OEE and downtime tracking", "Machine connectivity"],
  },
  {
    slug: "electronics-semiconductors",
    group: industryGroups[0],
    title: "Electronics & Semiconductors",
    icon: "CircuitBoard",
    challenge: "High-mix production, strict traceability and equipment that speaks SECS/GEM.",
    solutions: ["SECS/GEM equipment integration", "AOI and machine vision", "Serial-level genealogy"],
  },
  {
    slug: "automotive-ev",
    group: industryGroups[0],
    title: "Automotive & EV",
    icon: "Car",
    challenge: "IATF 16949 compliance, battery data and connected-vehicle software.",
    solutions: ["Traceability for IATF 16949", "BMS firmware and CAN tooling", "EV charger connectivity (OCPP)"],
  },
  {
    slug: "process-industries",
    group: industryGroups[0],
    title: "Process Industries",
    icon: "FlaskConical",
    challenge: "Batch records, recipe control and process data trapped in historians.",
    solutions: ["Batch and recipe management", "Historian and SCADA integration", "Process analytics"],
  },
  {
    slug: "energy-utilities",
    group: industryGroups[1],
    title: "Energy & Utilities",
    icon: "Zap",
    challenge: "Distributed assets across wide areas that need remote monitoring.",
    solutions: ["Smart metering and LoRaWAN", "Solar and battery monitoring", "Grid-edge analytics"],
  },
  {
    slug: "healthcare-medtech",
    group: industryGroups[2],
    title: "Healthcare & MedTech",
    icon: "HeartPulse",
    challenge: "Regulated medical devices and patient data that must stay secure.",
    solutions: ["IEC 62304 device software", "Wearable and BLE devices", "HIPAA-ready cloud apps"],
  },
  {
    slug: "logistics-warehousing",
    group: industryGroups[2],
    title: "Logistics & Warehousing",
    icon: "Warehouse",
    challenge: "Inventory errors, poor asset tracking and manual yard processes.",
    solutions: ["WMS and scanning apps", "GPS / RFID asset tracking", "Cold-chain monitoring"],
  },
  {
    slug: "agriculture",
    group: industryGroups[1],
    title: "Smart Agriculture",
    icon: "Sprout",
    challenge: "Farms and greenhouses spread out, with little connectivity and tight margins.",
    solutions: ["Soil and climate sensors", "Automated irrigation control", "Yield analytics"],
  },
  {
    slug: "retail-ecommerce",
    group: industryGroups[2],
    title: "Retail & E-commerce",
    icon: "ShoppingCart",
    challenge: "Fragmented channels, stock that doesn't match and slow storefronts.",
    solutions: ["Headless commerce", "POS and ERP integration", "Smart shelves and kiosks"],
  },
];

export const processSteps = [
  {
    title: "Discover",
    icon: "Search",
    text: "Workshops with your team, site visits for hardware projects, and a clear scope with risks, estimate and roadmap.",
  },
  {
    title: "Design",
    icon: "PenTool",
    text: "Architecture, UX prototypes, electronics schematics and a validated proof of concept for the riskiest parts.",
  },
  {
    title: "Build",
    icon: "Code2",
    text: "Iterative development with a demo every sprint, automated tests and continuous integration from day one.",
  },
  {
    title: "Integrate",
    icon: "Cable",
    text: "Connect devices, machines and business systems, then test end-to-end on real hardware and data.",
  },
  {
    title: "Deploy",
    icon: "Rocket",
    text: "Pilot roll-out, on-site commissioning, training and a monitored go-live with rollback plans.",
  },
  {
    title: "Support & Grow",
    icon: "LifeBuoy",
    text: "SLA-backed support, OTA updates and a backlog of improvements driven by real usage data.",
  },
];

export const engagementModels = [
  {
    title: "Fixed Scope",
    icon: "ClipboardCheck",
    text: "A defined scope, timeline and price. Best for MVPs, proofs of concept and well-defined projects.",
  },
  {
    title: "Dedicated Team",
    icon: "Users",
    text: "A cross-functional team that works as an extension of yours. Best for long-running products.",
  },
  {
    title: "Time & Materials",
    icon: "Timer",
    text: "Pay for the effort used and change direction freely. Best for evolving requirements and R&D.",
  },
];

// Illustrative scopes of typical projects, presented as examples rather than
// client quotes. Swap in real case studies (with permission) once available.
export const sampleEngagements = [
  {
    title: "Multi-vendor MES roll-out",
    icon: "Factory",
    problem: "A precision-parts plant runs 100+ machines from several vendors on paper travellers.",
    approach: "OPC UA / MTConnect gateways, an ISA-95 MES, digital work instructions and OEE dashboards.",
    goal: "Real-time WIP and OEE, paperless traceability, measurable OEE gains in year one.",
  },
  {
    title: "Connected sensor product",
    icon: "Wifi",
    problem: "A hardware start-up needs firmware, an app and a cloud platform for a battery-powered sensor.",
    approach: "Low-power Zephyr firmware, BLE companion app, OTA updates and a multi-tenant IoT cloud.",
    goal: "Multi-year battery life, certification-ready hardware, fleet updates in one click.",
  },
  {
    title: "Legacy ERP modernisation",
    icon: "RefreshCw",
    problem: "A distributor depends on a 15-year-old desktop ERP that only one person can maintain.",
    approach: "Strangler-pattern migration to modern .NET and a web UI, module by module, with no downtime.",
    goal: "Zero-downtime cut-over, faster month-end close, a stack new hires already know.",
  },
];

export const faqs = [
  {
    q: "Which countries do you work with?",
    a: "We currently serve clients in India and Taiwan. We are headquartered in Vasai, Maharashtra, India; work for Taiwan clients is delivered remotely in your time zone, with on-site visits for commissioning and hardware work.",
  },
  {
    q: "Do you work with both software and hardware in the same project?",
    a: "Yes. That is our specialty. One team covers electronics, firmware, connectivity, cloud and apps, so there are no gaps between vendors.",
  },
  {
    q: "How much does a custom software project cost?",
    a: "Most proofs of concept start from around ₹12 lakh (NT$430,000) and most MVPs fall between ₹35 lakh and ₹1.3 crore (NT$1.25M–4.7M). After a short discovery phase we give you a detailed, fixed estimate in INR or TWD.",
  },
  {
    q: "Can you integrate with the machines and ERP we already have?",
    a: "Usually, yes. We work with OPC UA, Modbus, SECS/GEM, MQTT and vendor SDKs on the shop floor, and with SAP, Dynamics 365, Oracle and custom ERPs.",
  },
  {
    q: "Who owns the source code and designs?",
    a: "You do. All source code, schematics, PCB files and documentation are transferred to you under the contract.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. We are happy to sign your NDA before the first technical conversation.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. We offer SLA-backed maintenance, monitoring, OTA firmware updates and monthly improvement retainers.",
  },
];

export const techStack = [
  "Razorpay",
  "Stripe",
  "WhatsApp API",
  "Shiprocket",
  ".NET",
  "Next.js",
  "React",
  "Node.js",
  "Python",
  "Flutter",
  "Azure",
  "AWS",
  "Kubernetes",
  "SQL Server",
  "PostgreSQL",
  "MQTT",
  "OPC UA",
  "Zephyr RTOS",
  "STM32",
  "ESP32",
  "NVIDIA Jetson",
  "Siemens S7",
  "Ignition",
  "Power BI",
];
