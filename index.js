const myTitle = document.querySelector(".my-title");
myTitle.addEventListener("click", onTitleClick);

function onTitleClick() {
    if(myTitle.style.backgroundColor == "transparent") {
        myTitle.style.backgroundColor = "#CE5A67";
        myTitle.style.color = "white";
    } else {
        myTitle.style.backgroundColor = "transparent";
        myTitle.style.color = "black";

    }
}

const BMIData = [
    { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
    { name: "Bonne santé", color: "green", range: [18.5, 25] },
    { name: "Surpoids", color: "lightcoral", range: [25, 30] },
    { name: "Obésité modérée", color: "orange", range: [30, 35] },
    { name: "Obésité sévère", color: "crimson", range: [35, 40] },
    // { name: "Obésité morbide", color: "purple", range: [40, Number.POSITIVE_INFINITY] }
];

// 1 On récupère la balise html et on la stocke dans une variable en js
const validationBtn = document.querySelector(".validation-btn")
const resultIMC = document.querySelector('.imc-value')
const inputs = document.querySelectorAll('.imc-input')
const descriptionText = document.querySelector('.description')

// 2 on déclare un click sur le bouton, à chaque fois qu'on clique, on exécute la fonction associéee
validationBtn.addEventListener('click', onSubmitImc)

function onSubmitImc() {

    
    const height = inputs[0].value / 100
    const weight = inputs[1].value
    // afficher dans la console l'IMC => poids en kg / taille en m ² ** 2

    // vérifier les données utilisateur, pas de valeurs <= 0
    if(checkError(height, weight)){
        resultIMC.textContent = 0;
        resultIMC.style.color = "black";
        return
    }    
    
    const imc = Math.round((weight / height ** 2) * 100) / 100;
    resultIMC.textContent = imc;
    // resultIMC.textContent = imc.toFixed(2);

    let oneLineHasBeenFounded = false;

    for (let i = 0; i < BMIData.length; i++) {
        if(imc > BMIData[i].range[0] && imc <= BMIData[i].range[1]) {
            resultIMC.style.color = BMIData[i].color;
            descriptionText.textContent = BMIData[i].name;
            oneLineHasBeenFounded = true;

        } 
    }
    if(!oneLineHasBeenFounded) {
        resultIMC.style.color = "purple";
        descriptionText.textContent = "Obésité morbide";
    }   
    
}

function checkError(hParameter, wParameter) {
    if((!hParameter || hParameter < 0) && (!wParameter || wParameter < 0)) { 
        descriptionText.textContent = "Les valeurs saisies dans les champs sont incorrectes";
        return true
    } else if(!hParameter || hParameter < 0) {
        descriptionText.textContent = "La valeur saisie dans le champ taille est incorrecte";
        return true
    } else if(!wParameter || wParameter < 0) {
        descriptionText.textContent = "La valeur saisie dans le champ poids est incorrecte";
        return true
    }
    return false
}

