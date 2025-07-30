
# Cejoji Backend (Duffel Integration)

This is the backend for flight search using the Duffel API.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add your `.env` file:
```
DUFFEL_ACCESS_TOKEN=your_duffel_token_here
```

3. Start the server:
```bash
npm start
```

## API

### POST /api/search-flights

**Body:**
```json
{
  "from": "CDG",
  "to": "JFK",
  "departure_date": "2025-08-15"
}
```

**Response:**
Returns a list of flight offers.
