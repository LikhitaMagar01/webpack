import logo from "./assets/images/images.jpeg";
import bgImage from "./assets/images/images.jpeg";
import "./style/style.scss";
import "./style/style.css";
import "./assets/fonts/ProtestGuerrilla-Regular.ttf"

import _ from 'lodash'
import dayjs from 'dayjs'

document.getElementById("toast").style.visibility = "hidden";

document.getElementById("title").addEventListener("click", () => {
    document.getElementById("toast").style.visibility = "visible";
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

document.getElementById("toast").innerHTML = `Thank you for visit on ${dayjs().format('YYYY MM DD HH:MM A')}. Your presence was valuable.`