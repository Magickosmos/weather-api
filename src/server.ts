// -------------------------------------------------------------------------
/**
 * Weather API Server Entry Point
 * 
 * Starts the Express server on localhost:8080.
 *
 * @author Alexander Smith (smithaj201)
 * @version 1
 */
// -------------------------------------------------------------------------
import app from './app';

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});