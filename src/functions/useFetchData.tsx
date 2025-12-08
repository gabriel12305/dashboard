import { useCallback, useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';


interface DataState {
    loading: boolean;
    data: OpenMeteoResponse | null;
    error: string | null;
}

export default function useFetchData(): DataState {
    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m';

    const [dataState, setDataState] = useState<DataState>({
        loading: false,
        data: null,
        error: null
    });

    const handleFecth = useCallback(async () => {
        try {
            setDataState(prev => ({
                ...prev,
                loading: true
            }))
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const json = await response.json();
            setDataState(prev => ({
                ...prev,
                loading: false,
                data: json
            }))
        } catch (error) {
            setDataState(prev => ({
                ...prev,
                loading: false,
                error: (error as Error).message
            }))
        }
    }, [])

    useEffect(() => {
        handleFecth();
    }, []);

    return {
        ...dataState
    };
}