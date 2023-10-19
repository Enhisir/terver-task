"use strict";

let formulas = {
    
    "PlacementsNoRepetitions": {
        name: "Размещения без повторений",
        formula: String.raw`\( A^k_n = \frac{n!}{(n- k)!} \)`,
        description: "Размещениями называют различные комбинации " +
                     "из объектов, которые выбраны из множества " +
                     "различных объектов, и которые отличаются " +
                     "друг от друга как составом объектов в " +
                     "выборке,так и их порядком.",
        showForm: async () => {
            let formGroup = document.getElementById("actionForm");
            formGroup.innerHTML = `
            <div class="mb-2">
                <input class="form-control" type="number" id="n" placeholder="n">
            </div>
            <div class="mb-2">
                <input class="form-control" type="number" id="k" placeholder="k">
            </div>
            <div class="mb-2">
                <button class="btn btn-primary" id="calc">посчитать</button>
            </div>                        
            `;
            document.getElementById("calc").addEventListener("click", () => {
                let n = Number(document.getElementById("n").value);
                let k = Number(document.getElementById("k").value);
                
                let validate = k > n || k < 0 || n < 0;
                let result = validate ? PlacementsNoRepetitions(n, k) : "Неверные входные данные";
                setResult(result);
            });
        }
    },
    "PlacementsWithRepetitions": {
        name: "Размещения с повторениями",
        formula: String.raw`\( \overline{A}^k_n = n^k \)`,
        description: "Размещениями называют различные комбинации " +
                     "из объектов, которые выбраны из множества " +
                     "различных объектов, и которые отличаются " +
                     "друг от друга как составом объектов в " +
                     "выборке,так и их порядком.",
        showForm: async () => {
            let formGroup = document.getElementById("actionForm");
            formGroup.innerHTML = `
            <div class="mb-2">
                <input class="form-control" type="number" id="n" placeholder="n">
            </div>
            <div class="mb-2">
                <input class="form-control" type="number" id="k" placeholder="k">
            </div>
            <div class="mb-2">
                <button class="btn btn-primary" id="calc">посчитать</button>
            </div>                        
            `;
            document.getElementById("calc").addEventListener("click", () => {
                let n = Number(document.getElementById("n").value);
                let k = Number(document.getElementById("k").value);

                let validate = k > n || k < 0 || n < 0;

                let result = validate ? PlacementsWithRepetitions(n, k) : "Неверные входные данные";
                setResult(result);
            });
        }
    },

    "PermutationsNoRepetitions": {
        name: "Перестановки без повторений",
        formula: String.raw`\(P_n = n!\)`,
        description: "Перестановками называют " +
                       "комбинации, состоящиеиз одних и " +
                       "тех же различныхобъектов и " + 
                       "отличающиеся только порядком их " +
                       "расположения.",
        showForm: async () => {
            let formGroup = document.getElementById("actionForm");
            formGroup.innerHTML = `
            <div class="mb-2">
                <input class="form-control" type="number" id="n" placeholder="n">
            </div>
            <div class="mb-2">
                <button class="btn btn-primary" id="calc">посчитать</button>
            </div>                        
            `;
            document.getElementById("calc").addEventListener("click", () => {
                let n = Number(document.getElementById("n").value);

                let result = n > 0 ? PermutationsNoRepetitions(n) : "n должен быть > 0";
                setResult(result);
            });
        }
    },
    "PermutationsWithRepetitions": {
        name: "Перестановки с повторениями",
        formula: String.raw`\(P(n_1, n_2, ..., n_k) = \frac{n!}{n_1!n_2!...n_k!}\)`,
        description: "Перестановками называют " +
                       "комбинации, состоящиеиз одних и " +
                       "тех же различныхобъектов и " + 
                       "отличающиеся только порядком их " +
                       "расположения.",
        showForm: async () => {
            let formGroup = document.getElementById("actionForm");
            formGroup.innerHTML = `
            <div id="groups">
                <div class="mb-2">
                    <input class="form-control" type="number" id="n1" placeholder="n1">
                </div>
                <div class="mb-2">
                    <input class="form-control" type="number" id="n2" placeholder="n2">
                </div>
            </div>
            <div class="d-flex flex-row">
                <button class="btn btn-primary me-2" id="addGroup">добавить группу</button>
                <button class="btn btn-primary" id="calc">посчитать</button>
            </div>              
            `;

            document.getElementById("addGroup").addEventListener("click", () => {
                let groupsArray = Array.from(document.getElementById("groups")
                                                    .querySelectorAll("input"));

                let last = groupsArray[groupsArray.length - 1];
                let n = Number(last.id.substring(1)) + 1;

                let newGroup = document.createElement("div");
                newGroup.className = "mb-2";
                newGroup.innerHTML = `<input class="form-control" type="number" id="n${n}" placeholder="n${n}">`;

                groups.appendChild(newGroup);
            });
            document.getElementById("calc").addEventListener("click", () => {
                let groupsArray = Array.from(document.getElementById("groups")
                                                    .querySelectorAll("input"))
                                       .map((el) => el.value == null ? 0 : Number(el.value));
                
                let validate = groupsArray.some(x => x < 0);
                let result = validate 
                ? PermutationsWithRepetitions(groupsArray) 
                : "В группах не может быть отричательных чисел";

                setResult(result);
            });
        }
    },

    "CombinationsNoRepetitions": {
        name: "Сочетания без повторений",
        formula: String.raw`\( C^k_n = \frac{n!}{k!(n- k)!} \)`,
        description: "Сочетаниями называют различные комбинации изобъектов, которые выбраны " +
                       "из множества различных объектов, и которые отличаются друг от друга хотя бы " +
                       "одним объектом.Иными словами, отдельно взятое сочетание –это уникальная " +
                       "выборка из элементов, в которой не важен их порядок (расположение).",
        showForm: async () => {
            let formGroup = document.getElementById("actionForm");
            formGroup.innerHTML = `
            <div class="mb-2">
                <input class="form-control" type="number" id="n" placeholder="n">
            </div>
            <div class="mb-2">
                <input class="form-control" type="number" id="k" placeholder="k">
            </div>
            <div class="mb-2">
                <button class="btn btn-primary" id="calc">посчитать</button>
            </div>                        
            `;
            document.getElementById("calc").addEventListener("click", () => {
                let n = Number(document.getElementById("n").value);
                let k = Number(document.getElementById("k").value);
                
                let validate = n < 0 || k > n || k < 0;
                let result = validate ? CombinationsNoRepetitions(n, k) : "Неверные данные";
                setResult(result);
            });
        }
    },
    "CombinationsWithRepetitions": {
        name: "Сочетания с повторениями",
        formula: String.raw`\( \overline{C}^k_n = C^k_{n+k-1} = \frac{(n+k-1)!}{k!(n-1)!} \)`,
        description: "Сочетаниями называют различные комбинации изобъектов, которые выбраны " +
                       "из множества различных объектов, и которые отличаются друг от друга хотя бы " +
                       "одним объектом.Иными словами, отдельно взятое сочетание –это уникальная " +
                       "выборка из элементов, в которой не важен их порядок (расположение).",
        showForm: async () => {
            let formGroup = document.getElementById("actionForm");
            formGroup.innerHTML = `
            <div class="mb-2">
                <input class="form-control" type="number" id="n" placeholder="n">
            </div>
            <div class="mb-2">
                <input class="form-control" type="number" id="k" placeholder="k">
            </div>
            <div class="mb-2">
                <button class="btn btn-primary" id="calc">посчитать</button>
            </div>                        
            `;
            document.getElementById("calc").addEventListener("click", () => {
                let n = Number(document.getElementById("n").value);
                let k = Number(document.getElementById("k").value);

                let validate = n < 0 || k < 0 || k < n - 1;
                let result = validate ? CombinationsWithRepetitions(n, k) : "Неверные данные";
                setResult(result);
            });
        }
    },

    "default": {
        name: "Выберите формулу",
        formula: "",
        description: ""
    }
}

async function showCurrentFormula() {
    let currentFormula = document.getElementById("formulaSelector").value;

    let name = document.getElementById("formulaName");
    let formula = document.getElementById("formula");
    let description = document.getElementById("formulaDescription");

    if (currentFormula === "default")
    {
        let selected = formulas["default"];
        
        name.innerText = selected.name;
        formula.innerText = selected.formula;
        description.innerText = selected.description;

        document.getElementById("actionForm").innerHTML = "";
    }
    else
    {
        let repetitions = document.getElementById("checkRepetitions").checked;
        currentFormula += (repetitions ? "With" : "No") + "Repetitions";

        let selected = formulas[currentFormula];
        
        name.innerText = selected.name;
        formula.innerText = selected.formula;
        description.innerText = selected.description;
        
        if (window.MathJax)
        {
            try {
                MathJax.typeset();
            } catch {
                MathJax.typesetPromise().then(() => {});
            }
        }  

        selected.showForm();
    }
    document.getElementById("result").setAttribute("hidden", true);
}

function setResult(result) {
    let resultTag = document.getElementById("result");
    resultTag.innerText = `Результат: ${result}`;
    resultTag.removeAttribute("hidden");
}

document.getElementById("formulaSelector").addEventListener("change", showCurrentFormula);
document.getElementById("checkRepetitions").addEventListener("change", showCurrentFormula);