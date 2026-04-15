// ============================================================
// PORTFOLIO CONFIG — edit this file to update all content
// ============================================================

export const bio = {
  name: "Devi Prasad Dash",
  title: "AI/ML Engineer & Full-Stack Developer",
  tagline: "Building intelligent systems at the edge of possibility.",
  about:
    "I'm an AI/ML engineer who loves building production-grade intelligent systems. " +
    "From LLM-powered applications to real-time computer vision pipelines, I craft " +
    "experiences that make complex technology feel effortless.",
  avatar: null, // path to avatar image if any
  location: "India",
  email: "deviprasad@example.com",
  github: "https://github.com/deviprasaddash",
  linkedin: "https://linkedin.com/in/deviprasaddash",
  twitter: "https://twitter.com/deviprasaddash",
};

export const projects = [
  {
    id: 1,
    title: "NeuralDraft",
    subtitle: "AI Resume Builder",
    description:
      "GPT-4 + LangChain powered resume builder that tailors your CV to any job description in seconds. Achieved 92% ATS pass rate in testing.",
    tech: ["GPT-4", "LangChain", "FastAPI", "React", "PostgreSQL"],
    color: "#00f5ff",
    emoji: "📄",
    github: "https://github.com/deviprasaddash/neuraldraft",
    live: "#",
  },
  {
    id: 2,
    title: "VisionBoard",
    subtitle: "Real-Time Object Detection",
    description:
      "Browser-native real-time object detection using YOLOv8 + WebRTC. Detects 80 object classes at 30 FPS directly in the browser — no server needed.",
    tech: ["YOLOv8", "WebRTC", "ONNX", "React", "Canvas API"],
    color: "#7b2fff",
    emoji: "👁️",
    github: "https://github.com/deviprasaddash/visionboard",
    live: "#",
  },
  {
    id: 3,
    title: "SentimentPulse",
    subtitle: "Social Sentiment Dashboard",
    description:
      "Real-time Twitter/X sentiment analysis dashboard powered by fine-tuned BERT. Tracks trends, topic clusters, and emotion shifts live.",
    tech: ["BERT", "FastAPI", "React", "D3.js", "Redis"],
    color: "#ff2d78",
    emoji: "📊",
    github: "https://github.com/deviprasaddash/sentimentpulse",
    live: "#",
  },
  {
    id: 4,
    title: "PrepMate AI",
    subtitle: "Adaptive Interview Prep",
    description:
      "AI-driven mock interview platform with personalized feedback, skill gap analysis, and adaptive question generation using RAG pipelines.",
    tech: ["RAG", "OpenAI", "React", "Node.js", "MongoDB"],
    color: "#00ff88",
    emoji: "🎯",
    github: "https://github.com/deviprasaddash/prepmate-ai",
    live: "#",
  },
];

export const skills = [
  // AI/ML
  { name: "PyTorch", category: "AI/ML", color: "#ee4c2c", level: 90 },
  { name: "TensorFlow", category: "AI/ML", color: "#ff6f00", level: 85 },
  { name: "LangChain", category: "AI/ML", color: "#00f5ff", level: 92 },
  { name: "scikit-learn", category: "AI/ML", color: "#f89340", level: 88 },
  { name: "OpenCV", category: "AI/ML", color: "#5c3ee8", level: 80 },

  // Frontend
  { name: "React", category: "Frontend", color: "#61dafb", level: 95 },
  { name: "Three.js", category: "Frontend", color: "#ffffff", level: 78 },
  { name: "TypeScript", category: "Frontend", color: "#3178c6", level: 85 },
  { name: "Next.js", category: "Frontend", color: "#aaaaaa", level: 82 },

  // Backend
  { name: "FastAPI", category: "Backend", color: "#009688", level: 88 },
  { name: "Node.js", category: "Backend", color: "#68a063", level: 80 },
  { name: "PostgreSQL", category: "Backend", color: "#336791", level: 75 },
  { name: "Redis", category: "Backend", color: "#dc382d", level: 70 },

  // Tools
  { name: "Docker", category: "Tools", color: "#2496ed", level: 82 },
  { name: "AWS", category: "Tools", color: "#ff9900", level: 72 },
  { name: "Git", category: "Tools", color: "#f05032", level: 95 },
];

export const skillCategories = [
  { name: "AI/ML", color: "#00f5ff", position: [3, 0, 0] },
  { name: "Frontend", color: "#7b2fff", position: [-3, 0, 0] },
  { name: "Backend", color: "#ff2d78", position: [0, 3, 0] },
  { name: "Tools", color: "#00ff88", position: [0, -3, 0] },
];

export const navItems = [
  { label: "Hero", id: "hero" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export const aiAssistantQA = [
  {
    q: "Who are you?",
    a: "I'm Devi Prasad Dash — an AI/ML engineer building intelligent, production-grade applications.",
  },
  {
    q: "What's your best project?",
    a: "PrepMate AI is closest to my heart — it combines RAG, adaptive learning, and real-time feedback into one platform.",
  },
  {
    q: "What tech do you love?",
    a: "LangChain, PyTorch, React Three Fiber, and FastAPI. I love the intersection of AI and beautiful interfaces.",
  },
  {
    q: "Are you available for hire?",
    a: "Yes! Drop me an email at deviprasad@example.com or connect on LinkedIn.",
  },
  {
    q: "How long have you been coding?",
    a: "Over 4+ years, with deep focus on AI/ML for the last 2 years. Always learning!",
  },
];
