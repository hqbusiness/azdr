"use client";

import { useEffect, useRef } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  name: string;
  address: string;
  categoryName?: string;
  whatsapp?: string;
  zoom?: number;
  height?: string;
}

export default function LeafletMap({
  latitude,
  longitude,
  name,
  address,
  categoryName,
  whatsapp,
  zoom = 15,
  height = "380px",
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    // Dynamically load leaflet only on client side
    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Check coordinates validity
      const lat = typeof latitude === "number" && !isNaN(latitude) ? latitude : 4.711;
      const lng = typeof longitude === "number" && !isNaN(longitude) ? longitude : -74.0721;

      // Create Map
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: zoom,
        scrollWheelZoom: false,
      });
      mapInstanceRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Custom marker icon with Tailwind-like SVG styling
      const customIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div style="
            background: #108863;
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid white;
          ">
            <div style="transform: rotate(45deg); font-weight: bold; font-size: 16px;">📍</div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      });

      // WhatsApp link for popup
      const waLink = whatsapp ? buildWhatsAppLink(whatsapp, name) : null;
      const waButtonHtml = waLink
        ? `<div style="margin-top: 8px;">
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" style="
              display: inline-block;
              background: #059669;
              color: white;
              padding: 4px 10px;
              border-radius: 8px;
              text-decoration: none;
              font-size: 11px;
              font-weight: 600;
            ">💬 WhatsApp</a>
           </div>`
        : "";

      const popupContent = `
        <div style="font-family: inherit; min-width: 170px;">
          <span style="font-size: 10px; text-transform: uppercase; font-weight: bold; color: #108863;">${categoryName || "Negocio"}</span>
          <h4 style="font-size: 14px; font-weight: bold; margin: 2px 0 4px 0; color: #0f172a;">${name}</h4>
          <p style="font-size: 12px; color: #475569; margin: 0;">${address}</p>
          ${waButtonHtml}
        </div>
      `;

      // Add Marker
      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(popupContent).openPopup();
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, name, address, categoryName, whatsapp, zoom]);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
      <div ref={mapContainerRef} style={{ width: "100%", height: height }} />
    </div>
  );
}
