// -------------------------------------------------------------------------
/**
 * Locations Route
 * 
 * Handles GET /locations/:zip requests.
 * Validates input, processes optional scale query parameter,
 * and returns the current temperature for the specified ZIP code.
 *
 * @author Alexander Smith (smithaj201)
 * @version 1
 */
// -------------------------------------------------------------------------

import { Router, Request, Response } from 'express';
import { getTemperature } from '../services/weatherService';

const router = Router();

router.get('/:zip', async (req: Request, res: Response) => {
    let zipParam = req.params.zip;
    if (Array.isArray(zipParam)) zipParam = zipParam[0];
    const zip = String(zipParam);

    if (!/^\d{5}$/.test(zip)) {
        return res.status(400).json({ error: 'Invalid ZIP code' });
    }

    const rawScale = req.query.scale;
    let scale: string;

    if (Array.isArray(rawScale)) {
        scale = String(rawScale[0]);
    } else if (typeof rawScale === 'string') {
        scale = rawScale;
    } else {
        scale = 'Fahrenheit'; // default
    }

    scale = scale.toLowerCase() === 'celsius' ? 'Celsius' : 'Fahrenheit';

    try {
        const temperature = await getTemperature(zip, scale);
        if (temperature === null) {
            return res.status(404).json({ error: 'Location not found' });
        }

        return res.status(200).json({ temperature, scale });
    } catch (err) {
        console.error('Error fetching temperature:', err);
        return res.status(500).json({ error: 'Failed to fetch temperature' });
    }
});

export default router;