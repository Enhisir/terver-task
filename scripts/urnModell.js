document.getElementById("calc").addEventListener("click", () => {
    let n = Number(document.getElementById("n").value);
    let k = Number(document.getElementById("k").value);


    let rContainer = document.getElementById("k");
    let r = rContainer.value === null ? 0 : Number(rContainer.value);

    let groupsArray = Array.from(document.getElementById("groups")
                                         .querySelectorAll(".urn-group"));

    let restK = k;
    let restN = n;
    let result = 1
    groupsArray.forEach(element => {
            let i = Number(element.id.substring(5));
            let m = Number(document.getElementById(`m${i}`).value);
            let r = Number(document.getElementById(`r${i}`).value);
            if (m < 0 || r < 0 || m < r)
            {
                setResult("Невозможная операция");
                return;
            }

            restK -= r;
            restN -= m;

            result *= CombinationsNoRepetitions(m, r);
    });
    if (k > n || restN < 0 || restK < 0) {
        setResult("Невозможная операция");
    }
    else {
        result *= CombinationsNoRepetitions(restN, restK);
        result /= CombinationsNoRepetitions(n, k);
    }
    setResult(result < 1 ? result.toPrecision(6) : "Невозможная операция");
});

document.getElementById("addGroup").addEventListener("click", () => {
    let groupsArray = Array.from(document.getElementById("groups")
                                         .querySelectorAll(".urn-group"));

    let lastGroup = groupsArray[groupsArray.length - 1];
    let n = Number(lastGroup.id.substring(5)) + 1;

    let newGroup = document.createElement("div");
    newGroup.className = "urn-group d-flex flex-row";
    newGroup.innerHTML = `
    <div class="mb-2 me-2">
        <label>Группа №${n}</label>
        <input class="form-control" type="number" id="m${n}" placeholder="m${n}">
    </div>
    <div class="mb-2">
        <label>Среди извлеченных элементов гр. (для п. 2)</label>
        <input class="form-control" type="number" id="r${n}" placeholder="r${n}">
    </div>
    `;

    groups.appendChild(newGroup);
});

document.getElementById("deleteGroup").addEventListener("click", () => {
    let groupsArray = Array.from(document.getElementById("groups")
                                         .querySelectorAll(".urn-group"));
    if (groupsArray.length == 1)
        return;

    groupsArray[groupsArray.length  - 1].remove();
});

function setResult(result) {
    let resultTag = document.getElementById("result");
    resultTag.innerText = String.raw`\( P(A) = ${result} \)`;
    resultTag.removeAttribute("hidden");

    MathJax.startup.document.state(0);
    MathJax.texReset();
    MathJax.typeset();

    if (window.MathJax)
    {
        try {
            MathJax.typeset();
        } catch {
            MathJax.typesetPromise().then(() => {});
        }
    }  
}