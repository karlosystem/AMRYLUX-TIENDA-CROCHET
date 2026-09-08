import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  
  // 🌟 Estados para controlar el modal y el usuario seleccionado
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: ""
  });

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUsers.url, {
        method: SummaryApi.allUsers.method,
        credentials: "include",
      });
      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Todos los Usuarios ({allUsers.length})
      </h2>
      <div className="bg-white pb-4 shadow-md rounded">
        <table className="w-full userTable text-left border-collapse">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-2">Id</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Email</th>
              <th className="p-2">Rol</th>
              <th className="p-2">Creación</th>
              <th className="p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-slate-50">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">{moment(user.createdAt).format("DD-MM-YYYY")}</td>
                <td className="p-2">
                  {/* 🌟 Al hacer clic, cargamos los datos del usuario en el estado y abrimos el modal */}
                  <button
                    onClick={() => {
                      setUpdateUserDetails(user);
                      setOpenUpdateRole(true);
                    }}
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition-all"
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 🌟 El modal solo se renderiza si 'openUpdateRole' es true */}
        {openUpdateRole && (
          <ChangeUserRole
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            onClose={() => setOpenUpdateRole(false)}
            callFunc={fetchAllUsers} // Refresca la tabla automáticamente al guardar
          />
        )}
      </div>
    </div>
  );
};

export default AllUsers;