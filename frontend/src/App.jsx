import { useEffect, useState } from 'react';
import './styles.css';
import Admin from './admin';

function App() {
  return <Admin />;
  const [nombre, setNombre] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [compradorId, setCompradorId] = useState(null);
  const [pagoConfirmado, setPagoConfirmado] = useState(false);
  const [boletos, setBoletos] = useState([]);

  useEffect(() => {
    if (pagoConfirmado) {
      fetch(`${import.meta.env.VITE_API_URL}/api/boletos`)
        .then(res => res.json())
        .then(data => setBoletos(data));
    }
  }, [pagoConfirmado]);

  const registrarComprador = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/compradores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, whatsapp })
    });
    const data = await res.json();
    setCompradorId(data.comprador_id);
  };

  const pagar = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pagos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comprador_id: compradorId, monto: 50 })
    });

    if (res.ok) {
      setPagoConfirmado(true);
    }
  };

  const comprarBoleto = async (numero) => {
    const res = await fetch('http://localhost:3000/api/boletos/comprar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero, comprador_id: compradorId })
    });

    if (res.ok) {
      alert('✅ Boleto comprado');
    } else {
      alert('❌ Boleto no disponible');
    }
  };

  // REGISTRO
  if (compradorId === null) {
    return (
      <>
        <div style={{
          background: '#0f172a',
          color: 'white',
          padding: '14px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          🎉 Rifa Celular Samsung
        </div>

        <div className="container">
          <div className="card">
            <h2>🎟️ Registro</h2>
            <input placeholder="Nombre" onChange={e => setNombre(e.target.value)} />
            <input placeholder="WhatsApp" onChange={e => setWhatsapp(e.target.value)} />
            <button onClick={registrarComprador}>Continuar</button>
          </div>
        </div>
      </>
    );
  }

  // PAGO
  if (!pagoConfirmado) {
    return (
      <>
        <div style={{
          background: '#0f172a',
          color: 'white',
          padding: '14px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          🎉 Rifa Celular Samsung
        </div>

        <div className="container">
          <div className="card">
            <h2>💳 Pago</h2>
            <p>Costo: <strong>$50 MXN</strong></p>
            <button onClick={pagar}>Pagar ahora</button>
          </div>
        </div>
      </>
    );
  }

  // BOLETOS
  return (
    <>
      <div style={{
        background: '#0f172a',
        color: 'white',
        padding: '14px',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        🎉 Rifa Celular Samsung
      </div>

      <div className="container">
        <div className="card">
          <h2>🎟️ Elige tu boleto</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '10px'
          }}>
            {boletos.map(b => (
              <div
                key={b.numero}
                onClick={() => !b.vendido && comprarBoleto(b.numero)}
                style={{
                  padding: '14px',
                  background: b.vendido ? '#9ca3af' : '#22c55e',
                  color: 'white',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  cursor: b.vendido ? 'not-allowed' : 'pointer'
                }}
              >
                {b.numero}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;