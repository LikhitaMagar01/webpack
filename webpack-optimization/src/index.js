import logo from "./assets/images/images.jpeg";
import bgImage from "./assets/images/images.jpeg";
import "./style/style.scss";
import "./style/style.css";
import "./assets/fonts/ProtestGuerrilla-Regular.ttf"

import dayjs from 'dayjs'

const element = document.getElementById("toast");
element.style.visibility = "hidden";

document.getElementById("toast").style.visibility = "hidden";

document.getElementById("title").addEventListener("click", () => {
    import("lodash").then(({ default: _ }) => {
        element.innerHTML = `Thank you for visit on ${dayjs().format('YYYY MM DD HH:MM A')}. Your presence was valuable.`
        element.style.visibility = "visible";
    })
})

document.getElementById("logo").src = logo;
document.getElementById("bg_image").src = bgImage;

unused_function_1()

export function unused_function_1() {
    console.log('unused function 1')
}

export function unused_function_2() {
    console.log('unused function 2');
}
