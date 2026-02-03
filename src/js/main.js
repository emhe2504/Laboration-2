"use strict"

document.addEventListener("DOMContentLoaded", fetchData); //När DOM-laddat, anropa fetchData

let allRows = [];

async function fetchData() { //async - denna funktion returnerar ett promise i form av ett objekt
    const link = "https://webbutveckling.miun.se/files/ramschema.json";

    try {
        const newData = await fetch(link); //När fetchData anropas fetchas denna länk
        const data = await newData.json(); //data = objekt som ska ovandlas till JavaScript

        createTable(data); //skickas vidare till denna funktion som anropas
        informationTable(data); //skickas vidare till denna funktion som anropas

        allRows = Array.from(document.querySelectorAll("#tbody tr")); //spara raderna i allRows för framtiden (en array)

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

function createArray() { //Steg 1, skapa array. (.sort fungerar på array)
    rowArray.length = 0; //se till att arrayen är tom när den fylls på

     rowArray.push(...allRows); //pushas med allRows för att filtrera ska fungera
}

const choiceList = document.getElementById("sort-val");
const tbody = document.getElementById("tbody"); 
const rowArray = [];

choiceList.addEventListener("change", () => { //Steg 2, lyssna på klick, trigga array-skapande

    createArray();

    if (choiceList.value === "Kurskod-num") { //sortera på kurskod-siffror
         rowArray.sort((a, b) => {

        const code1 = parseInt(a.cells[0].textContent.slice(2, 5)); //Bara siffrorna i mitten (slice)
        const code2 = parseInt(b.cells[0].textContent.slice(2, 5));

        return code1 - code2; //Returnera siffrorna de ska sorteras efter
    });
    }

    if (choiceList.value === "Kurskod-let") { //sortera på kurskod-bokstäver
         rowArray.sort((a, b) => 

        a.cells[0].textContent.localeCompare(b.cells[0].textContent) //localeCompare jämför stängar istället för siffror
    );
    }

    if (choiceList.value === "Kursnamn") { //sortera på kursnamn
        rowArray.sort((a, b) => 

        a.cells[1].textContent.localeCompare(b.cells[1].textContent)
    );
    }

    if (choiceList.value === "Progression") { //sortera på progression
        rowArray.sort((a, b) => 

        a.cells[2].textContent.localeCompare(b.cells[2].textContent)
    );
    }

    rowArray.forEach(row => { //Tillbaka in i tabellen
        tbody.appendChild(row);
    })

    if (choiceList.value === "Originalordning") { //Tillbaka till orginal
        allRows.forEach(row => { 
        tbody.appendChild(row);
    });
    }
});


document.getElementById("sok").addEventListener("input", () => { //Eventlyssnare på input triggar två funktioner
    createArray();
    filterRows();
});

function filterRows() { //filtrera bland rader/celler 
    const searchWord = document.getElementById("sok").value.toLowerCase();

    const filteredRows = rowArray.filter((row) => 
    row.cells[0].textContent.toLowerCase().includes(searchWord) ||
    row.cells[1].textContent.toLowerCase().includes(searchWord) ||
    row.cells[2].textContent.toLowerCase().includes(searchWord)
);
    showRows(filteredRows); //och skicka vidare
}

function showRows(rowArray) { //bestämmer vilka rader som kommer ut
    tbody.innerHTML = "";
    rowArray.forEach(row => tbody.appendChild(row));
}