import React from "react";
import "./PredictionFormatter.css";
const PredictionFormatter = ({ consejo }) => {
  // Función para parsear el texto y extraer secciones
  const parseConsejo = (text) => {
    if (!text) return null;

    const sections = [];

    // Dividir por títulos principales (con **)
    const parts = text.split(/\*\*([^*]+)\*\*/g);

    let currentSection = null;

    parts.forEach((part, index) => {
      const trimmed = part.trim();
      if (!trimmed) return;

      // Si es un índice impar, es un título
      if (index % 2 === 1) {
        // Detectar si es un número de sección
        if (/^\d+\./.test(trimmed)) {
          if (currentSection) sections.push(currentSection);
          currentSection = {
            title: trimmed.replace(/^\d+\.\s*/, ""),
            content: [],
          };
        } else if (currentSection) {
          currentSection.content.push({ type: "subtitle", text: trimmed });
        }
      } else {
        // Es contenido
        if (currentSection) {
          // Dividir por líneas
          const lines = trimmed.split("\n").filter((l) => l.trim());
          lines.forEach((line) => {
            if (line.trim().startsWith("-")) {
              currentSection.content.push({
                type: "bullet",
                text: line.replace(/^-\s*/, "").trim(),
              });
            } else if (line.trim()) {
              currentSection.content.push({
                type: "text",
                text: line.trim(),
              });
            }
          });
        }
      }
    });

    if (currentSection) sections.push(currentSection);

    return sections;
  };

  const sections = parseConsejo(consejo);

  if (!sections || sections.length === 0) {
    return (
      <div style={styles.container}>
        <p style={styles.rawText}>{consejo}</p>
      </div>
    );
  }

  // Iconos para cada sección
  const getIcon = (title) => {
    if (title.includes("Causa")) return "🔍";
    if (title.includes("Solución")) return "⚡";
    if (title.includes("Preventiva")) return "🛡️";
    if (title.includes("Recomendacion")) return "💡";
    return "📌";
  };

  return (
    <div style={styles.container}>
      {sections.map((section, idx) => (
        <div key={idx} style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.icon}>{getIcon(section.title)}</span>
            <h3 style={styles.sectionTitle}>{section.title}</h3>
          </div>

          <div style={styles.sectionContent}>
            {section.content.map((item, itemIdx) => {
              if (item.type === "subtitle") {
                return (
                  <h4 key={itemIdx} style={styles.subtitle}>
                    {item.text}
                  </h4>
                );
              }

              if (item.type === "bullet") {
                return (
                  <div key={itemIdx} style={styles.bulletItem}>
                    <span style={styles.bulletPoint}>•</span>
                    <span style={styles.bulletText}>{item.text}</span>
                  </div>
                );
              }

              return (
                <p key={itemIdx} style={styles.text}>
                  {item.text}
                </p>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "0",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  section: {
    marginBottom: "24px",
    borderLeft: "4px solid #dc3545",
    paddingLeft: "20px",
    animation: "fadeIn 0.5s ease-in",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
    gap: "12px",
  },
  icon: {
    fontSize: "28px",
    lineHeight: "1",
  },
  sectionTitle: {
    margin: "0",
    fontSize: "20px",
    fontWeight: "700",
    color: "#2c3e50",
    letterSpacing: "-0.5px",
  },
  sectionContent: {
    paddingLeft: "40px",
  },
  subtitle: {
    margin: "12px 0 8px 0",
    fontSize: "16px",
    fontWeight: "600",
    color: "#34495e",
  },
  bulletItem: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "10px",
    padding: "8px 12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "6px",
    transition: "all 0.3s ease",
  },
  bulletPoint: {
    color: "#dc3545",
    fontSize: "18px",
    fontWeight: "bold",
    marginRight: "12px",
    marginTop: "2px",
    flexShrink: 0,
  },
  bulletText: {
    color: "#495057",
    fontSize: "15px",
    lineHeight: "1.6",
    flex: 1,
  },
  text: {
    margin: "8px 0",
    color: "#6c757d",
    fontSize: "15px",
    lineHeight: "1.7",
  },
  rawText: {
    whiteSpace: "pre-wrap",
    color: "#495057",
    fontSize: "15px",
    lineHeight: "1.7",
  },
};

export default PredictionFormatter;
