"use strict"

document.addEventListener("DOMContentLoaded", fetchData); //När DOM-laddat, anropa fetchData

async function fetchData() {
    const link = "https://webbutveckling.miun.se/files/ramschema.json";

    try {
        const newData = await fetch(link); //När fetchData anropas fetchas denna länk
        const data = await newData.json();

        createTable(data);
    } catch (error) {
        console.error(error);

        const section = document.getElementById("table-section");
        section.innerHTML = `
        <article>
        <h3>Ett fel verkar ha uppstått</h3>
        <p>Tyvärr kan inte datan laddas för tillfället..</p>
        </article>
        `;
    }

}

function createTable(data) {
    const tbody = document.getElementById("tbody");

    data.forEach(element => {
        tbody.innerHTML += `
        <tr>
        <td>${element.code}</td>
        <td>${element.coursename}</td>
        <td>${element.progression}</td>
        </tr>`;
    });
}