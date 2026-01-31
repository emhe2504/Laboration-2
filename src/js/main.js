"use strict"

document.addEventListener("DOMContentLoaded", fetchData);

async function fetchData() {
    const link = "https://webbutveckling.miun.se/files/ramschema.json";

    try {
        const newData = await fetch(link);
        const data = await newData.json();

        createTable(data);
    } catch(error){

    }

}

function createTable(data) {
    const table = document.getElementById("table");
    const tbody =document.getElementById("tbody");

    data.forEach(element => {
        tbody.innerHTML += `
        <tr>
        <td>${element.code}</td>
        <td>${element.coursename}</td>
        <td>${element.progression}</td>
        </tr>`;
    });
}