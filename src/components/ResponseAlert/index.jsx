import Swal from "sweetalert2";

const SuccessAlert = ({
  title = "Success!",
  text = "Operation completed successfully.",
  timer = 1500,
  icon = "success",
}) => {
  Swal.fire({
    title,
    text,
    icon,
    timer,
  });

  return null;
};

export default SuccessAlert;
