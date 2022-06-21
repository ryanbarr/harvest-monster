import { addMessages, init } from "svelte-i18n";
import en from "./assets/locales/en.json";
import es from "./assets/locales/es.json";
import jp from "./assets/locales/jp.json";
import ko from "./assets/locales/ko.json";
import pt from "./assets/locales/pt.json";
import ru from "./assets/locales/ru.json";
import zh from "./assets/locales/zh.json";

addMessages("en", en);
addMessages("es", es);
addMessages("jp", jp);
addMessages("ko", ko);
addMessages("pt", pt);
addMessages("ru", ru);
addMessages("zh", zh);

init({
  fallbackLocale: "en",
});
