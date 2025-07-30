
import express from 'express';
import cors from 'cors';
import { Duffel } from '@duffel/api';

const app = express();
app.use(cors());
app.use(express.json());

const duffel = new Duffel({ token: process.env.DUFFEL_ACCESS_TOKEN });

app.post('/api/search-flights', async (req, res) => {
  const { from, to, departure_date } = req.body;
  try {
    const offerRequest = await duffel.offerRequests.create({
      slices: [{ origin: from, destination: to, departure_date }],
      passengers: [{ type: 'adult' }],
    });
    const offers = offerRequest.data.offers.map(o => ({
      airline: o.owner.name,
      price: o.total_amount,
      currency: o.total_currency,
      duration: o.slices[0].duration,
      segments: o.slices[0].segments.map(s => ({
        from: s.origin.name,
        to: s.destination.name,
        departure: s.departing_at,
        arrival: s.arriving_at
      }))
    }));
    res.json({ offers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Duffel API error' });
  }
});

app.get('/', (req, res) => res.send('Cejoji Duffel API Running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
