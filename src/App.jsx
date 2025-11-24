import { useEffect, useState } from "react";

export default function TelemetryDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:5050/api/telemetry")
        .then((res) => res.json())
        .then(setData)
        .catch(console.error);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (!data) return <p style={styles.text}>Waiting for telemetry...</p>;

  const pressures = data.m_tyresPressure || [];
  const temps = data.m_tyresInnerTemperature || [];


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏎️ F1 24 Telemetry</h2>

      <p style={styles.text}>Speed: {data.m_speed?.toFixed?.(0) ?? 0} km/h</p>
      <p style={styles.text}>Gear: {data.m_gear ?? 0}</p>
      <p style={styles.text}>RPM: {data.m_engineRPM ?? 0}</p>
      <p style={styles.text}>Throttle: {((data.m_throttle ?? 0) * 100).toFixed(0)}%</p>
      <p style={styles.text}>Brake: {((data.m_brake ?? 0) * 100).toFixed(0)}%</p>
      <p style={styles.text}>Steer: {((data.m_steer ?? 0) * 100).toFixed(0)}%</p>

      <h3 style={styles.subtitle}>🛞 Tyres</h3>

      <p style={styles.text}>
        Tyre Pressure (FL): {pressures[0]?.toFixed?.(1) || "0"} PSI
      </p>
      <p style={styles.text}>
        Tyre Pressure (FR): {pressures[1]?.toFixed?.(1) || "0"} PSI
      </p>
      <p style={styles.text}>
        Tyre Pressure (RR): {pressures[2]?.toFixed?.(1) || "0"} PSI
      </p>
      <p style={styles.text}>
        Tyre Pressure (RL): {pressures[3]?.toFixed?.(1) || "0"} PSI
      </p>

      <h3 style={styles.subtitle}>🌡️ Tyre Temperatures</h3>

      <p style={styles.text}>
        Tyre Temp (FL): {temps[0] || 0}°C
      </p>
      <p style={styles.text}>
        Tyre Temp (FR): {temps[1] || 0}°C
      </p>
      <p style={styles.text}>
        Tyre Temp (RR): {temps[2] || 0}°C
      </p>
      <p style={styles.text}>
        Tyre Temp (RL): {temps[3] || 0}°C
      </p>
      
      <div style={styles.grid}>
        {pressures.length > 0 ? (
          pressures.map((p, i) => (
            <div key={i} style={styles.card}>
              <p style={styles.small}>Tyre {i + 1}</p>
              <p style={styles.value}>{p.toFixed(1)} PSI</p>
            </div>
          ))
        ) : (
          <p style={styles.text}>No tyre data yet...</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#111",
    color: "white",
    fontFamily: "monospace",
    padding: 20,
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    textDecoration: "underline",
  },
  text: {
    fontSize: 18,
    margin: "6px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 10,
    marginTop: 10,
  },
  card: {
    background: "#222",
    padding: 10,
    borderRadius: 8,
  },
  small: { fontSize: 14, color: "#aaa" },
  value: { fontSize: 18, fontWeight: "bold" },
};
