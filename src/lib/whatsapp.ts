/**
 * Limpia y normaliza un número de WhatsApp asegurando formato internacional sin caracteres especiales ni signos +.
 */
export function sanitizeWhatsAppNumber(phone: string): string {
  if (!phone) return "";
  // Elimina espacios, guiones, paréntesis y signos +
  return phone.replace(/[^0-9]/g, "");
}

/**
 * Genera el enlace directo a WhatsApp (https://wa.me/...) con un mensaje predeterminado.
 */
export function buildWhatsAppLink(phone: string, businessName?: string, customMessage?: string): string {
  const cleanNumber = sanitizeWhatsAppNumber(phone);
  if (!cleanNumber) return "#";

  let message = customMessage;
  if (!message) {
    message = businessName
      ? `¡Hola! Vi su negocio "${businessName}" en AZ DIRECTORIO Empresarial (azdirectorio.com) y me gustaría solicitar más información.`
      : "¡Hola! Vi su negocio en AZ DIRECTORIO Empresarial y me gustaría solicitar información.";
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

/**
 * Formatea un número de teléfono para visualización amigable en la interfaz (ej: +57 300 123 4567)
 */
export function formatDisplayPhone(phone: string): string {
  if (!phone) return "";
  const clean = phone.trim();
  if (clean.startsWith("+")) return clean;
  return `+${clean}`;
}
