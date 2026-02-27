// -------------------------------------------------------------------------
/**
 * Express application configuration
 * 
 * Sets up middleware and route mounting for the Weather API.
 *
 * @author Alexander Smith (smithaj201)
 * @version 1
 */
// -------------------------------------------------------------------------
import express from 'express';
import locationRoutes from './routes/locations'; // relative path

const app = express();

// Middleware
app.use(express.json());

// Mount the /locations route
app.use('/locations', locationRoutes);

export default app;