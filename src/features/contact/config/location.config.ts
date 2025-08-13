interface LocationConfig {
  coordinates: {
    lat: number;
    lng: number;
    zoom: number;
  };
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  mapSettings: {
    width: string;
    height: string;
    zoom: number;
    markerColor: string;
    mapType: 'roadmap' | 'satellite' | 'terrain' | 'hybrid';
  };
}

export const locationConfig: LocationConfig = {
  coordinates: {
    lat: 27.2038, // Kuchaman City coordinates
    lng: 74.8565,
    zoom: 12,
  },
  address: {
    line1: 'Kuchaman City',
    line2: 'Nagaur District',
    city: 'Kuchaman',
    state: 'Rajasthan',
    country: 'India',
    postalCode: '341708',
  },
  mapSettings: {
    width: '100%',
    height: '100%',
    zoom: 12,
    markerColor: '#3b82f6', // blue-500
    mapType: 'roadmap',
  },
};

export const getGoogleMapsEmbedUrl = (config: LocationConfig): string => {
  const { lat, lng, zoom } = config.coordinates;
  const { mapType } = config.mapSettings;
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    console.error('Google Maps API key is not set in environment variables');
    return '';
  }

  return `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${lat},${lng}&zoom=${zoom}&maptype=${mapType}`;
};

export const getGoogleMapsDirectionsUrl = (config: LocationConfig): string => {
  const { lat, lng } = config.coordinates;
  const { address } = config;
  // Using the full address in the directions URL for better accuracy
  const destination = encodeURIComponent(`${address.line1}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
};
