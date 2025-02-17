import { sum } from "./sum"

document.getElementById("button").addEventListener("click", () => {
    const result = sum(4, 5)

    document.getElementById("result").innerHTML = `Sum of 4 and 5 = ${result}`
})
