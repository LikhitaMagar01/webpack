import logo from "./assets/images.jpeg";
import bgImage from "./assets/logo-search-grid-2x.png";
import "./style/style.css";
import "./style/style.scss";
import "./fonts/ProtestGuerrilla-Regular.ttf"

document.getElementById("toast").style.visibility = "hidden";

document.getElementById("title").addEventListener("click", () => {
    document.getElementById("toast").style.visibility = "visible";
})

document.getElementById("logo").src = logo;
document.getElementById("bg_image").src = bgImage;