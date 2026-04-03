import { useState } from 'react';

function Admin() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [boletos, setBoletos] = useState([]);
  const [logueado, setLogueado] = useState(false);

  // 🔐 PASO 7: LOGIN ADMIN + GUARDAR TOKEN
  const loginAdmin = async () => {
    const res = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, password })
    });

    if (!res.ok) {
      alert('Credenciales incorrectas');
      return;
    }

    const data = await res.json();
    localStorage.setItem('adminToken', data.token);
    setLogueado(true);
    cargarBoletos();
  };

  // 🔐 PASO 8: USAR TOKEN EN RUTA PROTEGIDA
  const cargarBoletos = async () => {
    const token = localStorage.getItem('adminToken');

    const res = await fetch('http://localhost:3000/api/admin/boletos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      alert('No autorizado');
      return;
    }

    const data = await res.json();
    setBoletos(data);
  };

  if (!logueado) {
    return (
      <div style={{ padding: 20 }}>
        <h2>🔐 Panel Administrador</h2>

        <input
          placeholder="Usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br /><br />

        <button onClick={loginAdmin}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Panel Administrador</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Boleto</th>
            <th>Estado</th>
            <th>Comprador</th>
            <th>WhatsApp</th>
          </tr>
        </thead>
        <tbody>
          {boletos.map((b, i) => (
            <tr key={i}>
              <td>{b.numero}</td>
              <td>{b.vendido ? '✅ Vendido' : 'Disponible'}</td>
              <td>{b.nombre || '-'}</td>
              <td>{b.whatsapp || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;