"use client";

import { useEffect, useState } from "react";

interface Props {
  phone: string;
  prefillMessage: string;
  openDay: string;
  closeDay: string;
  openTime: string;
  closeTime: string;
  holidayNote: string;
}

const DAY_ORDER: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

function to12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function FooterWhatsAppWidget({
  phone, prefillMessage, openDay, closeDay, openTime, closeTime, holidayNote,
}: Props) {
  const [online, setOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Colombo",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(now);

    const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
    const hour    = parts.find((p) => p.type === "hour")?.value    ?? "0";
    const minute  = parts.find((p) => p.type === "minute")?.value  ?? "0";

    const currentDay  = DAY_ORDER[weekday] ?? -1;
    const openDayNum  = DAY_ORDER[openDay]  ?? 1;
    const closeDayNum = DAY_ORDER[closeDay] ?? 5;

    const currentMins = parseInt(hour) * 60 + parseInt(minute);
    const [oH, oM]    = openTime.split(":").map(Number);
    const [cH, cM]    = closeTime.split(":").map(Number);

    const dayOk  = currentDay >= openDayNum && currentDay <= closeDayNum;
    const timeOk = currentMins >= oH * 60 + oM && currentMins < cH * 60 + cM;

    setOnline(dayOk && timeOk);
  }, [openDay, closeDay, openTime, closeTime]);

  const waUrl = phone
    ? `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(prefillMessage)}`
    : undefined;

  return (
    <div>
      {/* Widget card */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Aurex Support on WhatsApp"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 14px",
          borderRadius: 6,
          backgroundColor: "var(--color-gold-500)",
          textDecoration: "none",
          marginBottom: 14,
          cursor: waUrl ? "pointer" : "default",
        }}
      >
        {/* WhatsApp icon */}
        <div
          style={{
            flexShrink: 0, width: 36, height: 36, borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: "white", fontWeight: 600, fontSize: 13, margin: 0, fontFamily: "var(--font-body)" }}>
            Aurex Support
          </p>
          <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 11, margin: "2px 0 0", fontFamily: "var(--font-body)" }}>
            Need Help? Chat with us via WhatsApp
          </p>
        </div>

        {/* Online/offline dot — only once mounted (avoids SSR mismatch) */}
        {online !== null && (
          <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span
              style={{
                width: 8, height: 8, borderRadius: "50%",
                backgroundColor: online ? "#4ade80" : "#9ca3af",
                display: "block",
              }}
            />
            <span style={{ color: "white", fontSize: 9, fontWeight: 700, letterSpacing: "0.04em", fontFamily: "var(--font-body)" }}>
              {online ? "ONLINE" : "OFFLINE"}
            </span>
          </div>
        )}
      </a>

      {/* Business hours */}
      <div style={{ fontSize: 12, lineHeight: 1.7, fontFamily: "var(--font-body)", color: "var(--color-fg-tertiary)" }}>
        <p style={{ margin: 0 }}>
          <span style={{ color: "var(--color-fg-muted)" }}>{openDay}–{closeDay}:</span>{" "}
          {to12h(openTime)} – {to12h(closeTime)}
        </p>
        <p style={{ margin: 0 }}>Sri Lanka Time · GMT+5:30</p>
        {holidayNote && (
          <p style={{ margin: "6px 0 0", fontStyle: "italic" }}>{holidayNote}</p>
        )}
      </div>
    </div>
  );
}
