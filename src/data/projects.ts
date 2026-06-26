export type Project = {
  slug: string
  name: string
  subtitle: string
  year: string
  status: 'ACTIVE' | 'COMPLETE' | 'RESEARCH'
  description: string
  longDescription: string
  stack: string[]
  github?: string
  team: string[]
  highlight: string
}

export const projects: Project[] = [
  {
    slug: 'desk-helper',
    name: 'DESK HELPER',
    subtitle: 'PROGRAMMABLE MACRO PAD',
    year: '2024–2025',
    status: 'COMPLETE',
    description: 'A fully programmable RP2040-powered macro pad with dynamic key remapping, 5 onboard profiles, and a cross-platform Tauri + React configurator.',
    longDescription: 'Engineered a fully programmable RP2040-powered macro pad with dynamic key remapping, 5 onboard profiles, and a macro engine — all stored in EEPROM without reflashing. Built a cross-platform Tauri + React desktop configurator (Windows / Linux / macOS) for live keymap editing, OLED image uploads, and one-click UF2 firmware flashing. Implemented a custom Raw HID communication protocol over USB between QMK firmware and the Rust/HIDAPI backend.',
    stack: ['QMK FIRMWARE', 'RUST', 'TAURI 2', 'REACT', 'TYPESCRIPT', 'ZUSTAND', 'RP2040'],
    github: 'https://github.com/Maskedhelp2/desk-helper',
    team: ['Karthik Kumar', 'Aahana Hajariwala', 'Rohan Alex Basil', 'Sparsh Tyagi'],
    highlight: 'Raw HID over USB — firmware talks directly to desktop without drivers.',
  },
  {
    slug: 'slam-nav',
    name: 'SLAM NAV SYSTEM',
    subtitle: 'AUTONOMOUS 2D/3D LIDAR FUSION',
    year: '2025',
    status: 'RESEARCH',
    description: 'Real-time SLAM pipeline using 2D LiDAR with a custom-built 3D module for full volumetric point-cloud generation in unknown environments.',
    longDescription: 'Designed and implemented a real-time SLAM (Simultaneous Localization and Mapping) pipeline using 2D LiDAR sensors, enabling a mobile robot to autonomously map and navigate unknown environments. Extended the system with a custom-fabricated 3D LiDAR module — achieved full volumetric point-cloud generation by mechanically rotating a 2D sensor and fusing scan data across axes. Integrated ROS2, pose-graph optimization, and sensor-fusion algorithms to achieve sub-centimetre mapping accuracy in dynamic indoor environments.',
    stack: ['ROS2', 'PYTHON', 'C++', 'PCL', 'SLAM TOOLBOX', 'RPLIDAR'],
    team: ['Karthik Kumar'],
    highlight: 'Sub-centimetre mapping accuracy using a DIY 3D LiDAR built from a rotating 2D sensor.',
  },
  {
    slug: 'aria',
    name: 'ARIA',
    subtitle: 'AI WASTE SEGREGATION ROBOT',
    year: '2025',
    status: 'RESEARCH',
    description: 'End-to-end autonomous waste segregation combining a 6-DOF robotic arm with real-time YOLO-based computer vision for multi-class classification.',
    longDescription: 'Developed an end-to-end autonomous waste segregation system combining a 6-DOF robotic manipulator with a real-time computer vision pipeline for multi-class waste classification. Trained a custom YOLO-based object detection model to identify and classify waste categories (plastic, metal, organic, paper) with >90% accuracy under varied lighting conditions. Implemented inverse kinematics for precise pick-and-place operations, enabling the robotic arm to grip irregularly shaped objects and deposit them into the correct segregation bin.',
    stack: ['PYTHON', 'PYTORCH', 'OPENCV', 'ROS2', 'ARDUINO', 'YOLO', 'SERVO CONTROL'],
    team: ['Karthik Kumar'],
    highlight: '>90% classification accuracy across 4 waste categories with custom-trained YOLO.',
  },
]
