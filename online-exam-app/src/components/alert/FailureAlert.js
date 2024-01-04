import Swal from "sweetalert2";

export const FailureAlert = (msg, instruction) => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: msg + " !",
    text: instruction,
    showConfirmButton: false,
    timer: 1500,
  });
};
