import { toast } from "react-toastify";

const showToast = (success, message) => {
  if (success) {
    toast.success(message ?? "Successfully processed");
  } else {
    toast.error(message ?? "Something went wrong!");
  }
};

export { showToast };
