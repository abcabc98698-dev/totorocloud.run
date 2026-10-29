import { type Language } from "../i18n";

export interface Project {
  name: string;
  description: string;
  url: string;
  icon: string;
  tech: string[];
  status: string;
}

export function getProjects(lang: Language): Project[] {
  const es = lang === "es";
  return [
    {
      name: "TotoroCloud Edge",
      description: es
        ? "Infraestructura distribuida en el borde de alto rendimiento, balanceo inteligente y motor de computación con latencia ultra baja."
        : "High-performance distributed edge infrastructure, intelligent traffic routing, and ultra-low latency compute engine.",
      url: "https://totorocloud.run/projects/",
      icon: "icon-[lucide--cloud]",
      tech: ["Rust", "Edge Computing", "Wasm"],
      status: es ? "En producción" : "Active",
    },
    {
      name: "TotoroCloud Mesh",
      description: es
        ? "Malla de servicios zero-trust ligera para comunicación segura entre servicios y observabilidad en tiempo real."
        : "Lightweight zero-trust service mesh providing secure service-to-service communication and real-time observability.",
      url: "https://totorocloud.run/projects/",
      icon: "icon-[lucide--network]",
      tech: ["Go", "Kubernetes", "eBPF"],
      status: es ? "En producción" : "Active",
    },
  ];
}
