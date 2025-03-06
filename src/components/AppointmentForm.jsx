import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

export default function AppointmentFormAndList({ doctores }) {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({ nombre: '', doctor: '', fecha: '', hora: '' });

  // Referencias para manejar el enfoque
  const nombreRef = useRef(null);
  const fechaRef = useRef(null);
  const horaRef = useRef(null);
  const doctorRef = useRef(null);

  // Cargar pacientes desde el localStorage cuando el componente se monta
  useEffect(() => {
    const pacientesGuardados = localStorage.getItem('pacientes');
    if (pacientesGuardados) {
      try {
        const parsedPacientes = JSON.parse(pacientesGuardados);
        setPacientes(parsedPacientes);
      } catch (error) {
        console.error('Error al parsear los datos del localStorage:', error);
        // Si el parseo falla, puedes resetear los pacientes a un arreglo vacío o lo que desees.
        setPacientes([]);
      }
    }
  }, []);

  // Guardar pacientes en el localStorage cuando cambien
  useEffect(() => {
    if (pacientes.length > 0) {
      try {
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
      } catch (error) {
        console.error('Error al guardar los pacientes en el localStorage:', error);
      }
    }
  }, [pacientes]);

  // Función que maneja el envío del formulario
  const manejarEnvio = (e) => {
    e.preventDefault(); // Evitar recarga de la página
    setPacientes((pacientes) => [...pacientes, paciente]);
    setPaciente({ nombre: '', doctor: '', fecha: '', hora: '' });
  };

  // Función para enfocar el siguiente campo
  const enfocarCampo = (campoRef) => {
    campoRef.current.focus();
  };

  useEffect(() => {
    // Enfocar el campo de nombre al cambiar de vista
    if (nombreRef.current) {
      nombreRef.current.focus();
    }
  }, []);

  return (
    <div>
      {/* Formulario de citas */}
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-primary sm:text-4xl">
            Agenda tu cita médica
          </h2>
        </div>
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={manejarEnvio}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
                Nombre completo
              </label>
              <div className="mt-2.5">
                <input
                  id="nombre"
                  ref={nombreRef}
                  type="text"
                  value={paciente.nombre}
                  onChange={(e) => setPaciente((paciente) => ({ ...paciente, nombre: e.target.value }))}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label>
                Doctor:
                <select
                  id="doctor"
                  ref={doctorRef}
                  type="text"
                  value={paciente.doctor}
                  onChange={(e) => setPaciente((paciente) => ({ ...paciente, doctor: e.target.value }))}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  required
                >
                  <option>Seleccione un doctor</option>
                  {doctores.map((doctor) => (
                    <option key={doctor.id} value={doctor.nombre}>
                      {doctor.nombre}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="fecha" className="block text-sm/6 font-semibold text-gray-900">
                Fecha de la cita:
              </label>
              <div className="mt-2.5">
                <input
                  type="date"
                  ref={fechaRef}
                  id="fecha"
                  value={paciente.fecha}
                  onChange={(e) => setPaciente((paciente) => ({ ...paciente, fecha: e.target.value }))}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="hora" className="block text-sm/6 font-semibold text-gray-900">
                Hora de la cita:
              </label>
              <div className="mt-2.5">
                <input
                  type="time"
                  ref={horaRef}
                  id="hora"
                  value={paciente.hora}
                  onChange={(e) => setPaciente((paciente) => ({ ...paciente, hora: e.target.value }))}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Solicitar cita
            </button>
          </div>
        </form>
      </div>

      {/* Tabla de citas */}
      <div>
        {pacientes.length > 0 ? (
          <>
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-primary sm:text-4xl text-center">
              Citas Agendadas
            </h2>
            <table className="min-w-max table-auto text-left mx-auto">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Nombre</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Doctor</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Fecha</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Hora</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map((paciente, indice) => (
                  <tr key={indice} className="even:bg-blue-gray-50/50">
                    <td className="p-4">{paciente.nombre}</td>
                    <td className="p-4">{paciente.doctor}</td>
                    <td className="p-4">{paciente.fecha}</td>
                    <td className="p-4">{paciente.hora}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <h2 className="text-balance font-semibold tracking-tight text-primary sm:text-4xl text-center mb-6">
            No hay citas agendadas
          </h2>
        )}
      </div>
    </div>
  );
}

AppointmentFormAndList.propTypes = {
  doctores: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
};
