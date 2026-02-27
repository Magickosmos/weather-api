// -------------------------------------------------------------------------
/**
 * Weather Service
 * 
 * Responsible for retrieving geographic coordinates from a ZIP code
 * and fetching current weather data from an external weather API.
 * Handles temperature conversion between Celsius and Fahrenheit.
 *
 * External API Used:
 * - Open-Meteo (Geocoding + Forecast API)
 *
 * @author Alexander Smith (smithaj201)
 * @version 1
 */
// -------------------------------------------------------------------------
import axios from 'axios';

interface GeoResponse {
    results: { latitude: number; longitude: number }[];
}

// Convert ZIP → Lat/Lon → Temperature
export async function getTemperature(zip: string, scale: string): Promise<number | null> {
    try {
        // 1️⃣ Geocode ZIP
        const geoRes = await axios.get<GeoResponse>(
            `https://geocoding-api.open-meteo.com/v1/search?name=${zip}&count=1`
        );

        const location = geoRes.data.results?.[0];
        if (!location) return null;

        const { latitude, longitude } = location;

        // 2️⃣ Get current weather
        const weatherRes = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );

        let temp = weatherRes.data.current_weather?.temperature;
        if (temp === undefined) return null;

        // 3️⃣ Convert to Fahrenheit if needed
        if (scale === 'Fahrenheit') {
            temp = Math.round((temp * 9) / 5 + 32);
        } else {
            temp = Math.round(temp);
        }

        return temp;
    } catch (err) {
        console.error(err);
        return null;
    }
}