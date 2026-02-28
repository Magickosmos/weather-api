### 🌡 Weather API — Virginia Cyber Range Development Intern Challenge
### 📌 Overview

This project implements a RESTful API that allows users to retrieve the current temperature for a given U.S. ZIP code.

The API exposes a single endpoint:

GET /locations/{zip-code}

The response returns the temperature and scale (Fahrenheit or Celsius) in JSON format.

By default, the temperature is returned in Fahrenheit, but users may optionally specify the desired scale using a query parameter.

### ⚡ Example Requests
Default (Fahrenheit)
GET http://localhost:8080/locations/24060

Response:

{
  "temperature": 43,
  "scale": "Fahrenheit"
}
Celsius Conversion
GET http://localhost:8080/locations/90210?scale=Celsius

Response:

{
  "temperature": 25,
  "scale": "Celsius"
}
Explicit Fahrenheit
GET http://localhost:8080/locations/60606?scale=Fahrenheit

Response:

{
  "temperature": 63,
  "scale": "Fahrenheit"
}

### 🗂 Project Structure
src/
│
├── app.ts                # Express app configuration
├── server.ts             # Server entry point (port 8080)
│
├── routes/
│   └── locations.ts      # Route handler + validation
│
├── services/
│   └── weatherService.ts # Weather API integration + conversion logic
│
└── test/
    └── locations.test.ts # Automated test suite

### ⚙ Setup Instructions
1. Install Dependencies
npm install
2. Start the Server
npm start

The API will be available at:

http://localhost:8080
Running Tests

This project includes an automated test suite using Jest and Supertest.

### ✅ Running Tests

    npm test

    The test suite validates:

        Default scale behavior

        Celsius conversion

        Explicit Fahrenheit requests

        Invalid scale handling (400)

        ZIP code validation (400)

        Response structure correctness

        Content-Type header validation

        Temperature bounds sanity check

        Conversion correctness

        Concurrent request handling

### 🛠 Design Decisions & Rationale
1. Route-Level Validation

Input validation (ZIP code and scale) is handled at the route layer to:

Ensure only valid data reaches the service layer

Keep business logic separate from HTTP concerns

Return appropriate HTTP status codes (400, 404, 500)

2. Service Layer Separation

Weather fetching and temperature conversion are handled in a dedicated service module:

services/weatherService.ts

This separation:

Improves maintainability

Enables easier unit testing

Follows separation-of-concerns principles

Keeps the route layer focused on HTTP logic

3. Scale Handling

Behavior implemented according to specification:

Input	Behavior
No scale parameter	Defaults to Fahrenheit
?scale=	            Defaults to Fahrenheit
?scale=Celsius	    Returns Celsius
?scale=Fahrenheit	Returns Fahrenheit
Unsupported scale	Returns 400

Scale matching is case-insensitive but normalized in the response.

4. Error Handling Strategy

400 Bad Request → Invalid ZIP or unsupported scale

404 Not Found → Location not found

500 Internal Server Error → External API failure or unexpected error

This ensures correct and meaningful HTTP semantics.

5. TypeScript Usage

TypeScript was chosen to:

Improve type safety

Reduce runtime errors

Enhance maintainability

Provide better developer tooling

6. Concurrency Consideration

The test suite includes concurrent request validation to ensure:

No shared state corruption

Proper asynchronous handling

Safe parallel request processing

External Weather API

This project integrates with a third-party weather API to retrieve real-time temperature data.

### The weather service module is responsible for:

Fetching current conditions

Handling API errors

Performing temperature conversions when required

### 🤖 AI Usage Disclosure

Portions of this solution were developed with assistance from AI-based tools (ChatGPT) for code review, validation refinement, and test design. All implementation decisions, validation logic, and architectural structure were reviewed and verified by the author.

### 🔮 Future Improvements

Potential enhancements include:

Caching temperature responses

Rate limiting

### 👤 Author
Alexander Smith
Virginia Cyber Range Development Intern Challenge Submission