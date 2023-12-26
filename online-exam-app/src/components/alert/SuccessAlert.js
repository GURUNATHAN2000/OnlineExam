import Swal from "sweetalert2";

export const SuccessAlert = ( msg ) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: 1000,
  });
};
