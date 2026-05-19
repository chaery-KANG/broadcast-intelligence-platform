import { useEffect, useState } from "react";

type Anomaly = {
  date: string;
  type: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  message: string;
  filename?: string;
};

type CoverageItem = {
  clean_count: number;
  oa_count: number;
  missing_slots: string[];
  fallback_used: boolean;
  coverage_score: number;
};

type ReportData = {
  detected_files: number;
  coverage: Record<string, CoverageItem>;
  anomalies: Anomaly[];
};

function App() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/report")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setReport(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div style={styles.page}>ERROR: {error}</div>;
  }

  if (!report) {
    return <div style={styles.page}>Loading...</div>;
  }

  const firstDate = Object.keys(report.coverage)[0];
  const coverage = report.coverage[firstDate];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Broadcast Intelligence Platform</h1>
          <p style={styles.subtitle}>
            Secure metadata-driven archive monitoring dashboard
          </p>
        </div>
        <div style={styles.badge}>NAS Archive Monitor</div>
      </header>

      <section style={styles.cards}>
        <div style={styles.card}>
          <p style={styles.cardLabel}>Detected Files</p>
          <h2 style={styles.cardNumber}>{report.detected_files}</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.cardLabel}>Coverage Score</p>
          <h2 style={styles.cardNumber}>{coverage.coverage_score}%</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.cardLabel}>CLEAN / OA</p>
          <h2 style={styles.cardNumber}>
            {coverage.clean_count} / {coverage.oa_count}
          </h2>
        </div>

        <div style={styles.card}>
          <p style={styles.cardLabel}>Missing Slots</p>
          <h2 style={styles.cardNumber}>
            {coverage.missing_slots.length === 0
              ? "None"
              : coverage.missing_slots.join(", ")}
          </h2>
        </div>
      </section>

      <section style={styles.panel}>
        <h2 style={styles.sectionTitle}>Archive Coverage</h2>
        <div style={styles.progressOuter}>
          <div
            style={{
              ...styles.progressInner,
              width: `${coverage.coverage_score}%`,
            }}
          />
        </div>
        <p style={styles.note}>
          Date: {firstDate} / Fallback Used:{" "}
          {coverage.fallback_used ? "Yes" : "No"}
        </p>
      </section>

      <section style={styles.panel}>
        <h2 style={styles.sectionTitle}>Anomaly Report</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Severity</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Message</th>
            </tr>
          </thead>
          <tbody>
            {report.anomalies.map((item, index) => (
              <tr key={index}>
                <td style={styles.td}>{item.date}</td>
                <td style={styles.td}>
                  <span style={severityStyle(item.severity)}>
                    {item.severity}
                  </span>
                </td>
                <td style={styles.td}>{item.type}</td>
                <td style={styles.td}>{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function severityStyle(severity: Anomaly["severity"]) {
  const base = {
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
  };

  if (severity === "HIGH") {
    return { ...base, background: "#fee2e2", color: "#991b1b" };
  }

  if (severity === "MEDIUM") {
    return { ...base, background: "#fef3c7", color: "#92400e" };
  }

  return { ...base, background: "#dbeafe", color: "#1e40af" };
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: 40,
    background: "#f8fafc",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    color: "#0f172a",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 34,
    margin: 0,
  },
  subtitle: {
    marginTop: 8,
    color: "#64748b",
  },
  badge: {
    background: "#0f172a",
    color: "white",
    padding: "10px 16px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 700,
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    marginBottom: 24,
  },
  card: {
    background: "white",
    borderRadius: 18,
    padding: 24,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e2e8f0",
  },
  cardLabel: {
    margin: 0,
    color: "#64748b",
    fontSize: 14,
  },
  cardNumber: {
    margin: "12px 0 0",
    fontSize: 30,
  },
  panel: {
    background: "white",
    borderRadius: 18,
    padding: 24,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e2e8f0",
    marginBottom: 24,
  },
  sectionTitle: {
    marginTop: 0,
    fontSize: 20,
  },
  progressOuter: {
    width: "100%",
    height: 16,
    background: "#e2e8f0",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressInner: {
    height: "100%",
    background: "#2563eb",
    borderRadius: 999,
  },
  note: {
    color: "#64748b",
    marginTop: 12,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px 10px",
    borderBottom: "1px solid #e2e8f0",
    color: "#475569",
    fontSize: 13,
  },
  td: {
    padding: "14px 10px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: 14,
  },
};

export default App;