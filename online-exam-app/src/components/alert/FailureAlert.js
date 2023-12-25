import Swal from "sweetalert2";

export const FailureAlert = ( msg ) => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: msg + " !",
    showConfirmButton: false,
    timer: 1500,
  });
};
