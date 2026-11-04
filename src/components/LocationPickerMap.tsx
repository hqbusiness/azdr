"use client";

import { useEffect, useRef } from "react";

interface LocationPickerMapProps {
  latitude: number;
  longitude: number;
  onChange: (lat: number, lng: number) => void;
  height?: string;
}

export default function LocationPickerMap({
  latitude,
  longitude,
  onChange,
  height = "320px",
}: LocationPickerMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      const lat = typeof latitude === "number" && !isNaN(latitude) ? latitude : 4.711;
      const lng = typeof longitude === "number" && !isNaN(longitude) ? longitude : -74.0721;

      if (!mapInstanceRef.current) {
        // Init map
        const map = L.map(mapContainerRef.current, {
          center: [lat, lng],
          zoom: 13,
          scrollWheelZoom: false,
        });
        mapInstanceRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap',
          maxZoom: 19,
        }).addTo(map);

        const customIcon = L.divIcon({
          className: "custom-leaflet-marker",
          html: `
            <div style="
              background: #0284c7;
              color: white;
              width: 38px;
              height: 38px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 12px rgba(0,0,0,0.35);
              border: 3px solid white;
              cursor: grab;
            ">
              <div style="transform: rotate(45deg); font-weight: bold; font-size: 16px;">📍</div>
            </div>
          `,
          iconSize: [38, 38],
          iconAnchor: [19, 38],
        });

        const marker = L.marker([lat, lng], {
          icon: customIcon,
          draggable: true,
        }).addTo(map);

        markerRef.current = marker;

        // When dragged
        marker.on("dragend", (event: any) => {
          const position = event.target.getLatLng();
          onChange(Number(position.lat.toFixed(6)), Number(position.lng.toFixed(6)));
        });

        // When clicked anywhere on the map
        map.on("click", (e: any) => {
          marker.setLatLng(e.latlng);
          onChange(Number(e.latlng.lat.toFixed(6)), Number(e.latlng.lng.toFixed(6)));
        });
      } else {
        // Map exists, update center and marker if changed externally (e.g. city select)
        const map = mapInstanceRef.current;
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
          map.setView([lat, lng], map.getZoom());
        }
      }
    });

    return () => {
      // Don't unmount immediately on simple prop changes
    };
  }, [latitude, longitude, onChange]);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-slate-300 relative shadow-inner">
      <div ref={mapContainerRef} style={{ width: "100%", height }} />
      <div className="absolute top-2 right-2 z-[400] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow border border-slate-200">
        Haz clic en el mapa o arrastra el marcador 📍
      </div>
    </div>
  );
}
