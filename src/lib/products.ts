export type ProductCategoryId = "iot" | "arvr" | "embedded" | "semiconductor" | "refurbished" | "free" | "giveaway";

/** "shop" = new hardware by type; "offers" = second-hand, free and giveaway listings. */
export type ProductGroup = "shop" | "offers";

/** Wholesale tier; `inr` omitted means "quote on request". */
export type PriceTier = { qty: string; inr?: number };

export type Product = {
  slug: string;
  name: string;
  category: ProductCategoryId;
  icon: string;
  summary: string;
  description: string;
  features: string[];
  specs: [string, string][];
  /** Minimum order quantity for wholesale. */
  moq: string;
  leadTime: string;
  warranty: string;
  certifications: string[];
  /** Indicative ex-works unit pricing in INR; final price is always quoted. */
  tiers?: PriceTier[];
  /** Capital equipment is quoted per configuration. */
  priceOnRequest?: boolean;
  oem?: boolean;
  /** Physical hardware (default) or a digital download. */
  kind?: "hardware" | "digital";
  /** Single-unit (retail) price in INR; when set, customers can buy one unit. */
  retailInr?: number;
  /** Condition grade for second-hand / refurbished items. */
  condition?: { grade: "A" | "B" | "C"; note: string };
  /** Who sells and ships the item. Omitted = sold by Orvantis. */
  seller?: { name: string; location: string; verified: boolean };
  /** Commission a reseller earns when a sale comes through their link. */
  resellerCommission?: string;
  /** Giveaway details (only for the giveaway category). */
  giveaway?: { closes: string; howToEnter: string[] };
};

export const productCategories: Record<
  ProductCategoryId,
  { id: ProductCategoryId; group: ProductGroup; slug: string; title: string; short: string; icon: string; blurb: string }
> = {
  iot: {
    id: "iot",
    group: "shop",
    slug: "iot-devices-gateways",
    title: "IoT Devices & Gateways",
    short: "IoT",
    icon: "Wifi",
    blurb: "Industrial gateways, wireless sensors, trackers and smart meters, ready for your platform or ours.",
  },
  arvr: {
    id: "arvr",
    group: "shop",
    slug: "ar-vr-hardware",
    title: "AR / VR Hardware",
    short: "AR / VR",
    icon: "Glasses",
    blurb: "Enterprise VR headsets, AR smart glasses, simulators and 360° capture kits in bulk.",
  },
  embedded: {
    id: "embedded",
    group: "shop",
    slug: "embedded-boards-modules",
    title: "Embedded Boards & Modules",
    short: "Embedded",
    icon: "Cpu",
    blurb: "Wireless modules, MCU boards, industrial PCs and edge AI computers for OEMs and integrators.",
  },
  semiconductor: {
    id: "semiconductor",
    group: "shop",
    slug: "semiconductor-equipment-components",
    title: "Semiconductor Equipment & Components",
    short: "Semiconductor",
    icon: "CircuitBoard",
    blurb: "Probe stations, bonders, SMT and inspection equipment, plus bulk ICs and power devices.",
  },
  refurbished: {
    id: "refurbished",
    group: "offers",
    slug: "second-hand-refurbished",
    title: "Second-Hand & Refurbished",
    short: "Refurbished",
    icon: "RefreshCw",
    blurb: "Tested, graded and warrantied pre-owned equipment at a fraction of the new price.",
  },
  free: {
    id: "free",
    group: "offers",
    slug: "free-products-samples",
    title: "Free Products & Samples",
    short: "Free",
    icon: "Gift",
    blurb: "Free evaluation samples, starter kits and digital resources for qualified businesses.",
  },
  giveaway: {
    id: "giveaway",
    group: "offers",
    slug: "giveaways-contests",
    title: "Giveaways & Contests",
    short: "Giveaways",
    icon: "PartyPopper",
    blurb: "Enter our free giveaways for hardware, kits and event passes. Rules apply.",
  },
};

export const products: Product[] = [
  // ---------------- IoT ----------------
  {
    slug: "industrial-iot-gateway-4g",
    retailInr: 20150,
    resellerCommission: "6%",
    name: "Industrial IoT Gateway 4G / Wi-Fi",
    category: "iot",
    icon: "Router",
    summary: "DIN-rail gateway that connects PLCs, meters and sensors to the cloud over 4G, Wi-Fi or Ethernet.",
    description:
      "A rugged edge gateway for factories, utilities and remote sites. It reads Modbus RTU/TCP, OPC UA and digital I/O, buffers data offline and publishes to any MQTT broker or our device cloud.",
    features: ["Modbus RTU/TCP, OPC UA, MQTT", "4G LTE Cat-4 with dual SIM failover", "Store-and-forward buffering", "Remote configuration and OTA updates"],
    specs: [
      ["Processor", "Quad-core ARM Cortex-A53"],
      ["Interfaces", "2× RS-485, 1× RS-232, 2× LAN, 4 DI / 2 DO"],
      ["Connectivity", "4G LTE Cat-4, Wi-Fi 2.4 GHz, Ethernet"],
      ["Power", "9–36 V DC"],
      ["Operating temp.", "-20 °C to 70 °C"],
      ["Mounting", "DIN rail / wall"],
    ],
    moq: "20 units",
    leadTime: "2–3 weeks",
    warranty: "2 years",
    certifications: ["CE", "FCC", "RoHS"],
    tiers: [
      { qty: "20–99", inr: 16300 },
      { qty: "100–499", inr: 14800 },
      { qty: "500+" },
    ],
    oem: true,
  },
  {
    slug: "lorawan-gateway-8-channel",
    retailInr: 43900,
    resellerCommission: "6%",
    name: "LoRaWAN Gateway 8-Channel (Outdoor)",
    category: "iot",
    icon: "RadioTower",
    summary: "IP67 outdoor LoRaWAN gateway with 4G backhaul for campus, farm and city deployments.",
    description:
      "An 8-channel LoRaWAN gateway that covers several kilometres, with 4G and Ethernet backhaul, GPS time sync and support for The Things Stack, ChirpStack and AWS IoT Core for LoRaWAN.",
    features: ["8-channel SX1302 concentrator", "4G + Ethernet backhaul", "IP67 enclosure with PoE", "Works with ChirpStack and TTN"],
    specs: [
      ["Frequency plans", "IN865 (India), AS923 (Taiwan)"],
      ["Range", "Up to 10 km line of sight"],
      ["Backhaul", "4G LTE, Ethernet (PoE)"],
      ["Enclosure", "IP67, aluminium"],
      ["Antenna", "External fibreglass, 5 dBi"],
    ],
    moq: "10 units",
    leadTime: "2–4 weeks",
    warranty: "2 years",
    certifications: ["CE", "FCC", "WPC (India)"],
    tiers: [
      { qty: "10–49", inr: 36950 },
      { qty: "50–199", inr: 34250 },
      { qty: "200+" },
    ],
  },
  {
    slug: "wireless-vibration-temperature-sensor",
    retailInr: 11350,
    resellerCommission: "8%",
    name: "Wireless Vibration & Temperature Sensor",
    category: "iot",
    icon: "Activity",
    summary: "Battery-powered tri-axial vibration sensor for predictive maintenance on motors and pumps.",
    description:
      "A magnet-mounted condition-monitoring sensor that measures vibration RMS, peak and FFT bands plus surface temperature, sending data over LoRaWAN or BLE for up to five years on one battery.",
    features: ["Tri-axial accelerometer, 0–6 kHz", "Surface temperature probe", "LoRaWAN or BLE 5.0", "Up to 5-year battery life"],
    specs: [
      ["Measurement", "Velocity RMS, acceleration peak, FFT"],
      ["Range", "±16 g"],
      ["Temperature", "-40 °C to 125 °C"],
      ["Protection", "IP68"],
      ["Mounting", "Magnet or M6 stud"],
    ],
    moq: "50 units",
    leadTime: "3–4 weeks",
    warranty: "1 year",
    certifications: ["CE", "RoHS", "IP68"],
    tiers: [
      { qty: "50–199", inr: 8450 },
      { qty: "200–999", inr: 7400 },
      { qty: "1,000+" },
    ],
    oem: true,
  },
  {
    slug: "smart-energy-meter-3-phase",
    retailInr: 7850,
    resellerCommission: "8%",
    name: "Smart Energy Meter 3-Phase (Modbus)",
    category: "iot",
    icon: "Zap",
    summary: "Class 0.5S multifunction meter for machine-level and building energy monitoring.",
    description:
      "A panel-mount three-phase meter that measures energy, power, power factor and harmonics, with Modbus RTU and optional Wi-Fi for direct cloud reporting.",
    features: ["Class 0.5S accuracy", "THD and harmonics to 31st", "Modbus RTU, optional Wi-Fi", "CT inputs 5 A / 1 A"],
    specs: [
      ["Voltage", "3 × 230/400 V AC"],
      ["Accuracy", "Class 0.5S (active energy)"],
      ["Communication", "RS-485 Modbus RTU, Wi-Fi (option)"],
      ["Display", "Backlit LCD"],
      ["Mounting", "96 × 96 mm panel"],
    ],
    moq: "50 units",
    leadTime: "2–3 weeks",
    warranty: "2 years",
    certifications: ["CE", "IEC 62053-22"],
    tiers: [
      { qty: "50–199", inr: 5650 },
      { qty: "200–999", inr: 5000 },
      { qty: "1,000+" },
    ],
  },
  {
    slug: "4g-gps-vehicle-tracker",
    retailInr: 5200,
    resellerCommission: "10%",
    name: "4G GPS Vehicle & Asset Tracker",
    category: "iot",
    icon: "MapPin",
    summary: "Real-time GPS tracker with ignition, fuel and driver-ID inputs for fleets and logistics.",
    description:
      "A compact 4G tracker for trucks, delivery vans and equipment with GNSS positioning, digital inputs for ignition and doors, CAN-bus option, and AIS-140 compliant variants for India.",
    features: ["GPS + GLONASS + BeiDou", "4G LTE Cat-1 with 2G fallback", "Ignition, door and SOS inputs", "AIS-140 variant for India"],
    specs: [
      ["Positioning", "GNSS, < 2.5 m accuracy"],
      ["Network", "LTE Cat-1, GSM fallback"],
      ["Inputs", "3 DI, 1 AI, 1 DO, optional CAN"],
      ["Backup battery", "450 mAh"],
      ["Protocols", "TCP/UDP, MQTT"],
    ],
    moq: "50 units",
    leadTime: "2 weeks",
    warranty: "1 year",
    certifications: ["CE", "FCC", "AIS-140 (variant)"],
    tiers: [
      { qty: "50–199", inr: 3700 },
      { qty: "200–999", inr: 3260 },
      { qty: "1,000+" },
    ],
    oem: true,
  },
  {
    slug: "environment-sensor-co2-temp-humidity",
    retailInr: 6950,
    resellerCommission: "10%",
    name: "Environment Sensor CO₂ / Temp / Humidity",
    category: "iot",
    icon: "Thermometer",
    summary: "Indoor air-quality sensor for offices, cleanrooms, warehouses and cold chain.",
    description:
      "An NDIR CO₂, temperature and humidity sensor with e-ink display, available with Wi-Fi, LoRaWAN or Modbus outputs for building management and compliance logging.",
    features: ["NDIR CO₂ 400–5,000 ppm", "±0.2 °C temperature accuracy", "E-ink display", "Wi-Fi, LoRaWAN or Modbus"],
    specs: [
      ["CO₂", "400–5,000 ppm, ±(30 ppm + 3%)"],
      ["Temperature", "-10 °C to 60 °C, ±0.2 °C"],
      ["Humidity", "0–100% RH, ±2%"],
      ["Power", "USB-C or 2× AA"],
    ],
    moq: "50 units",
    leadTime: "2–3 weeks",
    warranty: "1 year",
    certifications: ["CE", "RoHS"],
    tiers: [
      { qty: "50–199", inr: 5100 },
      { qty: "200–999", inr: 4490 },
      { qty: "1,000+" },
    ],
    oem: true,
  },

  // ---------------- AR / VR ----------------
  {
    slug: "standalone-vr-headset-enterprise-kit",
    retailInr: 61500,
    resellerCommission: "5%",
    name: "Standalone VR Headset — Enterprise Kit",
    category: "arvr",
    icon: "Headset",
    summary: "Standalone mixed-reality headsets bundled with device management, hygiene covers and cases.",
    description:
      "A ready-to-deploy kit for training, events and showrooms: standalone VR/MR headsets with controllers, kiosk-mode device management, face covers, charging station and rugged carry cases.",
    features: ["Standalone, no PC required", "Colour passthrough mixed reality", "Kiosk mode and MDM enrolment", "Hygiene covers and charging dock"],
    specs: [
      ["Display", "2064 × 2208 per eye, up to 120 Hz"],
      ["Storage", "128 / 512 GB"],
      ["Tracking", "6DoF inside-out, hand tracking"],
      ["Kit contents", "Headset, controllers, cover set, case, dock"],
    ],
    moq: "5 kits",
    leadTime: "1–2 weeks",
    warranty: "1 year",
    certifications: ["CE", "FCC"],
    tiers: [
      { qty: "5–19", inr: 56300 },
      { qty: "20–99", inr: 53250 },
      { qty: "100+" },
    ],
  },
  {
    slug: "ar-smart-glasses-industrial",
    name: "AR Smart Glasses — Industrial",
    category: "arvr",
    icon: "Glasses",
    summary: "Hands-free AR glasses for remote assistance, work instructions and inspections.",
    description:
      "Voice-controlled, safety-rated smart glasses for technicians, with a high-resolution camera, noise-cancelling mics and long battery life. Pre-loaded with our remote-assist app on request.",
    features: ["Voice control in noisy environments", "48 MP camera with stabilisation", "Hard-hat and safety-glass compatible", "Hot-swappable battery"],
    specs: [
      ["Display", "Monocular micro-display, 854 × 480"],
      ["Camera", "48 MP, 4K video"],
      ["Protection", "IP66, 2 m drop tested"],
      ["Battery", "3,250 mAh, hot-swappable"],
    ],
    moq: "5 units",
    leadTime: "2–3 weeks",
    warranty: "1 year",
    certifications: ["CE", "FCC", "IP66"],
    tiers: [
      { qty: "5–19", inr: 206800 },
      { qty: "20+" },
    ],
  },
  {
    slug: "vr-motion-simulator-seat",
    name: "VR Motion Simulator Seat (2-DOF)",
    category: "arvr",
    icon: "Gamepad2",
    summary: "Motion platform for driving, flight and safety simulations at events and training centres.",
    description:
      "A 2-degree-of-freedom motion seat with steering and pedal mounts, synced to VR content for driver training, brand activations and arcade-style experiences.",
    features: ["2-DOF electric actuators", "Steering wheel and pedal mounts", "Content sync SDK", "Safety belt and emergency stop"],
    specs: [
      ["Motion", "Pitch ±20°, roll ±20°"],
      ["Payload", "Up to 120 kg"],
      ["Power", "230 V AC, 1.5 kW"],
      ["Footprint", "1.6 × 1.0 m"],
    ],
    moq: "1 unit",
    leadTime: "4–6 weeks",
    warranty: "1 year",
    certifications: ["CE"],
    priceOnRequest: true,
  },
  {
    slug: "360-vr-camera-content-kit",
    retailInr: 72950,
    resellerCommission: "5%",
    name: "360° VR Camera Content Kit",
    category: "arvr",
    icon: "Camera",
    summary: "8K 360° camera kit for virtual tours, VR training content and live events.",
    description:
      "A complete kit for capturing immersive content: 8K 360° camera, invisible selfie stick, tripod, spatial audio mic, spare batteries and stitching software licence.",
    features: ["8K 30 fps / 5.7K 60 fps", "In-camera stitching", "Spatial audio capture", "Live-streaming capable"],
    specs: [
      ["Resolution", "8K 360° video, 72 MP photo"],
      ["Stabilisation", "6-axis gyro"],
      ["Storage", "microSD, up to 1 TB"],
      ["Kit contents", "Camera, stick, tripod, mic, 3 batteries"],
    ],
    moq: "3 kits",
    leadTime: "1–2 weeks",
    warranty: "1 year",
    certifications: ["CE", "FCC"],
    tiers: [
      { qty: "3–9", inr: 66900 },
      { qty: "10+" },
    ],
  },

  // ---------------- Embedded ----------------
  {
    slug: "esp32-s3-wifi-ble-module",
    name: "ESP32-S3 Wi-Fi + BLE Module",
    category: "embedded",
    icon: "Cpu",
    summary: "Pre-certified dual-core Wi-Fi/BLE module for connected products, on tape and reel.",
    description:
      "A compact module based on the ESP32-S3 SoC with PCB or u.FL antenna options, pre-certified to shorten your product certification. Custom firmware flashing available.",
    features: ["Dual-core 240 MHz with AI instructions", "Wi-Fi 4 + Bluetooth LE 5", "8 MB flash / 2–8 MB PSRAM options", "Custom firmware pre-flashing"],
    specs: [
      ["SoC", "ESP32-S3, dual-core Xtensa LX7"],
      ["Wireless", "802.11 b/g/n, BLE 5.0"],
      ["Memory", "8 MB flash, optional PSRAM"],
      ["Package", "Tape and reel (650 pcs)"],
    ],
    moq: "650 pcs (1 reel)",
    leadTime: "2–4 weeks",
    warranty: "1 year",
    certifications: ["FCC", "CE", "TELEC", "WPC"],
    tiers: [
      { qty: "650–4,999", inr: 273 },
      { qty: "5,000–19,999", inr: 246 },
      { qty: "20,000+" },
    ],
    oem: true,
  },
  {
    slug: "stm32-industrial-mcu-board",
    retailInr: 8350,
    resellerCommission: "8%",
    name: "STM32 Industrial Controller Board",
    category: "embedded",
    icon: "CircuitBoard",
    summary: "Cortex-M7 board with RS-485, CAN-FD and isolated I/O for custom controllers.",
    description:
      "A production-ready controller board for machine builders and OEMs, with isolated digital I/O, analog inputs, CAN-FD and RS-485, supplied with a board support package and Zephyr/FreeRTOS examples.",
    features: ["STM32H7 Cortex-M7 @ 480 MHz", "CAN-FD, RS-485, Ethernet", "8 isolated DI / 8 DO, 4 AI", "BSP with Zephyr and FreeRTOS"],
    specs: [
      ["MCU", "STM32H743, 2 MB flash, 1 MB RAM"],
      ["Interfaces", "CAN-FD, RS-485, 10/100 Ethernet, USB"],
      ["I/O", "8 DI (isolated), 8 DO, 4 AI 0–10 V"],
      ["Power", "24 V DC"],
    ],
    moq: "25 units",
    leadTime: "3–5 weeks",
    warranty: "2 years",
    certifications: ["CE", "RoHS"],
    tiers: [
      { qty: "25–99", inr: 6500 },
      { qty: "100–499", inr: 5800 },
      { qty: "500+" },
    ],
    oem: true,
  },
  {
    slug: "fanless-industrial-pc-arm",
    retailInr: 24550,
    resellerCommission: "6%",
    name: "Fanless Industrial PC (ARM)",
    category: "embedded",
    icon: "Server",
    summary: "Compact fanless computer for HMI, gateways and data logging in harsh environments.",
    description:
      "A rugged fanless PC built on a quad-core ARM compute module with dual Ethernet, serial ports and wide-temperature operation, supplied with Linux and optional Node-RED or Docker images.",
    features: ["Quad-core ARM, 4–8 GB RAM", "Dual Gigabit Ethernet, 2× RS-485", "Wide-temp -20 °C to 60 °C", "Linux, Docker and Node-RED ready"],
    specs: [
      ["CPU", "Quad-core Cortex-A72 @ 1.5 GHz"],
      ["Memory", "4 / 8 GB RAM, 32 GB eMMC"],
      ["I/O", "2× GbE, 2× RS-485, 4× USB, HDMI"],
      ["Power", "12–24 V DC"],
    ],
    moq: "10 units",
    leadTime: "2–4 weeks",
    warranty: "2 years",
    certifications: ["CE", "FCC"],
    tiers: [
      { qty: "10–49", inr: 21550 },
      { qty: "50–199", inr: 19900 },
      { qty: "200+" },
    ],
  },
  {
    slug: "edge-ai-computer-orin",
    retailInr: 113500,
    resellerCommission: "4%",
    name: "Edge AI Computer (Jetson Orin)",
    category: "embedded",
    icon: "BrainCircuit",
    summary: "Fanless edge AI box for machine vision, video analytics and robotics.",
    description:
      "An industrial edge AI computer built on an NVIDIA Jetson Orin module with multiple camera inputs, PoE and wide-voltage power, supplied with JetPack and optional pre-installed vision applications.",
    features: ["Up to 100 TOPS AI performance", "4× GMSL / PoE camera inputs", "M.2 for 5G / Wi-Fi", "JetPack with TensorRT pre-installed"],
    specs: [
      ["Module", "Jetson Orin NX / Nano options"],
      ["Video", "Up to 8× 1080p streams"],
      ["I/O", "4× PoE GbE, 2× USB 3.2, CAN, DIO"],
      ["Power", "9–36 V DC"],
    ],
    moq: "5 units",
    leadTime: "3–5 weeks",
    warranty: "2 years",
    certifications: ["CE", "FCC"],
    tiers: [
      { qty: "5–24", inr: 103800 },
      { qty: "25+" },
    ],
  },
  {
    slug: "lte-m-nb-iot-module",
    name: "LTE-M / NB-IoT Cellular Module",
    category: "embedded",
    icon: "Signal",
    summary: "Low-power cellular module with GNSS for trackers, meters and remote sensors.",
    description:
      "A global LTE-M / NB-IoT module with integrated GNSS and ultra-low power modes, ideal for battery-powered devices. Available with an evaluation board and firmware support.",
    features: ["LTE Cat-M1 and NB-IoT (Cat-NB2)", "Integrated GNSS", "PSM and eDRX power saving", "Global bands"],
    specs: [
      ["Bands", "Global LTE-M / NB-IoT bands"],
      ["Sleep current", "< 3 µA (PSM)"],
      ["Interfaces", "UART, I²C, GPIO, ADC"],
      ["Package", "LGA, tape and reel"],
    ],
    moq: "500 pcs",
    leadTime: "3–5 weeks",
    warranty: "1 year",
    certifications: ["GCF", "PTCRB", "CE", "FCC"],
    tiers: [
      { qty: "500–4,999", inr: 780 },
      { qty: "5,000+" },
    ],
  },

  // ---------------- Semiconductor ----------------
  {
    slug: "semi-automatic-wafer-probe-station",
    name: "Semi-Automatic Wafer Probe Station",
    category: "semiconductor",
    icon: "Microscope",
    summary: "200/300 mm probe station for wafer-level electrical test, failure analysis and R&D.",
    description:
      "A semi-automatic probe station for parametric and functional testing, with a programmable chuck, high-resolution optics and an optional thermal chuck. Supplied with installation, calibration and training.",
    features: ["200 mm and 300 mm wafer support", "Programmable XYZθ stage", "Thermal chuck -60 °C to 200 °C (option)", "Shielded enclosure for low-noise test"],
    specs: [
      ["Wafer size", "Up to 300 mm"],
      ["Stage accuracy", "±2 µm"],
      ["Optics", "Motorised zoom microscope with camera"],
      ["Probe positioners", "Up to 8 manipulators"],
    ],
    moq: "1 system",
    leadTime: "10–14 weeks",
    warranty: "1 year, on-site",
    certifications: ["CE", "SEMI S2"],
    priceOnRequest: true,
  },
  {
    slug: "die-bonder-wire-bonder",
    name: "Die Bonder & Wire Bonder Line",
    category: "semiconductor",
    icon: "Layers",
    summary: "Die-attach and gold/copper wire bonding equipment for assembly and packaging.",
    description:
      "Automatic die bonders and thermosonic wire bonders for LED, sensor, power and IC packaging lines, with recipe management and MES connectivity via SECS/GEM.",
    features: ["Epoxy and eutectic die attach", "Au / Cu / Al wire bonding", "Vision-based alignment", "SECS/GEM for MES integration"],
    specs: [
      ["Placement accuracy", "±10 µm"],
      ["Bonding speed", "Up to 20 wires / s"],
      ["Wire diameter", "15–75 µm"],
      ["Interface", "SECS/GEM, Ethernet"],
    ],
    moq: "1 system",
    leadTime: "12–16 weeks",
    warranty: "1 year, on-site",
    certifications: ["CE", "SEMI S2"],
    priceOnRequest: true,
  },
  {
    slug: "smt-reflow-oven-10-zone",
    name: "SMT Reflow Oven 10-Zone (Nitrogen-Ready)",
    category: "semiconductor",
    icon: "Flame",
    summary: "Lead-free reflow oven for PCB assembly lines, with profiling and MES data output.",
    description:
      "A 10-zone convection reflow oven with nitrogen option, closed-loop control and built-in profiling, designed for high-mix PCBA lines and supplied with installation and process tuning.",
    features: ["10 heating + 2 cooling zones", "Nitrogen-ready with O₂ monitoring", "Built-in thermal profiler", "Hermes / IPC-CFX data interface"],
    specs: [
      ["Max PCB width", "450 mm"],
      ["Temperature", "Up to 300 °C, ±1 °C"],
      ["Conveyor", "Mesh + rail, 300–2,000 mm/min"],
      ["Power", "3-phase 400 V, 60 kW start-up"],
    ],
    moq: "1 unit",
    leadTime: "6–8 weeks",
    warranty: "1 year, on-site",
    certifications: ["CE"],
    priceOnRequest: true,
  },
  {
    slug: "aoi-inspection-machine-3d",
    name: "3D AOI Inspection Machine",
    category: "semiconductor",
    icon: "ScanEye",
    summary: "3D automated optical inspection for SMT lines with AI-assisted defect review.",
    description:
      "An inline 3D AOI system that measures solder joints and component placement in true 3D, with AI-assisted false-call reduction and SPC data export to your MES.",
    features: ["True 3D measurement (moiré projection)", "AI false-call reduction", "Inline, dual-lane option", "SPC and MES data export"],
    specs: [
      ["Resolution", "10 / 15 µm options"],
      ["Speed", "Up to 60 cm²/s"],
      ["PCB size", "50 × 50 to 510 × 460 mm"],
      ["Interfaces", "IPC-CFX, SECS/GEM, CSV"],
    ],
    moq: "1 unit",
    leadTime: "8–10 weeks",
    warranty: "1 year, on-site",
    certifications: ["CE"],
    priceOnRequest: true,
  },
  {
    slug: "esd-cleanroom-workstation",
    name: "ESD-Safe Cleanroom Workstation",
    category: "semiconductor",
    icon: "ShieldCheck",
    summary: "Modular ESD workbenches with laminar flow, ionisers and monitoring for cleanrooms.",
    description:
      "Configurable ESD-protected workstations for electronics and semiconductor assembly, with ISO Class 5 laminar flow hood, ionisers, grounding monitors and lighting.",
    features: ["ESD laminate, < 10⁹ Ω", "ISO Class 5 laminar flow hood (option)", "Continuous ground monitoring", "Modular shelves and lighting"],
    specs: [
      ["Sizes", "1,200 / 1,500 / 1,800 mm"],
      ["Load", "Up to 300 kg"],
      ["Standard", "IEC 61340-5-1"],
      ["Options", "Ioniser, monitor, laminar flow"],
    ],
    moq: "5 workstations",
    leadTime: "3–4 weeks",
    warranty: "2 years",
    certifications: ["IEC 61340-5-1"],
    tiers: [
      { qty: "5–19", inr: 60700 },
      { qty: "20+" },
    ],
  },
  {
    slug: "bulk-ics-power-devices",
    name: "Bulk ICs & Power Semiconductors",
    category: "semiconductor",
    icon: "Boxes",
    summary: "Microcontrollers, power MOSFETs, IGBTs and passives on reels for production runs.",
    description:
      "Sourcing of production quantities of microcontrollers, power MOSFETs, IGBT modules, sensors and passives from franchised and audited channels, with full traceability and incoming inspection.",
    features: ["MCUs, MOSFETs, IGBTs, sensors, passives", "Traceable, authorised channels", "Incoming inspection and X-ray on request", "Kitting for EMS and PCBA lines"],
    specs: [
      ["Packaging", "Tape and reel, tray, tube"],
      ["Documentation", "CoC, datasheets, lot traceability"],
      ["Inspection", "Visual, X-ray, decapsulation (option)"],
      ["Services", "BOM sourcing, kitting, consignment"],
    ],
    moq: "Per BOM / reel",
    leadTime: "1–12 weeks (by part)",
    warranty: "Manufacturer warranty",
    certifications: ["ISO 9001 supply chain", "RoHS", "REACH"],
    priceOnRequest: true,
  },

  // ---------------- Marketplace listings (sold by partner sellers) ----------------
  {
    slug: "uhf-rfid-reader-marketplace",
    name: "UHF RFID Fixed Reader (4-Port)",
    category: "iot",
    icon: "ScanBarcode",
    summary: "Industrial 4-port UHF RFID reader for warehouses, gates and production lines.",
    description:
      "A fixed UHF RFID reader for asset tracking, dock doors and work-in-progress tracking, with Ethernet, PoE and GPIO for triggers and lights. Sold and shipped by a verified marketplace seller; integration support available from our team.",
    features: ["4 antenna ports", "Up to 700 tags/second", "PoE and GPIO", "LLRP and REST APIs"],
    specs: [
      ["Frequency", "865–867 MHz (India), 920–928 MHz (Taiwan)"],
      ["Read range", "Up to 12 m with suitable antennas"],
      ["Interfaces", "Ethernet (PoE), USB, RS-232, GPIO"],
      ["Protocols", "EPC Gen2 / ISO 18000-63"],
    ],
    moq: "1 unit",
    leadTime: "1–2 weeks",
    warranty: "1 year (seller)",
    certifications: ["CE", "FCC"],
    retailInr: 56750,
    tiers: [
      { qty: "1–9", inr: 56750 },
      { qty: "10+" },
    ],
    seller: { name: "Verified marketplace seller", location: "Pune, India", verified: true },
    resellerCommission: "7%",
  },
  {
    slug: "thermal-camera-module-marketplace",
    name: "Thermal Imaging Camera Module",
    category: "embedded",
    icon: "Camera",
    summary: "Radiometric thermal camera module for machine monitoring and safety systems.",
    description:
      "A compact radiometric thermal camera with USB and Ethernet output for hotspot detection in panels, motors and production processes. Sold and shipped by a verified marketplace seller.",
    features: ["256 × 192 radiometric sensor", "-20 °C to 550 °C range", "USB-C and Ethernet output", "SDK for Windows and Linux"],
    specs: [
      ["Resolution", "256 × 192"],
      ["Accuracy", "±2 °C or ±2%"],
      ["Frame rate", "25 Hz"],
      ["SDK", "C / C++, Python"],
    ],
    moq: "1 unit",
    leadTime: "1 week",
    warranty: "1 year (seller)",
    certifications: ["CE", "RoHS"],
    retailInr: 34250,
    tiers: [
      { qty: "1–9", inr: 34250 },
      { qty: "10+" },
    ],
    seller: { name: "Verified marketplace seller", location: "New Taipei, Taiwan", verified: true },
    resellerCommission: "7%",
  },

  // ---------------- Second-hand & refurbished ----------------
  {
    slug: "refurbished-industrial-pc-grade-a",
    name: "Refurbished Fanless Industrial PC (Grade A)",
    category: "refurbished",
    icon: "Server",
    summary: "Fully tested ex-demo industrial PC, like-new condition, with fresh OS install.",
    description:
      "Ex-demonstration and ex-lease fanless industrial PCs, cleaned, tested for 48 hours, and supplied with a fresh Linux or Windows IoT installation and a new power supply.",
    features: ["48-hour burn-in test", "Fresh OS installation", "New power adapter", "6-month warranty"],
    specs: [
      ["Condition", "Grade A — minimal signs of use"],
      ["CPU", "Quad-core x86 / ARM (varies by unit)"],
      ["Memory", "8 GB RAM, 128 GB SSD"],
      ["Tested", "Ports, storage, thermals, 48 h burn-in"],
    ],
    moq: "1 unit",
    leadTime: "3–5 days",
    warranty: "6 months",
    certifications: ["Tested & graded"],
    condition: { grade: "A", note: "Minimal signs of use; fully functional." },
    retailInr: 13100,
    tiers: [
      { qty: "1–9", inr: 13100 },
      { qty: "10+", inr: 11900 },
    ],
    resellerCommission: "8%",
  },
  {
    slug: "pre-owned-vr-headset-bundle-grade-b",
    name: "Pre-Owned VR Headset Bundle (Grade B)",
    category: "refurbished",
    icon: "Headset",
    summary: "Event-used standalone VR headsets with new face covers, factory reset and tested.",
    description:
      "Standalone VR headsets previously used for events and training, factory reset, sanitised, fitted with new face interfaces and tested with both controllers. Ideal for training rooms and pilots.",
    features: ["Factory reset and sanitised", "New face interface", "Both controllers tested", "3-month warranty"],
    specs: [
      ["Condition", "Grade B — light cosmetic marks"],
      ["Includes", "Headset, 2 controllers, charger, new cover"],
      ["Battery health", "Tested above 85%"],
      ["Storage", "128 GB"],
    ],
    moq: "1 unit",
    leadTime: "3–5 days",
    warranty: "3 months",
    certifications: ["Tested & graded"],
    condition: { grade: "B", note: "Light cosmetic marks; fully functional." },
    retailInr: 25450,
    tiers: [
      { qty: "1–4", inr: 25450 },
      { qty: "5+", inr: 23300 },
    ],
    resellerCommission: "8%",
  },
  {
    slug: "used-smt-pick-and-place-machine",
    name: "Used SMT Pick-and-Place Machine",
    category: "refurbished",
    icon: "Cog",
    summary: "Inspected and recalibrated pick-and-place machine for small and mid-volume PCBA lines.",
    description:
      "A pre-owned pick-and-place machine inspected by our engineers, with nozzles and feeders serviced, vision recalibrated and a placement accuracy test report. Installation and training available.",
    features: ["Engineer inspection report", "Vision recalibrated", "Feeder set included", "Installation available"],
    specs: [
      ["Condition", "Grade B — serviced and recalibrated"],
      ["Placement speed", "Up to 12,000 CPH (rated)"],
      ["Component range", "0402 to 45 × 45 mm"],
      ["Feeders", "Set of 40 tape feeders"],
    ],
    moq: "1 unit",
    leadTime: "2–3 weeks",
    warranty: "3 months, parts and labour",
    certifications: ["Inspection report"],
    condition: { grade: "B", note: "Serviced, recalibrated and test-run." },
    priceOnRequest: true,
  },

  // ---------------- Free products & samples ----------------
  {
    slug: "free-esp32-evaluation-sample",
    name: "Free ESP32-S3 Module Evaluation Sample",
    category: "free",
    icon: "Gift",
    summary: "Up to 5 free modules for product companies evaluating a design. You pay shipping only.",
    description:
      "Qualified product companies can request free evaluation samples of our ESP32-S3 module to test in their design before placing a production order. Limited to one request per company per quarter.",
    features: ["Up to 5 modules free", "Datasheet and reference design", "Firmware support call", "Shipping paid by recipient"],
    specs: [
      ["Quantity", "Up to 5 pieces"],
      ["Eligibility", "Registered businesses with a product in development"],
      ["Shipping", "Paid by the recipient"],
    ],
    moq: "1 request",
    leadTime: "1 week",
    warranty: "Not applicable",
    certifications: ["FCC", "CE"],
  },
  {
    slug: "free-iot-dashboard-template",
    name: "Free IoT Dashboard Template (Digital)",
    category: "free",
    icon: "Download",
    kind: "digital",
    summary: "Open-source Grafana and Node-RED template for sensor dashboards. Download link by email.",
    description:
      "A ready-to-import dashboard template for temperature, vibration and energy data, with MQTT flow examples. Delivered as a download link by email. Free for commercial and personal use under its licence.",
    features: ["Grafana dashboards", "Node-RED flows", "MQTT examples", "Setup guide (PDF)"],
    specs: [
      ["Format", "ZIP download (JSON, PDF)"],
      ["Licence", "MIT"],
      ["Delivery", "Download link by email"],
    ],
    moq: "—",
    leadTime: "Instant",
    warranty: "Not applicable",
    certifications: ["Digital download"],
  },
  {
    slug: "free-oee-calculator",
    name: "Free OEE Calculator & Loss Tracker (Digital)",
    category: "free",
    icon: "Gauge",
    kind: "digital",
    summary: "Spreadsheet tool to calculate OEE and track the six big losses on your lines.",
    description:
      "A free spreadsheet for manufacturers starting their OEE journey: shift-wise data entry, automatic OEE calculation, loss Pareto and weekly trend charts.",
    features: ["Shift-wise data entry", "Automatic OEE calculation", "Six big losses Pareto", "Weekly trends"],
    specs: [
      ["Format", "Excel / Google Sheets"],
      ["Language", "English"],
      ["Delivery", "Download link by email"],
    ],
    moq: "—",
    leadTime: "Instant",
    warranty: "Not applicable",
    certifications: ["Digital download"],
  },

  {
    slug: "free-donated-laptops-students-ngos",
    name: "Free Refurbished Laptops for Students & NGOs (Donated)",
    category: "free",
    icon: "Laptop",
    summary: "Laptops donated by the community, wiped, tested and refurbished, given free to students and NGOs.",
    description:
      "Laptops donated to our platform are securely wiped, tested and refurbished, then given free to students, schools and NGOs who need them. Availability depends on donations; requests are reviewed in order.",
    features: ["Data-wiped and tested", "Fresh operating system", "Charger included", "Free for eligible students and NGOs"],
    specs: [
      ["Source", "Community donations"],
      ["Condition", "Refurbished, Grade B or better"],
      ["Eligibility", "Students (with ID), schools and registered NGOs"],
      ["Availability", "Subject to donations received"],
    ],
    moq: "1 per student / as needed for NGOs",
    leadTime: "Depends on availability",
    warranty: "Not applicable",
    certifications: ["Donated", "Data wiped"],
  },

  // ---------------- Giveaways ----------------
  {
    slug: "giveaway-smart-energy-meter",
    name: "Giveaway: Smart Energy Meter for Your Factory",
    category: "giveaway",
    icon: "Zap",
    summary: "Monthly draw for manufacturers: one 3-phase smart energy meter with setup support.",
    description:
      "Each month we give one smart 3-phase energy meter, plus a remote setup session, to a manufacturer starting to monitor energy. Entry is free; the winner is drawn at random from eligible entries.",
    features: ["One winner every month", "Meter plus remote setup", "Free to enter", "Winner announced by email"],
    specs: [
      ["Prize", "1 × Smart Energy Meter 3-Phase + setup session"],
      ["Eligibility", "Registered manufacturing businesses"],
      ["Draw", "Random draw on the last working day of the month"],
    ],
    moq: "1 entry per company",
    leadTime: "Prize shipped within 2 weeks",
    warranty: "Standard product warranty",
    certifications: ["Rules apply"],
    giveaway: {
      closes: "Last working day of each month",
      howToEnter: ["Submit the entry form below", "Tell us about the line you want to monitor", "One entry per company per month"],
    },
  },
  {
    slug: "giveaway-student-embedded-kit",
    name: "Giveaway: Embedded Starter Kit for Students",
    category: "giveaway",
    icon: "GraduationCap",
    summary: "Free embedded development kits for engineering students with a project idea.",
    description:
      "We support engineering students with free embedded starter kits (MCU board, sensors and cables) for final-year and hackathon projects. Selected entries are chosen by our team based on the project idea.",
    features: ["MCU board, sensors and cables", "Online mentoring session", "Certificate of participation", "Selection based on project idea"],
    specs: [
      ["Prize", "Embedded starter kit"],
      ["Eligibility", "Full-time engineering students"],
      ["Selection", "Judged on project idea, quarterly"],
    ],
    moq: "1 entry per student",
    leadTime: "Kits shipped within 3 weeks of selection",
    warranty: "Not applicable",
    certifications: ["Rules apply"],
    giveaway: {
      closes: "End of each quarter",
      howToEnter: ["Submit the entry form below", "Describe your project idea", "Use your college email address"],
    },
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductCategory(slug: string) {
  return Object.values(productCategories).find((c) => c.slug === slug);
}

export function productCategoriesByGroup(group: ProductGroup) {
  return Object.values(productCategories).filter((c) => c.group === group);
}

/** How a product is obtained: bought, claimed for free or entered as a giveaway. */
export function offerOf(p: Product): "buy" | "free" | "giveaway" {
  return p.category === "free" ? "free" : p.category === "giveaway" ? "giveaway" : "buy";
}

export function productsByCategory(id: ProductCategoryId) {
  return products.filter((p) => p.category === id);
}

export const orderingSteps = [
  { title: "Browse & shortlist", icon: "Search", text: "Explore the catalogue and compare specs. Ask for datasheets or samples for evaluation." },
  { title: "Request a quote", icon: "ClipboardCheck", text: "Send an RFQ with quantities, destination and any customisation (OEM branding, firmware, packaging)." },
  { title: "Quote & proforma invoice", icon: "Receipt", text: "Within one business day you receive tier pricing, lead time, Incoterms and a proforma invoice." },
  { title: "Purchase order & payment", icon: "CreditCard", text: "Confirm with a PO. Pay by bank transfer, letter of credit or agreed credit terms for approved accounts." },
  { title: "Production, QC & dispatch", icon: "PackageCheck", text: "Units are configured, tested and packed. You get test reports, invoices and tracking numbers." },
  { title: "Delivery & after-sales", icon: "LifeBuoy", text: "Door delivery (EXW, FOB, CIF or DDP) with installation, training, warranty and spare-parts support." },
];

export const singleOrderSteps = [
  { title: "Choose and order", icon: "PackageCheck", text: "Pick a product that shows a single-unit price and submit the order form with your delivery address." },
  { title: "Invoice & payment link", icon: "Receipt", text: "We confirm stock and email a GST / tax invoice with a secure payment link (UPI, card, net banking or bank transfer)." },
  { title: "Dispatch & tracking", icon: "Truck", text: "Once payment is received the unit is tested, packed and shipped. You receive the tracking number by email and WhatsApp." },
  { title: "Delivery & support", icon: "LifeBuoy", text: "Unbox, set up with our guides, and contact us for help. Returns follow the policy shown on the product page." },
];

export const wholesaleFaqs = [
  { q: "Do you sell to individuals?", a: "We focus on wholesale and business buyers (companies, system integrators, distributors, institutions). Small evaluation orders and samples are available for most products." },
  { q: "Where do you deliver?", a: "We deliver across India and Taiwan. Shipments to Taiwan can be sent EXW, FOB, CIF or DDP, and we handle export documents, HS codes and certificates of origin." },
  { q: "What payment terms do you offer?", a: "Bank transfer (T/T) is standard for new accounts. Letters of credit and net-30/60 credit terms are available for approved business accounts." },
  { q: "Can you supply OEM / white-label products?", a: "Yes. Products marked OEM can be supplied with your branding, custom firmware and packaging above the OEM minimum quantity." },
  { q: "Which currency are prices in?", a: "Prices are shown in Indian rupees (INR) with the New Taiwan dollar (TWD) equivalent. Customers in India are invoiced in INR and customers in Taiwan in TWD." },
  { q: "Are prices fixed?", a: "Prices shown are indicative unit prices for the stated tiers. Your final price depends on quantity, configuration, destination and current component costs, and is confirmed in the quote." },
];
