import { addMessages, init } from "svelte-i18n";
import en from "./assets/locales/en.json";
import es from "./assets/locales/es.json";
import jp from "./assets/locales/jp.json";
import ko from "./assets/locales/ko.json";

addMessages("en", en);
addMessages("es", es);
addMessages("jp", jp);
addMessages("ko", ko);

init({
  fallbackLocale: "en",
});
