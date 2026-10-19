export type CategoryId = "software" | "hardware" | "manufacturing" | "integrations" | "automation" | "immersive" | "events";

/** Top-level split so customers never confuse software work with hardware work. */
export type ServiceGroup = "software" | "hardware";

export const serviceGroups: Record<ServiceGroup, { id: ServiceGroup; title: string; short: string; icon: string; blurb: string }> = {
  software: {
    id: "software",
    title: "Software & Digital Services",
    short: "Software",
    icon: "Code2",
    blurb: "Apps, platforms, integrations, automation, AR/VR and digital marketing.",
  },
  hardware: {
    id: "hardware",
    title: "Hardware & Engineering Services",
    short: "Hardware",
    icon: "Cpu",
    blurb: "Electronics, IoT devices, factory systems and event technology on the ground.",
  },
};

export type Service = {
  slug: string;
  title: string;
  category: CategoryId;
  /** Extra categories this service is also listed under. */
  alsoIn?: CategoryId[];
  icon: string;
  summary: string;
  description: string;
  capabilities: string[];
  tech: string[];
  outcomes: string[];
};

export const categories: Record<
  CategoryId,
  { id: CategoryId; group: ServiceGroup; slug: string; title: string; short: string; icon: string; blurb: string; intro: string }
> = {
  software: {
    id: "software",
    group: "software",
    slug: "software-development",
    intro:
      "From customer-facing apps to the systems that run your operations, we design, build and run software that fits your business, with modern architecture, automated testing and cloud-native delivery.",
    title: "Software Development",
    short: "Software",
    icon: "Code2",
    blurb:
      "Web, mobile, cloud and enterprise software designed around your workflows and built to scale, plus the digital marketing that grows it.",
  },
  hardware: {
    id: "hardware",
    group: "hardware",
    slug: "iot-embedded-systems",
    intro:
      "We engineer connected products end to end: electronics and PCB design, low-power firmware, wireless connectivity, edge gateways and the cloud platform that manages your fleet.",
    title: "IoT & Embedded Systems",
    short: "IoT & Embedded",
    icon: "Cpu",
    blurb:
      "Firmware, electronics, connectivity and device clouds that take a product from prototype to fleet.",
  },
  manufacturing: {
    id: "manufacturing",
    group: "hardware",
    slug: "manufacturing-industry-4-0",
    intro:
      "We digitalise factories layer by layer, connecting PLCs and machines, running MES on the floor, predicting failures, inspecting quality with AI and feeding real data to ERP and leadership.",
    title: "Manufacturing & Industry 4.0",
    short: "Manufacturing",
    icon: "Factory",
    blurb:
      "Smart-factory consulting, machine connectivity, MES, quality, maintenance, energy and AI that connect the shop floor to the top floor.",
  },
  integrations: {
    id: "integrations",
    group: "software",
    slug: "third-party-api-integrations",
    intro:
      "We connect your product to the services it depends on: payment gateways, KYC providers, SMS and WhatsApp gateways, courier APIs, cameras, maps, e-invoicing portals and biometric devices, built securely with retries, monitoring and clear error handling.",
    title: "Third-Party & API Integrations",
    short: "Integrations",
    icon: "Blocks",
    blurb:
      "Payments, KYC, SMS, logistics, camera SDKs and more, integrated reliably into your apps and ERP.",
  },
  automation: {
    id: "automation",
    group: "software",
    slug: "automation-services",
    intro:
      "We automate work at every level of the business: software bots for the back office, workflows and AI agents for decisions, document and report automation for finance and operations, and robots, PLCs and building systems in the physical world.",
    title: "Automation",
    short: "Automation",
    icon: "Bot",
    blurb:
      "RPA, workflows, AI agents, documents, reports, robotics, PLC/SCADA and building automation that save hours every day.",
  },
  immersive: {
    id: "immersive",
    group: "software",
    slug: "ar-vr-immersive-technology",
    intro:
      "We build augmented, virtual and mixed reality experiences that solve real business problems: AR work instructions on the shop floor, VR training for risky tasks, 3D product configurators that sell, and virtual showrooms your buyers can visit from anywhere.",
    title: "AR, VR & Immersive Tech",
    short: "AR / VR",
    icon: "Glasses",
    blurb:
      "Augmented, virtual and mixed reality apps, VR training, 3D configurators and virtual showrooms.",
  },
  events: {
    id: "events",
    group: "hardware",
    slug: "event-tech-promotion-rentals",
    intro:
      "We bring technology to your events and promotions: LED walls, interactive kiosks, VR/AR booths, holograms, AI photo booths, registration systems and live streaming, available to rent with setup and crew, or as a complete event managed by us.",
    title: "Event Tech & Promotion Rentals",
    short: "Events",
    icon: "PartyPopper",
    blurb:
      "Rent LED walls, kiosks, VR booths, holograms and photo booths, or let us run the whole event or activation.",
  },
};

export const services: Service[] = [
  // ---------------- Software development ----------------
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    category: "software",
    icon: "Code2",
    summary: "Software built around how your business actually works, not the other way round.",
    description:
      "When off-the-shelf tools force workarounds, we design and build software that fits your processes exactly. A dedicated team takes the product from discovery to production and stays with it after launch.",
    capabilities: [
      "Product discovery and requirements workshops",
      "Solution architecture and technical roadmaps",
      "Full-stack development with clean, tested code",
      "Role-based access, audit trails and reporting",
      "Integration with your existing systems",
      "Documentation and handover to your team",
    ],
    tech: [".NET", "Node.js", "TypeScript", "Python", "Go", "SQL Server", "PostgreSQL"],
    outcomes: [
      "One system of record instead of spreadsheets",
      "Faster processes through automation",
      "Full ownership of your source code and IP",
    ],
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    category: "software",
    icon: "Globe",
    summary: "Fast, secure and accessible web apps, portals and dashboards.",
    description:
      "We build customer portals, internal tools, marketplaces and real-time dashboards with modern frameworks, server rendering and solid security from the first commit.",
    capabilities: [
      "Single-page and server-rendered applications",
      "Customer and partner portals",
      "Real-time dashboards with WebSockets",
      "Progressive Web Apps with offline support",
      "Accessibility (WCAG 2.2) and SEO",
      "Performance budgets and Core Web Vitals tuning",
    ],
    tech: ["Next.js", "React", "Angular", "ASP.NET Core", "Tailwind CSS", "GraphQL"],
    outcomes: ["Page loads under one second", "Higher conversion and engagement", "One codebase for every browser"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "software",
    icon: "Smartphone",
    summary: "Native and cross-platform apps for iOS and Android, including BLE device companions.",
    description:
      "From consumer apps to rugged field-service tools, we build mobile apps that work offline, sync reliably and talk to hardware over Bluetooth, NFC and Wi-Fi.",
    capabilities: [
      "Native iOS (Swift) and Android (Kotlin)",
      "Cross-platform with React Native and Flutter",
      "BLE / NFC companion apps for connected devices",
      "Offline-first sync and conflict handling",
      "Push notifications and in-app messaging",
      "App Store and Google Play release management",
    ],
    tech: ["Swift", "Kotlin", "React Native", "Flutter", ".NET MAUI", "Firebase"],
    outcomes: ["Fast releases on both platforms", "Apps that keep working without signal", "4.5★+ store ratings"],
  },
  {
    slug: "enterprise-software-erp",
    title: "Enterprise Software & ERP",
    category: "software",
    icon: "Building2",
    summary: "ERP, CRM and back-office systems, custom built or extended.",
    description:
      "We build and extend enterprise systems for finance, inventory, procurement, HR and sales, and connect them so data flows without re-keying.",
    capabilities: [
      "Custom ERP and CRM modules",
      "SAP, Dynamics 365 and Odoo extensions",
      "Workflow and approval engines",
      "Multi-company, multi-currency, multi-language",
      "Business intelligence and KPI reporting",
      "Data migration from legacy systems",
    ],
    tech: ["C# / .NET", "Dynamics 365", "SAP BTP", "Odoo", "Power BI", "SQL Server"],
    outcomes: ["A single source of truth", "Shorter month-end close", "Lower licence costs"],
  },
  {
    slug: "saas-product-development",
    title: "SaaS Product Development",
    category: "software",
    icon: "Layers",
    summary: "Multi-tenant SaaS platforms from MVP to scale.",
    description:
      "We help founders and product teams launch SaaS products quickly and then scale them, with tenant isolation, billing, analytics and a clear architecture.",
    capabilities: [
      "MVP scoping and rapid prototyping",
      "Multi-tenant architecture and data isolation",
      "Subscription billing with Stripe",
      "SSO, SAML and OAuth 2.0 / OIDC",
      "Usage analytics and feature flags",
      "Self-service onboarding",
    ],
    tech: ["Next.js", "Node.js", ".NET", "PostgreSQL", "Redis", "Stripe", "Auth0"],
    outcomes: ["MVP in 8–12 weeks", "Ready for enterprise customers", "Predictable recurring revenue"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps Engineering",
    category: "software",
    icon: "Cloud",
    summary: "Cloud architecture, CI/CD, containers and infrastructure as code.",
    description:
      "We design cloud environments that are secure, observable and cost-efficient, and automate how software gets from a commit into production.",
    capabilities: [
      "Cloud migration to AWS, Azure and GCP",
      "Kubernetes and container platforms",
      "CI/CD pipelines with automated quality gates",
      "Infrastructure as code (Terraform, Bicep)",
      "Monitoring, logging and alerting",
      "Cost reviews and FinOps",
    ],
    tech: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    outcomes: ["Daily deployments instead of quarterly", "99.9%+ uptime", "20–40% lower cloud bills"],
  },
  {
    slug: "api-systems-integration",
    title: "API & Systems Integration",
    category: "software",
    icon: "Plug",
    summary: "APIs, middleware and event pipelines that connect your systems.",
    description:
      "We design clean APIs and integration layers that link ERP, CRM, e-commerce, payment, logistics and shop-floor systems reliably and securely.",
    capabilities: [
      "REST, GraphQL and gRPC API design",
      "Event-driven integration with queues and streams",
      "Third-party integrations (payments, shipping, CRM)",
      "API gateways, rate limits and versioning",
      "EDI and B2B data exchange",
      "Integration monitoring and replay",
    ],
    tech: ["OpenAPI", "Kafka", "RabbitMQ", "Azure Service Bus", "MuleSoft", "n8n"],
    outcomes: ["No more manual re-keying", "Real-time data across systems", "Partners onboard in days"],
  },
  {
    slug: "ai-ml-data-engineering",
    title: "AI, ML & Data Engineering",
    category: "software",
    icon: "BrainCircuit",
    summary: "Data platforms, machine learning and LLM features that create measurable value.",
    description:
      "We build data pipelines and warehouses, train and deploy ML models, and add LLM-powered features such as assistants, document extraction and search to your products.",
    capabilities: [
      "Data warehouses and lakehouses",
      "ETL / ELT pipelines and data quality checks",
      "Forecasting, classification and anomaly detection",
      "LLM assistants, RAG and document AI",
      "Computer vision models",
      "MLOps: model deployment and monitoring",
    ],
    tech: ["Python", "PyTorch", "Databricks", "Snowflake", "dbt", "Azure ML", "LLM APIs"],
    outcomes: ["Decisions backed by data", "Hours of manual work automated", "Models that keep improving"],
  },
  {
    slug: "ui-ux-design",
    title: "UI / UX Design",
    category: "software",
    icon: "Palette",
    summary: "Research-led product design and design systems.",
    description:
      "Good software starts with understanding users. We run research, map journeys, prototype quickly and deliver design systems your developers can build from.",
    capabilities: [
      "User research and usability testing",
      "Information architecture and user journeys",
      "Wireframes and interactive prototypes",
      "Design systems and component libraries",
      "HMI design for machines and control panels",
      "Accessibility reviews",
    ],
    tech: ["Figma", "Storybook", "Maze", "Design tokens"],
    outcomes: ["Fewer support tickets", "Faster onboarding", "Consistent UI across products"],
  },
  {
    slug: "qa-test-automation",
    title: "QA & Test Automation",
    category: "software",
    alsoIn: ["automation"],
    icon: "BadgeCheck",
    summary: "Automated testing that lets you release with confidence.",
    description:
      "We set up test strategies and automation for web, mobile, APIs and embedded devices, including hardware-in-the-loop rigs.",
    capabilities: [
      "End-to-end testing with Playwright and Cypress",
      "API and contract testing",
      "Performance and load testing",
      "Hardware-in-the-loop (HIL) testing",
      "Security and penetration testing",
      "Test strategy and QA process setup",
    ],
    tech: ["Playwright", "Cypress", "xUnit", "k6", "Appium", "pytest"],
    outcomes: ["Regressions caught before release", "Shorter release cycles", "Measured, rising coverage"],
  },
  {
    slug: "legacy-modernization",
    title: "Legacy Modernization",
    category: "software",
    icon: "RefreshCw",
    summary: "Move legacy systems to modern stacks without stopping the business.",
    description:
      "We modernise VB6, WinForms, old .NET Framework and monolithic applications step by step, keeping them running while new modules replace old ones.",
    capabilities: [
      "Code and architecture assessment",
      "Strangler-pattern incremental migration",
      ".NET Framework to modern .NET upgrades",
      "Monolith to modular / microservices",
      "Database modernization and migration",
      "Desktop to web migration",
    ],
    tech: [".NET 10", "Azure", "SQL Server", "Docker", "Angular", "React"],
    outcomes: ["No big-bang cut-over risk", "Lower maintenance cost", "Easier hiring for modern stacks"],
  },
  {
    slug: "cybersecurity-devsecops",
    title: "Cybersecurity & DevSecOps",
    category: "software",
    icon: "ShieldCheck",
    summary: "Security built into your software, cloud and connected devices.",
    description:
      "We secure applications and IoT fleets with threat modelling, secure coding, scanning in the pipeline and compliance support.",
    capabilities: [
      "Threat modelling and security reviews",
      "SAST, DAST and dependency scanning in CI",
      "Secure boot and device identity for IoT",
      "Identity and access management",
      "OWASP and IEC 62443 alignment",
      "ISO 27001 and SOC 2 readiness",
    ],
    tech: ["OWASP ZAP", "Snyk", "SonarQube", "Vault", "Entra ID", "TPM / HSM"],
    outcomes: ["Fewer vulnerabilities in production", "Audit-ready evidence", "Customer trust"],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    category: "software",
    icon: "Wrench",
    summary: "SLA-backed support, monitoring and continuous improvement.",
    description:
      "After launch we keep your systems healthy with monitoring, patching, fixes and a steady stream of improvements, all under a clear SLA.",
    capabilities: [
      "24/7 monitoring and incident response",
      "Bug fixing with defined SLAs",
      "Security patching and dependency updates",
      "Performance tuning",
      "Feature enhancements on a monthly retainer",
      "Monthly health reports",
    ],
    tech: ["Grafana", "Prometheus", "Sentry", "Azure Monitor", "PagerDuty"],
    outcomes: ["Predictable support cost", "Less downtime", "A system that keeps getting better"],
  },

  // ---------------- Digital marketing (software category) ----------------
  {
    slug: "seo-local-seo",
    title: "SEO & Local SEO",
    category: "software",
    icon: "SearchCheck",
    summary: "Rank higher on Google for the searches your customers make, locally and globally.",
    description:
      "We improve how your website ranks and converts: technical SEO, keyword strategy, content, local listings and backlinks, measured with clear monthly reports. Ideal for B2B, manufacturing and service businesses.",
    capabilities: [
      "Technical SEO audits and Core Web Vitals fixes",
      "Keyword research and content strategy",
      "Google Business Profile and local SEO",
      "Multilingual and multi-country SEO (hreflang)",
      "B2B and e-commerce product page optimisation",
      "Monthly ranking and traffic reports",
    ],
    tech: ["Google Search Console", "Ahrefs", "Semrush", "Screaming Frog", "Schema.org", "GA4"],
    outcomes: ["More organic leads", "Lower cost per acquisition", "Visibility in new markets"],
  },
  {
    slug: "performance-marketing-ads",
    title: "Performance Marketing (Google & Meta Ads)",
    category: "software",
    icon: "Target",
    summary: "Paid campaigns on Google, Meta, LinkedIn and YouTube that are tracked to revenue.",
    description:
      "We plan, run and optimise paid campaigns with proper conversion tracking, so every rupee and dollar is tied to leads and sales, not just clicks.",
    capabilities: [
      "Google Search, Shopping, Display and YouTube ads",
      "Meta (Facebook / Instagram) and LinkedIn ads",
      "Conversion tracking and server-side tagging",
      "Landing page design and A/B testing",
      "Retargeting and lookalike audiences",
      "Budget pacing and weekly performance reports",
    ],
    tech: ["Google Ads", "Meta Ads Manager", "LinkedIn Campaign Manager", "Google Tag Manager", "GA4", "Looker Studio"],
    outcomes: ["Lower cost per lead", "Clear return on ad spend", "Predictable lead flow"],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    category: "software",
    icon: "Share2",
    summary: "Consistent, on-brand social media that builds trust and brings enquiries.",
    description:
      "We manage your social media presence end to end: content calendar, design, short videos, posting, community management and reporting across LinkedIn, Instagram, Facebook, YouTube and X.",
    capabilities: [
      "Social strategy and content calendar",
      "Post design, reels and short videos",
      "LinkedIn thought leadership for B2B",
      "Community management and replies",
      "Influencer and creator collaborations",
      "Monthly analytics and insights",
    ],
    tech: ["Meta Business Suite", "LinkedIn", "YouTube Studio", "Canva", "Adobe Creative Cloud", "Buffer"],
    outcomes: ["Stronger brand presence", "Higher engagement", "Inbound enquiries from social"],
  },
  {
    slug: "content-video-marketing",
    title: "Content & Video Marketing",
    category: "software",
    icon: "Clapperboard",
    summary: "Case studies, explainer videos, product demos and technical content that sells.",
    description:
      "We create content that explains complex products simply: technical blogs, case studies, brochures, explainer and product videos, 3D animations and webinar recordings.",
    capabilities: [
      "Technical blogs, whitepapers and case studies",
      "Explainer and product demo videos",
      "3D product animations",
      "Brochures, catalogues and pitch decks",
      "Webinar production and repurposing",
      "Translation into Hindi, Marathi and Traditional Chinese",
    ],
    tech: ["Premiere Pro", "After Effects", "Blender", "Figma", "Descript"],
    outcomes: ["Shorter sales cycles", "Content sales teams actually use", "Higher conversion"],
  },
  {
    slug: "web-analytics-cro",
    title: "Web Analytics & Conversion Optimisation",
    category: "software",
    icon: "ChartPie",
    summary: "Know what visitors do on your site and turn more of them into leads and sales.",
    description:
      "We set up reliable analytics and dashboards, then run experiments on pages, forms and checkout flows to lift conversion rates using data, not guesswork.",
    capabilities: [
      "GA4 and Tag Manager setup and audits",
      "Event and funnel tracking",
      "Heatmaps and session recordings",
      "A/B and multivariate testing",
      "Form and checkout optimisation",
      "Marketing dashboards in Looker Studio / Power BI",
    ],
    tech: ["GA4", "Google Tag Manager", "Microsoft Clarity", "Hotjar", "VWO", "Looker Studio"],
    outcomes: ["Higher conversion rates", "Trustworthy numbers", "Decisions backed by data"],
  },

  // ---------------- IoT & embedded ----------------
  {
    slug: "iot-solutions",
    title: "End-to-End IoT Solutions",
    category: "hardware",
    icon: "Wifi",
    summary: "Sensors, connectivity, cloud and apps delivered as one working system.",
    description:
      "We take an IoT product from idea to deployed fleet: choosing sensors and radios, writing firmware, building the cloud backend and the apps people use.",
    capabilities: [
      "IoT solution architecture and proof of concept",
      "Sensor selection and data acquisition",
      "Connectivity: Wi-Fi, BLE, LoRaWAN, NB-IoT, LTE-M, 5G",
      "MQTT / CoAP messaging and protocols",
      "Remote monitoring and control dashboards",
      "Pilot deployments and field trials",
    ],
    tech: ["MQTT", "LoRaWAN", "NB-IoT", "AWS IoT Core", "Azure IoT Hub", "InfluxDB"],
    outcomes: ["Live visibility of remote assets", "New connected revenue streams", "Fewer site visits"],
  },
  {
    slug: "embedded-firmware",
    title: "Embedded Systems & Firmware",
    category: "hardware",
    icon: "Cpu",
    summary: "Reliable firmware for microcontrollers and embedded Linux.",
    description:
      "We write low-level software for MCUs and SoCs: bare-metal and RTOS firmware, drivers, bootloaders and embedded Linux builds, focused on reliability and low power.",
    capabilities: [
      "Bare-metal and RTOS firmware (FreeRTOS, Zephyr)",
      "Embedded Linux with Yocto and Buildroot",
      "Device drivers and board support packages",
      "Bootloaders and secure firmware updates",
      "Low-power design for battery devices",
      "Motor control and DSP",
    ],
    tech: ["C", "C++", "Rust", "STM32", "ESP32", "nRF52", "NXP i.MX", "Zephyr"],
    outcomes: ["Years of battery life", "Stable devices in the field", "Faster time to market"],
  },
  {
    slug: "pcb-hardware-design",
    title: "Electronics & PCB Design",
    category: "hardware",
    icon: "CircuitBoard",
    summary: "Schematics, PCB layout and prototypes ready for production.",
    description:
      "Our hardware engineers design electronics from schematic to manufacturable PCB, build prototypes and prepare your product for certification and volume production.",
    capabilities: [
      "Schematic capture and component selection",
      "Multi-layer and high-speed PCB layout",
      "RF and antenna design",
      "Prototyping and board bring-up",
      "Design for manufacturing (DFM) and testing (DFT)",
      "CE / FCC / NCC pre-compliance support",
    ],
    tech: ["Altium", "KiCad", "SPICE", "Oscilloscope & logic analysis", "3D enclosure CAD"],
    outcomes: ["Boards that pass certification", "Lower BOM cost", "A smooth move to mass production"],
  },
  {
    slug: "edge-computing",
    title: "Edge Computing & Gateways",
    category: "hardware",
    alsoIn: ["manufacturing"],
    icon: "Server",
    summary: "Process data close to the machine for speed, privacy and resilience.",
    description:
      "We build industrial gateways and edge applications that collect, filter and analyse data on site, run AI models locally and keep working when the internet drops.",
    capabilities: [
      "Industrial gateway software",
      "Store-and-forward when offline",
      "Edge AI on NVIDIA Jetson and Coral",
      "Containerised edge apps (Docker, K3s)",
      "Protocol translation: Modbus, OPC UA, MQTT",
      "Remote fleet management",
    ],
    tech: ["NVIDIA Jetson", "Raspberry Pi CM", "K3s", "Node-RED", "Azure IoT Edge", "AWS Greengrass"],
    outcomes: ["Millisecond response times", "Up to 90% less bandwidth", "Operations continue offline"],
  },
  {
    slug: "iot-cloud-platforms",
    title: "IoT Cloud & Device Management",
    category: "hardware",
    icon: "Network",
    summary: "Secure provisioning, OTA updates and telemetry at scale.",
    description:
      "We build the backend that manages thousands of devices: provisioning, identity, over-the-air updates, telemetry storage, alerts and APIs for your apps.",
    capabilities: [
      "Zero-touch device provisioning",
      "Over-the-air (OTA) firmware updates",
      "Time-series telemetry storage",
      "Rules engines and alerting",
      "Digital device twins / shadows",
      "Multi-tenant fleet dashboards",
    ],
    tech: ["AWS IoT", "Azure IoT Hub", "EMQX", "TimescaleDB", "Grafana", "Kafka"],
    outcomes: ["Update 10,000 devices in one click", "Problems detected before customers notice", "A secure fleet"],
  },
  {
    slug: "hardware-software-integration",
    title: "Hardware–Software Integration",
    category: "hardware",
    alsoIn: ["manufacturing"],
    icon: "Cable",
    summary: "Make machines, instruments and devices talk to your software.",
    description:
      "We connect scanners, scales, PLCs, lab instruments, printers, cameras and custom devices to your business software through drivers, SDKs and integration services.",
    capabilities: [
      "Serial, USB, CAN and Ethernet communication",
      "Vendor SDK and driver integration",
      "Barcode, RFID and label printer integration",
      "Instrument and test-bench automation",
      "Desktop and kiosk applications for devices",
      "Protocol reverse-engineering and documentation",
    ],
    tech: ["CAN bus", "RS-232 / RS-485", "USB HID", "Modbus", "SECS/GEM", "C# / .NET"],
    outcomes: ["No manual data entry from devices", "Fewer errors", "Equipment data in your systems"],
  },

  // ---------------- Manufacturing ----------------
  {
    slug: "manufacturing-execution-system",
    title: "Manufacturing Execution Systems (MES)",
    category: "manufacturing",
    icon: "Factory",
    summary: "Track every work order, operator, machine and part in real time.",
    description:
      "We build and implement MES that run production on the floor: work orders, routing, operator instructions, material tracking, quality checks and genealogy, connected to ERP and machines.",
    capabilities: [
      "Work order dispatching and scheduling",
      "Digital work instructions for operators",
      "Material and WIP tracking",
      "In-process quality checks and SPC",
      "Lot and serial genealogy",
      "ISA-95 aligned architecture",
    ],
    tech: [".NET", "SQL Server", "OPC UA", "MQTT", "Next.js", "ISA-95"],
    outcomes: ["Paperless production", "Real-time WIP visibility", "Full traceability for audits"],
  },
  {
    slug: "industrial-automation-plc-scada",
    title: "Industrial Automation, PLC & SCADA",
    category: "manufacturing",
    alsoIn: ["automation"],
    icon: "Workflow",
    summary: "PLC programming, SCADA/HMI and machine connectivity.",
    description:
      "We program PLCs, build SCADA and HMI screens and connect machines to the network, so equipment from different vendors can be monitored and controlled together.",
    capabilities: [
      "PLC programming (IEC 61131-3)",
      "SCADA and HMI development",
      "Machine connectivity with OPC UA and Modbus",
      "Robot cell and conveyor integration",
      "Alarm management and historians",
      "Commissioning and on-site support",
    ],
    tech: ["Siemens TIA Portal", "Rockwell Studio 5000", "Ignition", "WinCC", "Kepware", "OPC UA"],
    outcomes: ["Less manual intervention", "Centralised machine control", "Faster changeovers"],
  },
  {
    slug: "predictive-maintenance",
    title: "Predictive Maintenance",
    category: "manufacturing",
    icon: "Activity",
    summary: "Spot failing equipment before it stops the line.",
    description:
      "We add vibration, temperature and current sensors to critical assets, stream the data and use machine learning to predict failures and plan maintenance.",
    capabilities: [
      "Condition monitoring sensor retrofit",
      "Vibration and acoustic analysis",
      "Anomaly detection and remaining-useful-life models",
      "CMMS integration for automatic work orders",
      "Maintenance dashboards and alerts",
      "Spare-parts planning",
    ],
    tech: ["Python", "Azure ML", "InfluxDB", "Grafana", "MQTT", "Edge AI"],
    outcomes: ["30–50% less unplanned downtime", "Longer asset life", "Lower maintenance cost"],
  },
  {
    slug: "machine-vision-quality",
    title: "Machine Vision & Quality Inspection",
    category: "manufacturing",
    icon: "ScanEye",
    summary: "AI-powered visual inspection for defects, dimensions and assembly.",
    description:
      "We design camera-based inspection stations that find surface defects, measure parts, read codes and verify assembly at line speed, with deep learning where rules are not enough.",
    capabilities: [
      "Defect detection with deep learning",
      "Dimensional measurement and gauging",
      "OCR, barcode and DataMatrix reading",
      "Assembly verification",
      "Camera, lens and lighting selection",
      "Integration with PLC reject systems",
    ],
    tech: ["OpenCV", "PyTorch", "Halcon", "Cognex", "Basler", "NVIDIA TensorRT"],
    outcomes: ["99%+ detection accuracy", "100% inspection instead of sampling", "Less scrap and rework"],
  },
  {
    slug: "digital-twin-simulation",
    title: "Digital Twin & Simulation",
    category: "manufacturing",
    alsoIn: ["immersive"],
    icon: "Boxes",
    summary: "Live virtual models of machines, lines and plants.",
    description:
      "We create digital twins that mirror your equipment and processes with live data, so you can monitor in 3D, test what-if scenarios and optimise without touching the real line.",
    capabilities: [
      "3D plant and line visualisation",
      "Live data binding from IoT and SCADA",
      "Discrete-event and process simulation",
      "What-if and capacity planning",
      "Virtual commissioning",
      "Operator training environments",
    ],
    tech: ["Unity", "Three.js", "Azure Digital Twins", "NVIDIA Omniverse", "AnyLogic"],
    outcomes: ["Better layout and capacity decisions", "Shorter commissioning", "Safer training"],
  },
  {
    slug: "oee-production-analytics",
    title: "OEE & Production Analytics",
    category: "manufacturing",
    icon: "Gauge",
    summary: "Real-time OEE, downtime and yield dashboards.",
    description:
      "We collect machine states and counts automatically and turn them into OEE, downtime Pareto and yield reports, so teams can see losses and act during the shift.",
    capabilities: [
      "Automatic machine state and cycle capture",
      "Real-time OEE (availability, performance, quality)",
      "Downtime reason coding and Pareto analysis",
      "Andon boards and shift reports",
      "Energy monitoring per machine",
      "Multi-plant benchmarking",
    ],
    tech: ["Power BI", "Grafana", "SQL Server", "TimescaleDB", "OPC UA", "Next.js"],
    outcomes: ["5–15% OEE improvement", "Daily meetings based on facts", "Lower energy per unit"],
  },
  {
    slug: "erp-mes-integration-traceability",
    title: "ERP–MES Integration & Traceability",
    category: "manufacturing",
    icon: "Truck",
    summary: "Connect planning, production and supply chain with end-to-end traceability.",
    description:
      "We connect ERP, MES, WMS and supplier systems so orders, materials and quality data flow automatically, with full forward and backward traceability for recalls and compliance.",
    capabilities: [
      "ERP–MES order and BOM synchronisation",
      "Warehouse and inventory integration (WMS)",
      "Barcode and RFID material tracking",
      "Forward and backward traceability",
      "Supplier portals and quality data exchange",
      "Compliance: ISO 9001, IATF 16949, FDA 21 CFR Part 11",
    ],
    tech: ["SAP", "Dynamics 365", "Oracle", "B2MML", "RFID", "REST / EDI"],
    outcomes: ["Recalls scoped in minutes, not days", "Accurate inventory", "Audit-ready records"],
  },

  // ---------------- More Industry 4.0 / smart manufacturing ----------------
  {
    slug: "industry-4-0-readiness-consulting",
    title: "Industry 4.0 Readiness & Smart Factory Consulting",
    category: "manufacturing",
    icon: "Compass",
    summary: "Assess where your plant stands today and get a practical, costed smart-factory roadmap.",
    description:
      "We assess your processes, machines, systems and people against Industry 4.0 maturity models, find the highest-value use cases and deliver a phased roadmap with business cases, architecture and budgets.",
    capabilities: [
      "Smart Industry Readiness Index (SIRI) style assessments",
      "Shop-floor walkthroughs and value-stream mapping",
      "Use-case prioritisation with ROI estimates",
      "Target ISA-95 / RAMI 4.0 architecture",
      "Vendor-neutral technology selection",
      "Phased roadmap and pilot plan",
    ],
    tech: ["SIRI", "ISA-95", "RAMI 4.0", "Value-stream mapping", "Lean / Six Sigma"],
    outcomes: ["Clear priorities", "Budget you can defend", "Quick-win pilots in weeks"],
  },
  {
    slug: "machine-connectivity-data-acquisition",
    title: "Machine Connectivity & Data Acquisition",
    category: "manufacturing",
    icon: "PlugZap",
    summary: "Connect new and legacy machines, collecting data even from equipment with no network port.",
    description:
      "We connect CNCs, presses, injection moulding machines, PLCs and test benches, including old machines retrofitted with sensors and I/O modules, so every asset streams data to your systems.",
    capabilities: [
      "OPC UA, MTConnect, Modbus, EtherNet/IP, PROFINET",
      "Legacy machine retrofits with sensors and I/O",
      "Current-clamp and cycle-signal monitoring",
      "SECS/GEM for semiconductor equipment",
      "Euromap 63/77 for injection moulding",
      "Edge buffering and secure data forwarding",
    ],
    tech: ["Kepware", "Node-RED", "OPC UA", "MTConnect", "MQTT Sparkplug B", "Advantech / Moxa I/O"],
    outcomes: ["100% of machines visible", "No manual data collection", "Foundation for MES and analytics"],
  },
  {
    slug: "industrial-data-platform-uns",
    title: "Industrial Data Platform & Unified Namespace",
    category: "manufacturing",
    icon: "Database",
    summary: "One real-time, well-structured source of truth for all plant and business data.",
    description:
      "We build industrial data platforms around a Unified Namespace (UNS): an event-driven hub where machines, MES, ERP and quality systems publish structured data that every application can use.",
    capabilities: [
      "Unified Namespace design (ISA-95 hierarchy)",
      "MQTT broker and Sparkplug B architecture",
      "Process historians and time-series storage",
      "Contextualised data models and tag naming",
      "Data pipelines to cloud lakes and BI",
      "Data governance and access control",
    ],
    tech: ["HiveMQ", "EMQX", "Sparkplug B", "InfluxDB", "TimescaleDB", "AVEVA PI", "Azure IoT"],
    outcomes: ["Data ready for AI and analytics", "New apps in days, not months", "No point-to-point spaghetti"],
  },
  {
    slug: "production-planning-scheduling-aps",
    title: "Production Planning & Scheduling (APS)",
    category: "manufacturing",
    icon: "CalendarClock",
    summary: "Finite-capacity schedules that respect machines, tools, materials and people.",
    description:
      "We build and integrate advanced planning and scheduling that turns sales orders into realistic production plans, re-plans automatically when things change and shows due-date risk early.",
    capabilities: [
      "Finite-capacity scheduling and sequencing",
      "Material and tool availability checks",
      "Drag-and-drop Gantt planning boards",
      "What-if scenarios and rush-order impact",
      "Changeover and setup-time optimisation",
      "ERP and MES integration",
    ],
    tech: [".NET", "Google OR-Tools", "Optimisation solvers", "SQL Server", "React Gantt"],
    outcomes: ["Higher on-time delivery", "Fewer changeovers", "Planners freed from spreadsheets"],
  },
  {
    slug: "quality-management-spc",
    title: "Quality Management System (QMS) & SPC",
    category: "manufacturing",
    icon: "ClipboardList",
    summary: "Digital inspections, SPC charts, NCRs and CAPA, connected to production data.",
    description:
      "We digitise quality: inspection plans on tablets, automatic data capture from gauges, live SPC charts with alarms, non-conformance and CAPA workflows, and audit-ready records.",
    capabilities: [
      "Digital inspection plans and checklists",
      "Gauge and CMM data integration",
      "Real-time SPC with Western Electric rules",
      "NCR, 8D and CAPA workflows",
      "Supplier quality and PPAP",
      "ISO 9001 / IATF 16949 documentation",
    ],
    tech: ["SPC", "Minitab export", "Power BI", ".NET", "Tablets", "Bluetooth gauges"],
    outcomes: ["Defects caught earlier", "Faster audits", "Lower cost of poor quality"],
  },
  {
    slug: "cmms-maintenance-management",
    title: "CMMS & Maintenance Management",
    category: "manufacturing",
    icon: "Hammer",
    summary: "Preventive and condition-based maintenance with mobile work orders and spare-parts control.",
    description:
      "We implement and build maintenance systems that schedule preventive work, trigger work orders from machine data, track spare parts and measure MTBF and MTTR.",
    capabilities: [
      "Asset register and hierarchy",
      "Preventive and meter-based schedules",
      "Condition-based work orders from IoT alerts",
      "Mobile work orders with photos and sign-off",
      "Spare-parts inventory and reorder points",
      "MTBF, MTTR and maintenance-cost dashboards",
    ],
    tech: ["Custom CMMS", "IBM Maximo", "SAP PM", "Fiix", "Mobile apps", "Power BI"],
    outcomes: ["Less unplanned downtime", "Lower spare-parts stock", "Maintenance you can measure"],
  },
  {
    slug: "warehouse-management-intralogistics",
    title: "Warehouse Management & Intralogistics",
    category: "manufacturing",
    icon: "Warehouse",
    summary: "WMS, barcode/RFID scanning and line-side replenishment for plants and DCs.",
    description:
      "We build warehouse and intralogistics systems: receiving, put-away, picking and dispatch with scanners, kanban and line-side replenishment, and integration with AMRs, conveyors and ERP.",
    capabilities: [
      "Receiving, put-away, picking and dispatch",
      "Barcode and RFID scanning apps",
      "Kanban and line-side replenishment",
      "Cycle counting and stock accuracy",
      "AMR, conveyor and sorter integration",
      "ERP and MES synchronisation",
    ],
    tech: ["Android scanners", "RFID", ".NET", "SQL Server", "SAP EWM", "REST APIs"],
    outcomes: ["99%+ stock accuracy", "Faster picking", "No line stoppages for material"],
  },
  {
    slug: "energy-management-sustainability",
    title: "Energy Management & Sustainability",
    category: "manufacturing",
    icon: "Leaf",
    summary: "Machine-level energy monitoring, ISO 50001 reporting and carbon tracking.",
    description:
      "We meter energy, compressed air and water down to machine level, link consumption to production output and build dashboards and reports for ISO 50001, ESG and carbon disclosure.",
    capabilities: [
      "Smart meters and sub-metering",
      "Energy per unit and per order",
      "Compressed air and utility monitoring",
      "Peak demand alerts and load shifting",
      "ISO 50001 and ESG reporting",
      "Scope 1 and 2 carbon tracking",
    ],
    tech: ["Modbus meters", "InfluxDB", "Grafana", "Power BI", "ISO 50001", "GHG Protocol"],
    outcomes: ["10–20% energy savings", "ESG-ready data", "Lower utility bills"],
  },
  {
    slug: "ot-industrial-cybersecurity",
    title: "OT & Industrial Cybersecurity",
    category: "manufacturing",
    icon: "ShieldAlert",
    summary: "Protect PLCs, SCADA and plant networks with IEC 62443-aligned security.",
    description:
      "We secure operational technology: asset inventory, network segmentation, secure remote access, monitoring for threats on industrial protocols and incident response plans aligned with IEC 62443.",
    capabilities: [
      "OT asset discovery and risk assessment",
      "Network segmentation and DMZ design",
      "Secure remote access for vendors",
      "Industrial protocol threat monitoring",
      "Backup and recovery for PLC / SCADA",
      "IEC 62443 gap analysis and roadmap",
    ],
    tech: ["IEC 62443", "Fortinet", "Claroty / Nozomi", "Zero-trust remote access", "Firewalls"],
    outcomes: ["Reduced cyber risk", "Safer remote support", "Insurance and audit compliance"],
  },
  {
    slug: "track-trace-serialization",
    title: "Track & Trace and Serialisation",
    category: "manufacturing",
    icon: "ScanBarcode",
    summary: "Unit-level serialisation, aggregation and labelling for pharma, food and electronics.",
    description:
      "We implement serialisation and traceability: unique codes printed and verified on the line, parent-child aggregation into cartons and pallets, and reporting to regulators and customers.",
    capabilities: [
      "GS1 barcodes, DataMatrix and QR codes",
      "Line printing and vision verification",
      "Carton and pallet aggregation",
      "Pharma serialisation and export compliance",
      "Recall management and genealogy",
      "Customer and regulator reporting",
    ],
    tech: ["GS1", "DataMatrix", "Videojet / Domino printers", "Cognex readers", "EPCIS"],
    outcomes: ["Export and regulatory compliance", "Counterfeit protection", "Recalls in minutes"],
  },
  {
    slug: "digital-shop-floor-andon",
    title: "Digital Shop Floor & Andon",
    category: "manufacturing",
    icon: "BellRing",
    summary: "Paperless e-SOPs, digital checklists, Andon calls and shift handovers on tablets and TVs.",
    description:
      "We replace paper on the shop floor with tablets and big screens: electronic SOPs, digital checklists, Andon alerts that escalate to the right people, and structured shift handovers.",
    capabilities: [
      "Electronic SOPs and work instructions",
      "Digital start-up and 5S checklists",
      "Andon calls with escalation and SLA timers",
      "Line TV dashboards and targets",
      "Shift handover and tier meetings",
      "Skills matrix and operator sign-off",
    ],
    tech: ["Tablets", "Smart TVs", "Next.js", ".NET", "WhatsApp / SMS alerts", "MES integration"],
    outcomes: ["Faster response to problems", "Consistent operations", "Zero paper"],
  },
  {
    slug: "private-5g-industrial-networks",
    title: "Private 5G & Industrial Networks",
    category: "manufacturing",
    icon: "Antenna",
    summary: "Reliable wired and wireless plant networks for machines, AGVs and IoT.",
    description:
      "We design industrial networks that machines, robots and sensors can rely on: managed industrial Ethernet, Wi-Fi 6 for AGVs, private LTE/5G and LoRaWAN, with monitoring and redundancy.",
    capabilities: [
      "Industrial network design and audits",
      "Managed industrial Ethernet and redundancy rings",
      "Wi-Fi 6 for AGVs, scanners and tablets",
      "Private LTE / 5G planning and integration",
      "LoRaWAN coverage for sensors",
      "Network monitoring and documentation",
    ],
    tech: ["Industrial Ethernet", "TSN", "Wi-Fi 6", "Private 5G", "LoRaWAN", "Moxa / Hirschmann"],
    outcomes: ["Stable connectivity", "Ready for AGVs and IoT", "Fewer network-caused stops"],
  },
  {
    slug: "manufacturing-ai-process-optimisation",
    title: "Manufacturing AI & Process Optimisation",
    category: "manufacturing",
    icon: "Lightbulb",
    summary: "AI that improves yield, scrap and throughput using your own process data.",
    description:
      "We apply machine learning to process data to find what drives scrap and yield loss, recommend optimal settings (golden batch), forecast demand and spot anomalies before they become defects.",
    capabilities: [
      "Root-cause analysis of scrap and rework",
      "Golden-batch and parameter optimisation",
      "Yield prediction and soft sensors",
      "Anomaly detection on process signals",
      "Demand and material forecasting",
      "Generative AI assistants for operators",
    ],
    tech: ["Python", "scikit-learn", "PyTorch", "Azure ML", "Databricks", "LLM APIs"],
    outcomes: ["Lower scrap", "Higher yield", "Decisions backed by data"],
  },

  // ---------------- Third-party & API integrations ----------------
  {
    slug: "payment-gateway-integration",
    title: "Payment Gateway Integration",
    category: "integrations",
    icon: "CreditCard",
    summary: "Secure online payments, UPI, wallets and subscriptions for web and mobile apps.",
    description:
      "We integrate local and global payment gateways into your website, app or POS: checkout, subscriptions, refunds, payouts and automatic reconciliation, built so card data never touches your servers.",
    capabilities: [
      "Checkout for cards, UPI, net banking, wallets and BNPL",
      "Recurring billing, mandates and subscriptions",
      "Webhooks, refunds, payouts and split settlements",
      "Automatic reconciliation with your ERP or accounting",
      "Tokenisation and PCI-DSS-friendly (SAQ-A) design",
      "Multi-currency and cross-border payments",
    ],
    tech: [
      "Razorpay", "PayU", "Cashfree", "PhonePe PG", "Paytm", "Stripe", "PayPal",
      "ECPay", "NewebPay", "LINE Pay", "JKOPay", "TapPay",
    ],
    outcomes: ["Higher checkout conversion", "Same-day reconciliation", "Payments that pass audits"],
  },
  {
    slug: "camera-sdk-integration",
    title: "Camera & Video SDK Integration",
    category: "integrations",
    icon: "Camera",
    summary: "Connect IP, CCTV, industrial and mobile cameras to your software.",
    description:
      "We integrate camera SDKs and video streams into web, desktop and mobile apps: live view, recording, snapshots, barcode and number-plate reading, and AI analytics on the stream.",
    capabilities: [
      "IP / CCTV cameras via ONVIF, RTSP and vendor SDKs",
      "NVR / DVR playback, recording and event retrieval",
      "Industrial cameras with GenICam (Basler, FLIR, Hikrobot)",
      "Mobile camera capture, document scan and barcode reading",
      "Low-latency live streaming in the browser (WebRTC, HLS)",
      "ANPR, face and object detection on video streams",
    ],
    tech: ["Hikvision SDK", "Dahua SDK", "ONVIF", "Basler pylon", "FLIR Spinnaker", "CameraX", "AVFoundation", "WebRTC", "FFmpeg", "OpenCV"],
    outcomes: ["One screen for every camera", "Video events linked to your data", "No vendor lock-in"],
  },
  {
    slug: "kyc-identity-verification",
    title: "KYC & Identity Verification Integration",
    category: "integrations",
    icon: "ScanFace",
    summary: "Digital onboarding with eKYC, video KYC, face match and e-sign.",
    description:
      "We build compliant digital onboarding flows: ID document capture and OCR, government database checks, liveness and face match, video KYC, AML screening and e-signatures, with a full audit trail.",
    capabilities: [
      "Aadhaar eKYC (OTP / offline XML), PAN and DigiLocker checks",
      "Video KYC flows aligned with RBI guidelines",
      "ID OCR, liveness detection and face match",
      "AML, PEP and sanctions screening",
      "Aadhaar eSign and digital signatures",
      "Taiwan MyData and TW FidO digital identity",
    ],
    tech: ["DigiLocker", "Aadhaar eSign", "IDfy", "HyperVerge", "Signzy", "Digio", "Onfido", "Sumsub", "Jumio", "TW FidO"],
    outcomes: ["Onboarding in minutes, not days", "Lower fraud", "Audit-ready compliance records"],
  },
  {
    slug: "sms-whatsapp-messaging-gateway",
    title: "SMS, WhatsApp & Messaging Gateway Integration",
    category: "integrations",
    icon: "MessageSquareText",
    summary: "OTP, alerts and customer messaging over SMS, WhatsApp, LINE, email and push.",
    description:
      "We connect your systems to messaging gateways for OTPs, order updates, alerts and two-way conversations, with templates, delivery tracking, fallbacks between channels and opt-out handling.",
    capabilities: [
      "OTP and transactional SMS with delivery reports",
      "India DLT registration and template compliance (TRAI)",
      "WhatsApp Business Platform: templates, chatbots, catalogues",
      "LINE Messaging API for Taiwan",
      "Email (SES, SendGrid) and mobile push notifications",
      "Voice OTP, IVR and missed-call services",
    ],
    tech: ["Twilio", "MSG91", "Gupshup", "Kaleyra", "Exotel", "Infobip", "Vonage", "WhatsApp Cloud API", "LINE", "Firebase FCM"],
    outcomes: ["99%+ OTP delivery", "One API for every channel", "Lower messaging costs"],
  },
  {
    slug: "logistics-shipping-api-integration",
    title: "Logistics & Shipping API Integration",
    category: "integrations",
    icon: "PackageCheck",
    summary: "Courier booking, labels, tracking and COD with domestic and global carriers.",
    description:
      "We integrate courier and logistics APIs into your e-commerce, ERP or WMS: rate comparison, automatic booking, shipping labels, pickup scheduling, live tracking, returns and cash-on-delivery reconciliation.",
    capabilities: [
      "Multi-carrier rate shopping and auto-allocation",
      "Shipment booking, AWB and label printing",
      "Live tracking webhooks and customer notifications",
      "Returns (RTO / reverse pickup) and NDR handling",
      "COD remittance reconciliation",
      "E-way bill and customs documentation",
    ],
    tech: ["Shiprocket", "Delhivery", "Blue Dart", "India Post", "DHL", "FedEx", "UPS", "T-Cat", "Chunghwa Post", "HCT Logistics", "7-ELEVEN / FamilyMart pickup"],
    outcomes: ["Orders shipped in one click", "Fewer failed deliveries", "Accurate shipping costs"],
  },
  {
    slug: "maps-gps-location-integration",
    title: "Maps, GPS & Location Integration",
    category: "integrations",
    icon: "MapPin",
    summary: "Maps, geocoding, live tracking, geofencing and route optimisation.",
    description:
      "We add location intelligence to your apps: address autocomplete, store locators, live vehicle and field-staff tracking, geofence alerts and optimised delivery routes.",
    capabilities: [
      "Maps, geocoding and address autocomplete",
      "Live GPS tracking for vehicles, assets and staff",
      "Geofencing with entry / exit alerts",
      "Route optimisation and ETA calculation",
      "GPS tracker and telematics device integration",
      "Store and dealer locators",
    ],
    tech: ["Google Maps Platform", "Mappls (MapmyIndia)", "Mapbox", "HERE", "OpenStreetMap", "Teltonika", "OSRM"],
    outcomes: ["Shorter delivery routes", "Real-time fleet visibility", "Fewer 'where is my order' calls"],
  },
  {
    slug: "e-invoicing-gst-accounting-integration",
    title: "E-Invoicing, GST & Accounting Integration",
    category: "integrations",
    icon: "Receipt",
    summary: "Government e-invoicing, tax filing and accounting software, connected.",
    description:
      "We connect your billing, ERP and e-commerce systems to government e-invoicing portals and accounting software, so invoices, tax data and payments sync automatically and correctly.",
    capabilities: [
      "India GST e-invoice (IRN / QR) and e-way bill APIs",
      "Taiwan e-invoice (電子發票) via MOF platform",
      "Taiwan e-invoice carrier and B2B exchange",
      "Tally, Zoho Books, QuickBooks and Xero sync",
      "Automatic ledger posting and bank reconciliation",
      "Tax reports and audit exports",
    ],
    tech: ["GST IRP / NIC APIs", "Tally", "Zoho Books", "QuickBooks", "Xero", "Taiwan e-Invoice platform"],
    outcomes: ["No manual invoice re-keying", "Compliant tax records", "Faster month-end close"],
  },
  {
    slug: "biometric-access-control-integration",
    title: "Biometric & Access Control Integration",
    category: "integrations",
    icon: "Fingerprint",
    summary: "Fingerprint, face, RFID and attendance devices connected to your apps.",
    description:
      "We integrate biometric scanners, face terminals, RFID readers and access-control panels with HR, payroll, visitor management and security software.",
    capabilities: [
      "Fingerprint and iris scanners (UIDAI RD Service certified)",
      "Face recognition attendance terminals",
      "RFID / NFC card readers and access-control panels",
      "Attendance and payroll system sync",
      "Visitor management and door control",
      "Real-time sync with offline buffering",
    ],
    tech: ["Mantra", "IDEMIA (Morpho)", "SecuGen", "ZKTeco", "eSSL", "HID", "Suprema"],
    outcomes: ["Accurate attendance and payroll", "Secure premises", "One dashboard for all devices"],
  },

  // ---------------- Automation ----------------
  {
    slug: "robotic-process-automation",
    title: "Robotic Process Automation (RPA)",
    category: "automation",
    icon: "MousePointerClick",
    summary: "Software bots that do repetitive clicking, copying and data entry for your team.",
    description:
      "We find the repetitive, rule-based work in your back office and hand it to software robots that log in, read screens, move data between systems and file reports, around the clock and without errors.",
    capabilities: [
      "Process discovery and automation ROI assessment",
      "Attended and unattended bots",
      "Legacy desktop, web and SAP GUI automation",
      "Excel, email and PDF handling",
      "Bot orchestration, scheduling and monitoring",
      "Centre of Excellence (CoE) setup and governance",
    ],
    tech: ["UiPath", "Power Automate Desktop", "Automation Anywhere", "Blue Prism", "Python", "Robocorp"],
    outcomes: ["Hours of manual work saved every week", "Near-zero data entry errors", "Payback in months"],
  },
  {
    slug: "workflow-business-process-automation",
    title: "Workflow & Business Process Automation",
    category: "automation",
    icon: "Waypoints",
    summary: "Approvals, forms and hand-offs that run themselves across your apps.",
    description:
      "We map how work moves through your business and automate it: digital forms, multi-level approvals, notifications, escalations and integrations between the tools your teams already use.",
    capabilities: [
      "Process mapping and BPMN modelling",
      "Digital forms and multi-level approvals",
      "Purchase, leave, expense and onboarding workflows",
      "SLA tracking, reminders and escalations",
      "No-code / low-code workflow platforms",
      "Integration across ERP, CRM, email and chat",
    ],
    tech: ["Power Automate", "n8n", "Zapier", "Make", "Camunda", "Microsoft Power Apps", "Zoho Creator"],
    outcomes: ["Faster approvals", "Full visibility of where work is stuck", "Less email back-and-forth"],
  },
  {
    slug: "ai-agents-intelligent-automation",
    title: "AI Agents & Intelligent Automation",
    category: "automation",
    icon: "BrainCog",
    summary: "AI agents that read, decide and act inside your business systems.",
    description:
      "We build AI agents powered by large language models that handle tasks needing judgement: triaging tickets, answering staff questions from your documents, drafting replies and updating records, with human approval where it matters.",
    capabilities: [
      "LLM agents with tool use connected to your systems",
      "Retrieval-augmented answers from internal documents",
      "Email and ticket triage, classification and drafting",
      "Human-in-the-loop approval steps",
      "Guardrails, audit logs and cost controls",
      "Evaluation and continuous improvement",
    ],
    tech: ["Claude", "OpenAI", "Azure OpenAI", "LangGraph", "MCP", "Python", "Vector databases"],
    outcomes: ["Routine decisions handled in seconds", "Teams freed for high-value work", "Consistent answers"],
  },
  {
    slug: "document-processing-automation",
    title: "Document Processing Automation (IDP)",
    category: "automation",
    icon: "FileScan",
    summary: "Turn invoices, POs, forms and IDs into clean data automatically.",
    description:
      "We automate document-heavy work with OCR and AI: capture invoices, purchase orders, delivery notes, bank statements and forms from email or scanners, extract and validate the data, and post it to your ERP.",
    capabilities: [
      "OCR for printed, handwritten and multilingual documents",
      "Invoice, PO and receipt data extraction",
      "Validation against ERP master data",
      "Three-way matching (PO, GRN, invoice)",
      "Email inbox and scanner ingestion",
      "Exception queues for human review",
    ],
    tech: ["Azure Document Intelligence", "AWS Textract", "Google Document AI", "Tesseract", "LLM extraction", "Python"],
    outcomes: ["80–90% less manual data entry", "Faster invoice processing", "Fewer payment errors"],
  },
  {
    slug: "chatbot-conversational-automation",
    title: "Chatbots & Conversational Automation",
    category: "automation",
    icon: "MessagesSquare",
    summary: "AI chatbots and voice bots for WhatsApp, websites, LINE and call centres.",
    description:
      "We build chatbots and voice bots that answer customers, capture leads, book appointments, track orders and hand over to a human agent with full context when needed.",
    capabilities: [
      "AI chatbots for websites and mobile apps",
      "WhatsApp, LINE, Telegram and Messenger bots",
      "Voice bots and IVR automation",
      "Lead capture, booking and order tracking flows",
      "Live-agent handover with conversation history",
      "Multilingual support (English, Hindi, Chinese and more)",
    ],
    tech: ["WhatsApp Cloud API", "LINE Messaging API", "Dialogflow", "Rasa", "LLM APIs", "Twilio Voice"],
    outcomes: ["24/7 customer response", "Lower support costs", "More leads captured"],
  },
  {
    slug: "marketing-sales-crm-automation",
    title: "Marketing, Sales & CRM Automation",
    category: "automation",
    icon: "Megaphone",
    summary: "Automated lead capture, nurturing, follow-ups and sales pipelines.",
    description:
      "We set up and customise CRM and marketing automation so every lead is captured, scored, nurtured and followed up on time, with reports your sales team trusts.",
    capabilities: [
      "Lead capture from website, ads and marketplaces",
      "Lead scoring and automatic assignment",
      "Email, SMS and WhatsApp nurture journeys",
      "Quotation and follow-up reminders",
      "CRM customisation and data migration",
      "Sales dashboards and forecasting",
    ],
    tech: ["HubSpot", "Salesforce", "Zoho CRM", "Dynamics 365 Sales", "Mailchimp", "Brevo"],
    outcomes: ["No lead left behind", "Shorter sales cycles", "Clear pipeline visibility"],
  },
  {
    slug: "reporting-data-automation",
    title: "Report & Data Pipeline Automation",
    category: "automation",
    icon: "ChartLine",
    summary: "Scheduled reports, Excel automation and data pipelines that refresh themselves.",
    description:
      "We replace manual spreadsheet work with automated pipelines: data is pulled from your systems, cleaned, combined and delivered as dashboards, Excel files or emails on a schedule.",
    capabilities: [
      "Automated ETL from ERP, CRM, databases and APIs",
      "Excel and Google Sheets automation",
      "Scheduled reports by email or chat",
      "Self-refreshing Power BI and Grafana dashboards",
      "Data quality checks and alerts",
      "SSIS and legacy job modernisation",
    ],
    tech: ["Python", "SQL Server", "SSIS", "Azure Data Factory", "Power BI", "Apache Airflow", "dbt"],
    outcomes: ["Reports ready before the meeting", "One version of the numbers", "Days of analyst time saved"],
  },
  {
    slug: "robotics-warehouse-automation",
    title: "Robotics & Warehouse Automation",
    category: "automation",
    alsoIn: ["manufacturing"],
    icon: "Forklift",
    summary: "Robot arms, AMRs, conveyors and pick-to-light systems integrated with your software.",
    description:
      "We integrate industrial robots, cobots, autonomous mobile robots and warehouse equipment with your WMS, MES and ERP, including the control software, safety logic and fleet management.",
    capabilities: [
      "Robot and cobot cell programming and integration",
      "AMR / AGV fleet integration with WMS",
      "Conveyor, sorter and pick-to-light control",
      "Vision-guided picking and palletising",
      "ROS-based robot software",
      "Simulation and virtual commissioning",
    ],
    tech: ["ROS 2", "Universal Robots", "FANUC", "ABB", "KUKA", "MiR", "OPC UA"],
    outcomes: ["Higher throughput per shift", "Fewer picking errors", "Safer workplaces"],
  },
  {
    slug: "building-home-automation",
    title: "Building & Home Automation",
    category: "automation",
    icon: "House",
    summary: "Smart lighting, HVAC, energy and security for buildings, offices and homes.",
    description:
      "We build building management and smart-home systems that control lighting, HVAC, energy meters, access and security from one dashboard and mobile app, with schedules and automatic rules.",
    capabilities: [
      "Building management system (BMS) integration",
      "Lighting, HVAC and energy automation",
      "Smart meters and energy dashboards",
      "Smart home apps and voice assistant control",
      "Access control, CCTV and alarm integration",
      "Scenes, schedules and occupancy-based rules",
    ],
    tech: ["BACnet", "Modbus", "KNX", "Zigbee", "Matter", "Home Assistant", "MQTT"],
    outcomes: ["15–30% lower energy bills", "One app for the whole building", "Comfort and safety"],
  },
  {
    slug: "it-infrastructure-automation",
    title: "IT & Infrastructure Automation",
    category: "automation",
    icon: "ServerCog",
    summary: "Automated provisioning, patching, backups and server operations.",
    description:
      "We automate IT operations: servers and cloud resources created from code, patches and backups on schedule, self-healing scripts for common incidents and user onboarding without tickets.",
    capabilities: [
      "Infrastructure as code (Terraform, Bicep)",
      "Configuration management with Ansible",
      "Automated patching and backups",
      "PowerShell and Bash runbooks",
      "User onboarding / offboarding in Microsoft 365 and Google Workspace",
      "Self-healing alerts and auto-remediation",
    ],
    tech: ["Ansible", "Terraform", "PowerShell", "Azure Automation", "AWS Systems Manager", "Jenkins"],
    outcomes: ["Fewer outages", "Consistent, secure servers", "IT tickets closed automatically"],
  },
  {
    slug: "web-scraping-browser-automation",
    title: "Web Scraping & Browser Automation",
    category: "automation",
    icon: "ScanSearch",
    summary: "Reliable data extraction and browser bots for portals without APIs.",
    description:
      "We build browser automation and data-extraction tools that log into portals, fill forms, download files and collect public data on a schedule, built to respect site terms and handle layout changes.",
    capabilities: [
      "Headless browser bots for portals without APIs",
      "Scheduled data extraction and change monitoring",
      "Price, catalogue and listing tracking",
      "Form filling and file downloads",
      "Captcha-aware, rate-limited and compliant design",
      "Clean output to databases, Excel or APIs",
    ],
    tech: ["Playwright", "Selenium", "Puppeteer", "Scrapy", "Python", "Node.js"],
    outcomes: ["Data you couldn't get before", "No manual copy-paste", "Alerts when things change"],
  },

  // ---------------- AR / VR & immersive ----------------
  {
    slug: "augmented-reality-app-development",
    title: "Augmented Reality (AR) App Development",
    category: "immersive",
    icon: "ScanLine",
    summary: "AR apps for iOS, Android and the web that place digital content in the real world.",
    description:
      "We build augmented reality apps that let customers try products in their room, help technicians see instructions on machines, and turn print, packaging and places into interactive experiences.",
    capabilities: [
      "Markerless AR with plane and object detection",
      "Image, QR and object tracking",
      "Location-based AR and indoor navigation",
      "WebAR that runs in the browser without an app",
      "Product try-on and view-in-your-room",
      "Analytics on how users interact with AR content",
    ],
    tech: ["ARKit", "ARCore", "Unity AR Foundation", "8th Wall", "WebXR", "Three.js", "Vuforia"],
    outcomes: ["Higher purchase confidence", "Fewer returns", "Memorable brand experiences"],
  },
  {
    slug: "vr-training-simulation",
    title: "VR Training & Simulation",
    category: "immersive",
    alsoIn: ["manufacturing"],
    icon: "Headset",
    summary: "Safe, repeatable virtual reality training for operators, technicians and staff.",
    description:
      "We build VR training that lets people practise dangerous, expensive or rare tasks safely: machine operation, maintenance, safety drills, assembly and customer service, with scoring and progress tracking.",
    capabilities: [
      "Interactive VR training scenarios",
      "Machine operation and maintenance simulators",
      "Safety, fire and emergency drills",
      "Hand tracking and realistic physics",
      "Scoring, assessments and LMS (SCORM/xAPI) reporting",
      "Multi-user training sessions",
    ],
    tech: ["Unity", "Unreal Engine", "Meta Quest", "OpenXR", "Pico", "SCORM / xAPI"],
    outcomes: ["Faster onboarding", "Zero-risk practice", "Measurable skill gains"],
  },
  {
    slug: "industrial-ar-remote-assistance",
    title: "Industrial AR & Remote Assistance",
    category: "immersive",
    alsoIn: ["manufacturing"],
    icon: "Glasses",
    summary: "Step-by-step AR work instructions and remote expert support on the shop floor.",
    description:
      "We put the right information in front of technicians: AR work instructions overlaid on equipment, live IoT data on machines, and remote experts who can see what the technician sees and draw on their view.",
    capabilities: [
      "AR work instructions for assembly and maintenance",
      "Live IoT and MES data overlaid on machines",
      "Remote expert video calls with AR annotations",
      "Quality inspection checklists with photo capture",
      "Smart-glasses and tablet support",
      "Integration with MES, CMMS and ERP",
    ],
    tech: ["HoloLens 2", "RealWear", "Vuforia", "Unity", "WebRTC", "Azure Spatial Anchors"],
    outcomes: ["Fewer assembly errors", "Faster repairs", "Less expert travel"],
  },
  {
    slug: "3d-product-configurators-webar",
    title: "3D Product Configurators & WebAR",
    category: "immersive",
    icon: "Rotate3d",
    summary: "Interactive 3D product viewers and configurators for e-commerce and sales teams.",
    description:
      "We create real-time 3D configurators where customers rotate, customise and price products in the browser, then view them in AR, with options, pricing and orders linked to your catalogue and ERP.",
    capabilities: [
      "Real-time 3D viewers that load fast on mobile",
      "Colour, material and option configurators",
      "Live pricing and quote generation",
      "One-tap view in AR (USDZ / GLB)",
      "CAD to web-ready 3D model optimisation",
      "Integration with Shopify, WooCommerce and ERP",
    ],
    tech: ["Three.js", "React Three Fiber", "Babylon.js", "model-viewer", "Blender", "glTF / USDZ"],
    outcomes: ["Higher conversion rates", "Fewer sales calls per order", "Accurate quotes"],
  },
  {
    slug: "mixed-reality-spatial-apps",
    title: "Mixed Reality & Spatial Computing",
    category: "immersive",
    icon: "Orbit",
    summary: "Apps for Apple Vision Pro, Meta Quest and HoloLens that blend digital and physical.",
    description:
      "We design and build spatial apps for mixed reality headsets: 3D data visualisation, collaborative design reviews, holographic product demos and hands-free workflows.",
    capabilities: [
      "visionOS apps for Apple Vision Pro",
      "Meta Quest mixed reality with passthrough",
      "HoloLens 2 enterprise applications",
      "Collaborative multi-user spaces",
      "Hand, eye and voice interaction",
      "3D data and digital twin visualisation",
    ],
    tech: ["visionOS", "RealityKit", "Unity", "OpenXR", "Meta XR SDK", "MRTK"],
    outcomes: ["Better design decisions", "Remote teams in one room", "Standout demos"],
  },
  {
    slug: "virtual-showrooms-3d-experiences",
    title: "Virtual Showrooms & 3D Experiences",
    category: "immersive",
    icon: "Store",
    summary: "Virtual showrooms, 3D tours and immersive events on the web and in VR.",
    description:
      "We build virtual showrooms, factory tours, property walkthroughs and trade-show booths that visitors can explore in a browser or VR headset, with lead capture and analytics.",
    capabilities: [
      "Virtual showrooms and product galleries",
      "Virtual factory and plant tours",
      "Real estate and interior walkthroughs",
      "Virtual events and trade-show booths",
      "3D scanning and photogrammetry",
      "Lead capture and visitor analytics",
    ],
    tech: ["Unity WebGL", "Three.js", "Unreal Engine", "Matterport", "Gaussian splatting", "WebXR"],
    outcomes: ["Sell to buyers who can't visit", "Longer engagement", "Qualified leads"],
  },

  // ---------------- Event tech & promotion rentals ----------------
  {
    slug: "event-management-brand-activations",
    title: "Event Management & Brand Activations",
    category: "events",
    icon: "PartyPopper",
    summary: "Product launches, exhibitions, roadshows and mall promotions, planned and run end to end.",
    description:
      "We plan and run tech-powered events and promotions: product launches, trade-show booths, dealer meets, roadshows, college and mall activations, with the screens, interactive experiences, staff and reporting included.",
    capabilities: [
      "Event concept, planning and on-site management",
      "Exhibition and trade-show booth design and build",
      "Product launches, dealer meets and conferences",
      "Mall, retail and college brand activations",
      "Roadshows and sampling campaigns",
      "Post-event reports with footfall and lead data",
    ],
    tech: ["Booth design", "LED walls", "Interactive kiosks", "Lead capture apps", "Live streaming", "Analytics"],
    outcomes: ["One partner for tech and event", "More qualified leads", "Measurable event ROI"],
  },
  {
    slug: "led-video-wall-display-rental",
    title: "LED Video Wall & Digital Display Rental",
    category: "events",
    icon: "Tv",
    summary: "Indoor and outdoor LED walls, large screens and digital signage for hire.",
    description:
      "We rent and install LED video walls, large-format displays and digital signage for stages, exhibitions, store launches and outdoor promotions, with content playback, scheduling and on-site technicians.",
    capabilities: [
      "Indoor and outdoor LED walls (P2.6 – P4.8)",
      "LCD video walls and 55”–98” displays",
      "Digital signage players with remote scheduling",
      "Stage backdrops and mobile LED vans",
      "Content creation and motion graphics",
      "Delivery, rigging, operation and dismantling",
    ],
    tech: ["LED panels", "Novastar processors", "Digital signage CMS", "4K media servers", "Truss & rigging"],
    outcomes: ["Bright, eye-catching visibility", "No capital purchase", "Technicians on site"],
  },
  {
    slug: "interactive-kiosk-touchscreen-rental",
    title: "Interactive Kiosks & Touchscreen Rental",
    category: "events",
    icon: "TabletSmartphone",
    summary: "Touch kiosks, interactive tables and tablets with custom apps for events and stores.",
    description:
      "We supply touchscreen kiosks, interactive tables and tablet stations loaded with custom apps: product catalogues, quizzes, surveys, lead capture and self check-in, branded for your campaign.",
    capabilities: [
      "Floor-standing and tabletop touch kiosks",
      "Interactive multi-touch tables and walls",
      "Custom catalogue, quiz and survey apps",
      "Lead capture with instant email / WhatsApp follow-up",
      "Offline mode with automatic data sync",
      "Branding, wraps and on-site support",
    ],
    tech: ["Android & Windows kiosks", "React / Electron apps", "QR & NFC", "WhatsApp API", "CRM sync"],
    outcomes: ["Engaged visitors", "Leads straight into your CRM", "Reusable campaign apps"],
  },
  {
    slug: "vr-ar-experience-booth-rental",
    title: "VR & AR Experience Booth Rental",
    category: "events",
    icon: "Gamepad2",
    summary: "Branded VR and AR experiences with headsets, staff and setup for events and promotions.",
    description:
      "We create and run VR and AR experiences that draw crowds at exhibitions, malls and launches: branded VR games, virtual product tours, AR filters and photo moments, complete with headsets, screens and attendants.",
    capabilities: [
      "Branded VR games and product experiences",
      "VR headset stations with mirror screens",
      "AR filters, portals and try-on experiences",
      "Racing, flight and motion simulators",
      "Leaderboards and prize mechanics",
      "Trained attendants and hygiene covers",
    ],
    tech: ["Meta Quest", "HTC Vive", "Unity", "Instagram / Snap AR", "Motion simulators"],
    outcomes: ["Long queues at your booth", "Social media shares", "Memorable brand recall"],
  },
  {
    slug: "holographic-3d-display-rental",
    title: "Holographic & 3D Display Rental",
    category: "events",
    icon: "Projector",
    summary: "3D hologram fans, holo boxes, projection mapping and transparent screens.",
    description:
      "We rent and program attention-grabbing displays: 3D hologram fans, holographic boxes, transparent OLED screens and projection mapping on products, stages and buildings.",
    capabilities: [
      "3D hologram fan walls with synced content",
      "Holographic product display boxes",
      "Transparent LED / OLED showcases",
      "Projection mapping on products and buildings",
      "3D animation and content production",
      "Installation and remote content updates",
    ],
    tech: ["Hologram fans", "Holo boxes", "Transparent OLED", "Projection mapping", "Blender / Cinema 4D"],
    outcomes: ["Stop-and-stare visibility", "Premium brand image", "Content you can reuse"],
  },
  {
    slug: "ai-photo-booth-engagement-games",
    title: "AI Photo Booths & Engagement Games",
    category: "events",
    icon: "Aperture",
    summary: "AI photo booths, 360° video booths, GIF booths and gamified promotions.",
    description:
      "We set up photo and video booths and interactive games that visitors love to share: AI-styled portraits, 360° slow-motion videos, branded GIFs, spin-the-wheel and gesture-controlled games, with instant sharing and data capture.",
    capabilities: [
      "AI photo booths with branded styles",
      "360° and slow-motion video booths",
      "Instant print, QR download and WhatsApp share",
      "Spin-the-wheel, quiz and gesture games",
      "Consent-based lead and contact capture",
      "Live social wall of shared photos",
    ],
    tech: ["DSLR & 360 rigs", "AI image generation", "Dye-sub printers", "Kinect / camera tracking", "WhatsApp API"],
    outcomes: ["Thousands of social impressions", "Data from every visitor", "Fun, shareable moments"],
  },
  {
    slug: "event-registration-badge-printing",
    title: "Event Registration, Check-in & Badge Printing",
    category: "events",
    icon: "Ticket",
    summary: "Online registration, QR check-in, on-site badge printing and lead retrieval.",
    description:
      "We run the technology behind your event's front desk: online registration and ticketing, QR or face check-in, instant badge printing, session tracking and exhibitor lead-scanning apps.",
    capabilities: [
      "Registration website and ticketing with payments",
      "QR code and face-recognition check-in",
      "On-site badge printing stations",
      "Session attendance and access control",
      "Exhibitor lead-scanning app",
      "Live attendance dashboard and reports",
    ],
    tech: ["Registration portal", "Razorpay / Stripe", "QR & NFC", "Badge printers", "Mobile apps"],
    outcomes: ["No queues at the entrance", "Accurate attendance data", "Leads for every exhibitor"],
  },
  {
    slug: "live-streaming-av-setup",
    title: "Live Streaming & AV Setup",
    category: "events",
    icon: "Video",
    summary: "Multi-camera live streaming, hybrid events, sound, lighting and projection.",
    description:
      "We provide the cameras, crew and technology to stream and run your event: multi-camera production, hybrid events with remote speakers, sound, lighting, projectors and recording.",
    capabilities: [
      "Multi-camera live streaming to YouTube, LinkedIn and private portals",
      "Hybrid events with remote speakers and Q&A",
      "Sound, stage lighting and projection",
      "Recording, editing and highlight videos",
      "Bonded internet for reliable uplinks",
      "Technical crew and show calling",
    ],
    tech: ["vMix", "OBS", "PTZ cameras", "Blackmagic ATEM", "Wireless mics", "Bonded 4G/5G"],
    outcomes: ["Reach beyond the venue", "Professional broadcast quality", "Reusable recordings"],
  },
];

/** Category ids in display order: all software categories, then all hardware ones. */
export const orderedCategoryIds = (["software", "hardware"] as ServiceGroup[]).flatMap((g) =>
  (Object.keys(categories) as CategoryId[]).filter((c) => categories[c].group === g),
);

export function categoryIdsByGroup(group: ServiceGroup) {
  return orderedCategoryIds.filter((c) => categories[c].group === group);
}

export function serviceGroupOf(s: Service): ServiceGroup {
  return categories[s.category].group;
}

export function getCategoryBySlug(slug: string) {
  return Object.values(categories).find((c) => c.slug === slug);
}

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function inCategory(s: Service, category: CategoryId) {
  return s.category === category || (s.alsoIn?.includes(category) ?? false);
}

/** Services in a category, including ones cross-listed there (primary ones first). */
export function servicesByCategory(category: CategoryId) {
  return [
    ...services.filter((s) => s.category === category),
    ...services.filter((s) => s.category !== category && s.alsoIn?.includes(category)),
  ];
}
