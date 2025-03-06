const CitaConfirmada = ({pacientes}) => {

  return (
    <div>

{pacientes.length > 0 ? (

<> 
<h2 className="text-balance text-2xl font-semibold tracking-tight text-primary sm:text-4xl text-center">Citas Agendada</h2>

      <table className="min-w-max table-auto text-left mx-auto">
        <thead>
          <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Nombre
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Doctor
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Fecha
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Hora
              </th>                                          
          </tr>
        </thead>
        <tbody>
          {pacientes.map(( paciente,indice) => (
            <tr key={indice} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                  {paciente.nombre}
              </td>
              <td className="p-4">
                  {paciente.doctor}
              </td>
              <td className="p-4">
                  {paciente.fecha}
              </td>
              <td className="p-4">
                {paciente.hora}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</>
): (
  <h2 className="text-balance font-semibold tracking-tight text-primary sm:text-4xl text-center mb-6">No hay citas agendadas</h2>
)}
    </div>
  



);
};

export default CitaConfirmada;