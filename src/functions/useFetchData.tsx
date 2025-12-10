import { useCallback, useEffect, useState } from "react";
import { type OpenMeteoResponse } from "../types/DashboardTypes";

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  Guayaquil: { latitude: -2.1962, longitude: -79.8862 },
  Quito: { latitude: -0.2299, longitude: -78.5249 },
  Manta: { latitude: -0.9621, longitude: -80.7121 },
  Cuenca: { latitude: -2.9005, longitude: -79.0045 },
};

interface DataState {
  loading: boolean;
  data: OpenMeteoResponse | null;
  error: string | null;
}

export default function useFetchData(selectedOption: string | null): DataState {
  
  const [dataState, setDataState] = useState<DataState>({
    loading: false,
    data: null,
    error: null,
  });

  const handleFetch = useCallback(async () => {
    try {
      const cityConfig =
        selectedOption != null
          ? CITY_COORDS[selectedOption]
          : CITY_COORDS["Guayaquil"];

      const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;

      setDataState((prev) => ({
        ...prev,
        loading: true,
      }));

      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const json = await response.json();
      setDataState({
        loading: false,
        data: json,
        error: null,
      });
    } catch (error: any) {
      setDataState({
        loading: false,
        data: null,
        error: error.message,
      });
    }
  }, [selectedOption]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return dataState;
}
