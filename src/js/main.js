"use strict"

document.addEventListener("DOMContentLoaded", fetchData); //När DOM-laddat, anropa fetchData

async function fetchData() { //async - denna funktion returnerar ett promise i form av ett objekt
    const link = "https://webbutveckling.miun.se/files/ramschema.json";

    try {
        const newData = await fetch(link); //När fetchData anropas fetchas denna länk
        const data = await newData.json(); //data = objekt som ska ovandlas till JavaScript

        createTable(data); //skickas vidare till denna funktion som anropas
        informationTable(data); //skickas vidare till denna funktion som anropas

    } catch (error) {
        console.error(error);

        const section = document.getElementById("table-section"); //Vad som ska ske via error
        section.innerHTML = `
        <article>
        <h3>Ett fel verkar ha uppstått</h3>
        <p>Tyvärr kan inte datan laddas för tillfället..</p>
        </article>
        `;
    }

}

function createTable(data) { //Hit kommer data-objektet
    const tbody = document.getElementById("tbody");

    if (tbody) {
        data.forEach(element => { //För varje "element" i objektet ska nedstående ske (i tabell)
            tbody.innerHTML += `
        <tr>
        <td>${element.code}</td>
        <td>${element.coursename}</td>
        <td>${element.progression}</td>
        </tr>`;
        });
    }
}

//Ytterligare träning på detta för att lära mig mer :)

function informationTable(data) { //Hit kommer data-objektet
    const tbodyTwo = document.getElementById("tbody2");

    if (tbodyTwo) {
        data.forEach(element => { //För varje "element" i objektet ska nedstående ske (i tabell)
            tbodyTwo.innerHTML += `
        <tr>
        <td>${element.coursename}</td>
        <td><a href="${element.syllabus}">${element.syllabus}</a></td>
        </tr>`;
        });
    }
}

//Steg för steg, vad vill jag göra?

//Steg 1, vad är det som ska trigga sorteringen?

const choiseList = document.getElementById("sort-val");

choiseList.addEventListener("change", () => {
    if (choiseList.value === "Kurskod-num") {
        sortTable1();
    }

    if (choiseList.value === "Kurskod-let") {
        sortTable2();
    }

    if (choiseList.value === "Progression") {
        sortTable4();
    }
});

//Steg 2, vad är det som ska sorteras?

function sortTable1() {
    const tableRows = document.querySelectorAll("#tbody tr");

    //.sort fungerar endast på array, så raderna behöver placeras i en sådan

    const rowArray = [];

    tableRows.forEach(row => {
        rowArray.push(row);
    })

    rowArray.sort((a, b) => {

        const row1 = a.cells[0].textContent; //Det är textcontent i varje cell[0] som ska sorteras.
        const row2 = b.cells[0].textContent;

        const code1 = parseInt(row1.slice(2, 5)); //I detta fall vill jag att de ska sorteras efter siffrorna i mitten.
        const code2 = parseInt(row2.slice(2, 5));

        return code1 - code2; //Returnera siffrorna de ska sorteras efter
    });

    //Innehållet i rowArray måste hamna i tabellen.

    const tbody = document.getElementById("tbody");

    rowArray.forEach(row => {
        tbody.appendChild(row);
    })
}

//Samma, men på bokstäver.

function sortTable2() {
    const tableRows = document.querySelectorAll("#tbody tr");

    const rowArray = [];

    tableRows.forEach(row => {
        rowArray.push(row);
    })

     rowArray.sort((a, b) => {

        const row1 = a.cells[0].textContent; 
        const row2 = b.cells[0].textContent;

        //Eftersom det inte är siffror jag ska jämföra fick jag googla och hittade localeCompare som jämför stängar.
        
        return row1.localeCompare(row2); //Hör jämförs alltså bokstäverna i början på koden, istället för siffrorna.
    });

    const tbody = document.getElementById("tbody");

    rowArray.forEach(row => {
        tbody.appendChild(row);
    })
}

   //Samma, men på progression.

function sortTable4() {
    const tableRows = document.querySelectorAll("#tbody tr");

    const rowArray = [];

    tableRows.forEach(row => {
        rowArray.push(row);
    })

     rowArray.sort((a, b) => {

        const row1 = a.cells[2].textContent; 
        const row2 = b.cells[2].textContent;
        
        return row1.localeCompare(row2);
    });

    const tbody = document.getElementById("tbody");

    rowArray.forEach(row => {
        tbody.appendChild(row);
    })
}