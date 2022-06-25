import { toast } from "@zerodevx/svelte-toast";
import Toast from "../components/molecules/Toast.svelte";

const defaultTheme = {
  "--toastWidth": "20rem",
};

export const success = ({ text, title, theme = defaultTheme }) =>
  toast.push({
    component: {
      src: Toast,
      props: {
        text,
        title,
        type: "success",
      },
    },
    theme,
  });

export const warning = ({ text, title, theme = defaultTheme }) =>
  toast.push({
    component: {
      src: Toast,
      props: {
        text,
        title,
        type: "warning",
      },
    },
    theme,
  });

export const error = ({ text, title, theme = defaultTheme }) =>
  toast.push({
    component: {
      src: Toast,
      props: {
        text,
        title,
        type: "error",
      },
    },
    theme,
  });
