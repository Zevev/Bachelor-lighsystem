document.querySelector("#showProgram").addEventListener("click", displayDates);
document.querySelector("#adjustProgram").addEventListener("click", displaySettings);

function displayDates(){
    document.getElementById("dayTable").style.display = "table";
    document.getElementById("settingsTab").style.display = "none";
}

function displaySettings(){
    document.getElementById("dayTable").style.display = "none";
    document.getElementById("settingsTab").style.display = "grid";
}

function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('check')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}
