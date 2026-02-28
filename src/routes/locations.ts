// -------------------------------------------------------------------------
/**
 * Locations Route
 *
 * Handles GET /locations/:zip requests.
 * Validates input, processes optional scale query parameter,
 * and returns the current temperature for the specified ZIP code.
 *
 * @author Alexander Smith (smithaj201)
 * @version 2
 */
// -------------------------------------------------------------------------

import { Router, Request, Response } from 'express';
import { getTemperature } from '../services/weatherService';

const router = Router();

router.get('/:zip', async (req: Request, res: Response) => {

    /* =============================
       ZIP VALIDATION
    ============================== */

    const zipParam = Array.isArray(req.params.zip)
        ? req.params.zip[0]
        : req.params.zip;

    const zip = String(zipParam);

    if (!/^\d{5}$/.test(zip)) {
        return res.status(400).json({ error: 'Invalid ZIP code' });
    }

    /* =============================
       SCALE VALIDATION
    ============================== */

    const rawScale = Array.isArray(req.query.scale)
        ? req.query.scale[0]
        : req.query.scale;

    let scale: 'Fahrenheit' | 'Celsius';

    // Default when missing or empty
    if (!rawScale || String(rawScale).trim() === '') {
        scale = 'Fahrenheit';
    } else {
        const normalized = String(rawScale).trim().toLowerCase();

        if (normalized === 'celsius') {
            scale = 'Celsius';
        } else if (normalized === 'fahrenheit') {
            scale = 'Fahrenheit';
        } else {
            return res.status(400).json({ error: 'Invalid scale' });
        }
    }

    /* =============================
       FETCH TEMPERATURE
    ============================== */

    try {
        const temperature = await getTemperature(zip, scale);

        if (temperature === null) {
            return res.status(404).json({ error: 'Location not found' });
        }

        return res.status(200).json({
            temperature,
            scale
        });

    } catch (err) {
        console.error('Error fetching temperature:', err);
        return res.status(500).json({ error: 'Failed to fetch temperature' });
    }
});

export default router;