import "../src/style/explore-page.css";

// Hide the last two items initially
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("main_container").style.visibility = "hidden";

    document.getElementById("explore_more").addEventListener("click", () => {
        document.getElementById("main_container").style.visibility = "visible";
    });

    document.getElementById('item1').src = "https://picsum.photos/200/300";
    document.getElementById('item2').src = "https://picsum.photos/200/300";
    document.getElementById('item3').src = "https://picsum.photos/200/300";
    document.getElementById('item4').src = "https://picsum.photos/200/300";
});
