import "../src/style/explore-page.css";
import img from "../src/assets/images/images.jpeg";

// Hide the last two items initially
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("main_container").style.visibility = "hidden";

    document.getElementById("explore_more").addEventListener("click", () => {
        document.getElementById("main_container").style.visibility = "visible";
    });

    document.getElementById('item1').src = img;
    document.getElementById('item2').src = img;
    document.getElementById('item3').src = img;
    document.getElementById('item4').src = img;
});

console.log('test');
