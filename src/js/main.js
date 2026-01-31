"use strict"

document.addEventListener("DOMContentLoaded", fetchData); //När DOM-laddat, anropa fetchData

async function fetchData() { //async - denna funktion returnerar ett promise i form av ett objekt
    const link = "https://webbutveckling.miun.se/files/ramschema.json";

    try {
        const newData = await fetch(link); //När fetchData anropas fetchas denna länk
        const data = await newData.json(); //data = objekt som ska ovandlas till JavaScript

        createTable(data); //skickas vidare till nästa funktion som anropas
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

    data.forEach(element => { //För varje "element" i objektet ska nedstående ske (i tabell)
        tbody.innerHTML += `
        <tr>
        <td>${element.code}</td>
        <td>${element.coursename}</td>
        <td>${element.progression}</td>
        </tr>`;
    });
}