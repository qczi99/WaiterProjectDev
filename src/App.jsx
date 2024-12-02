import { useState } from 'react';
import './App.css'; // Importujemy plik CSS

const ReservationForm = () => {
  const [reservation, setReservation] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: 1,
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reservation Data (JSON):', JSON.stringify(reservation, null, 2));

    fetch('https://example.com/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        alert('Rezerwacja została wysłana!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Wystąpił problem podczas wysyłania rezerwacji.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Rezerwacja stolika</h2>
      <label htmlFor="name">Twoje imię</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Twoje imię"
        value={reservation.name}
        onChange={handleChange}
        required
      />
      <label htmlFor="email">Twój email</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Twój email"
        value={reservation.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="date">Data rezerwacji</label>
      <input
        type="date"
        name="date"
        id="date"
        value={reservation.date}
        onChange={handleChange}
        required
      />
      <label htmlFor="time">Godzina rezerwacji</label>
      <input
        type="time"
        name="time"
        id="time"
        value={reservation.time}
        onChange={handleChange}
        required
      />
      <label htmlFor="guests">Liczba osób</label>
      <input
        type="number"
        name="guests"
        id="guests"
        placeholder="Liczba osób"
        value={reservation.guests}
        onChange={handleChange}
        required
      />
      <label htmlFor="notes">Uwagi</label>
      <textarea
        name="notes"
        id="notes"
        placeholder="Uwagi"
        value={reservation.notes}
        onChange={handleChange}
      />
      <button type="submit">Wyślij rezerwację</button>
    </form>
  );
};

export default ReservationForm;