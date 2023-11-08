document.getElementById("calc").addEventListener("click", () => {
    let n = Number(document.getElementById("n").value);
    let k = Number(document.getElementById("k").value); 
    let m = Number(document.getElementById("m").value);

    if (document.getElementById("variant").checked)
    {
        let rContainer = document.getElementById("r");
        let r = rContainer.value === null || rContainer.value === "" ? k : Number(rContainer.value);

        let result = r > k || k > n || m > n ||
                 r > m || k - r > n - m ||
                 k <= 0 || m < 0 || n < 0 || r < 0
        ? "Неверные входные данные"
        : (CombinationsNoRepetitions(m, r) 
          * CombinationsNoRepetitions(n - m, k - r) 
          / CombinationsNoRepetitions(n, k)).toPrecision(6);
        setResult(result);
    }
    else
    {
        let result = k > m || k > n || m > n ||
                 k <= 0 || m < 0 || n < 0
        ? "Неверные входные данные"
        : (CombinationsNoRepetitions(m, k) 
          / CombinationsNoRepetitions(n, k)).toPrecision(6);
        setResult(result);
    }
});

document.getElementById("variant").addEventListener("change", () => {
    let variant2 = document.getElementById("variant").checked;
    if (variant2)
    {
        let newGroup = document.createElement("div");
        newGroup.className = "mb-2";
        newGroup.id = "rContainer"
        newGroup.innerHTML = `
            <label>Среди извлеченных элементов гр. (для п. 2)</label>
            <input class="form-control" type="number" id="r" placeholder="r">
        `;

        document.getElementById("group").appendChild(newGroup);
    }
    else
        document.getElementById("rContainer").remove();
});

// document.getElementById("deleteGroup").addEventListener("click", () => {
//     let groupsArray = Array.from(document.getElementById("groups")
//                                          .querySelectorAll(".urn-group"));
//     if (groupsArray.length == 1)
//         return;

//     groupsArray[groupsArray.length  - 1].remove();
// });

function setResult(result) {
    let resultTag = document.getElementById("result");
    resultTag.innerText = `P(A) = ${result}`;
    resultTag.removeAttribute("hidden");
}