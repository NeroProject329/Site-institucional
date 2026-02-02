// src/lib/openWhatsApp.ts
export function openWhatsApp(phoneDigits: string, message: string) {
  const phone = String(phoneDigits || "").replace(/\D/g, "");
  if (!phone) return false;

  const text = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${text}`;

  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}
