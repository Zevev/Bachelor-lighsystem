

let currentStartTime;
let currentStopTime;
let targetStartTime;
let targetStopTime;
let currentStartHour;
let currentStartMinute;
let targetStartHour;
let targetStartMinute;
let currentStopHour;
let currentStopMinute;
let targetStopHour;
let targetStopMinute;
let correctionTime;
let correctionTimeHour;
let correctionTimeMinute;
let numberOfDays;
let inputValue;

let haveCurrentStartTime = new Boolean(false);
let haveCurrentStopTime = new Boolean(false);
let haveTargetStartTime = new Boolean(false);
let haveTargetStopTime = new Boolean(false);

let currentStartTimeEl = document.getElementById("currentStartTime");
let currentStopTimeEl = document.getElementById("currentStopTime");
let targetStartTimeEl = document.getElementById("targetStartTime");
let targetStopTimeEl = document.getElementById("targetStopTime");
let infoFieldEl = document.getElementById("infoField");
let correctionTimeEl = document.getElementById("correctionTime");
let numberOfDaysEl = document.getElementById("numberOfDays");

currentStartTimeEl.addEventListener("blur", processCurrentStartTime);
currentStopTimeEl.addEventListener("blur", processCurrentStopTime);
targetStartTimeEl.addEventListener("blur", processTargetStartTime);
targetStopTimeEl.addEventListener("blur", processTargetStopTime);
targetStopTimeEl.addEventListener("blur", processTargetStopTime);
correctionTimeEl.addEventListener("blur", processCorrectionTime);
numberOfDaysEl.addEventListener("blur", processNumberOfDays);


function getValueFromEvent(event){
    inputValue = event.target.value;
    return inputValue;
}

function processCurrentStartTime(event){
    currentStartTime = getValueFromEvent(event);
    storeCurrentStartTime();
    writeInfoTextCurrentStartTime();
    checkIfAllInputsFilled("currentStartTime");
}

function processCurrentStopTime(event){
    currentStopTime = getValueFromEvent(event);
    storeCurrentStopTime();
    writeInfoTextCurrentStopTime();
    checkIfAllInputsFilled("currentStopTime");
    document.getElementById("targetStartTime").focus();
}

function processTargetStartTime(event){
    targetStartTime = getValueFromEvent(event);
    storeTargetStartTime();
    writeInfoTextTargetStartTime();
    checkIfAllInputsFilled("targetStartTime");
}

function processTargetStopTime(event){
    targetStopTime = getValueFromEvent(event);
    storeTargetStopTime();
    writeInfoTextTargetStopTime();
    checkIfAllInputsFilled("targetStopTime");
}

function processCorrectionTime(event){
    correctionTime = getValueFromEvent(event);
    console.log(typeof(correctionTime));
    if(correctionTime === ""){
        correctionTime = undefined;
    }
    storeCorrectionTime();
    checkIfAllInputsFilled("correctionTime");
}

function processNumberOfDays(event){
    numberOfDays = getValueFromEvent(event);
    console.log(typeof(numberOfDays));
    if(numberOfDays === ""){
        numberOfDays = undefined;
    }
    checkIfAllInputsFilled("numberOfDays");
}

function checkIfAllInputsFilled(caller){
    const buttonEl = document.getElementById("runCalcBtn");
    console.log(correctionTime, numberOfDays);
    if(currentStartTime!==undefined && currentStopTime!==undefined && targetStartTime!==undefined && targetStopTime!==undefined && ((correctionTime===undefined && numberOfDays!==undefined)||(correctionTime!==undefined && numberOfDays===undefined)||(correctionTime!==undefined && numberOfDays!==undefined))){
        runCalculation(caller);
        buttonEl.disabled = false;
    } else {
        buttonEl.disabled = true;
    }
}

function writeInfoTextCurrentStartTime(){
    checkFieldForDefaultValue();
    if(haveCurrentStartTime==false) infoFieldEl.innerHTML += "Pasientens nåværende tidspunkt for vekking: " + currentStartTime + ". <br>";
    haveCurrentStartTime = true; 
}

function writeInfoTextCurrentStopTime(){
    checkFieldForDefaultValue();
    if(haveCurrentStopTime==false) infoFieldEl.innerHTML += "Pasientens nåværende tidspunkt for sengetid: " + currentStopTime + ". <br>";
    haveCurrentStopTime = true; 
}

function writeInfoTextTargetStartTime(){
    checkFieldForDefaultValue();
    if(haveTargetStartTime==false) infoFieldEl.innerHTML += "Pasientens ønskede tidspunkt for vekking: " + targetStartTime + ". <br>";
    haveTargetStartTime = true; 
}

function writeInfoTextTargetStopTime(){
    checkFieldForDefaultValue();
    if(haveTargetStopTime==false) infoFieldEl.innerHTML += "Pasientens ønskede tidspunkt for sengetid: " + targetStopTime + ". <br>"; 
    haveTargetStopTime = true;
}

function checkFieldForDefaultValue(){
    if(infoFieldEl.innerText == "Info kommer her når du fyller ut feltene.") infoFieldEl.innerHTML = "";
}

function storeCurrentStartTime(){
    currentStartHour = currentStartTime.slice(0, -3);
    currentStartMinute = currentStartTime.slice(3);
}

function storeCurrentStopTime(){
    currentStopHour = currentStopTime.slice(0, -3);
    currentStopMinute = currentStopTime.slice(3);
}

function storeTargetStartTime(){
    targetStartHour = targetStartTime.slice(0, -3);
    targetStartMinute = targetStartTime.slice(3);
}

function storeTargetStopTime(){
    targetStopHour = targetStopTime.slice(0, -3);
    targetStopMinute = targetStopTime.slice(3);
}

function storeCorrectionTime(){
    if(correctionTime!==undefined){
        correctionTimeHour = correctionTime.slice(0, -3);
        correctionTimeMinute = correctionTime.slice(3);
    }
}

function calculateCorrectionTime(){
    let hourDiff = Math.abs(parseInt(targetStartHour) - parseInt(currentStartHour));
    let minuteDiff = Math.abs(parseInt(targetStartMinute) - parseInt(currentStartMinute));
    let timeDiffInMinutes = hourDiff*60 + minuteDiff;
    let minutesPrDay = Math.ceil(timeDiffInMinutes/parseInt(numberOfDays));
    if(minutesPrDay<10){
        let minutesToPrint = "0"+ minutesPrDay;
        let hourToPrint = "00";
        return hourToPrint + ":" + minutesToPrint
    } else if(minutesPrDay<60){
        let minutesToPrint = minutesPrDay;
        let hourToPrint = "00";
        return hourToPrint + ":" + minutesToPrint
    } else {
        let hourToPrint = Math.floor(minutesPrDay/60);
        if(hourToPrint<10) hourToPrint = "0" + hourToPrint;
        const remainingMinutes = minutesPrDay - hourToPrint*60;
        let minutesToPrint;
        if(remainingMinutes<10){
            minutesToPrint = "0"+remainingMinutes;
        } else{
            minutesToPrint = remainingMinutes;
        }
        return hourToPrint + ":" + minutesToPrint
    }

}

function calculateNumberOfDays(){
    let hourDiff = parseInt(targetStartHour) - parseInt(currentStartHour);
    let minuteDiff = parseInt(targetStartMinute) - parseInt(currentStartMinute);
    let timeDiffInMinutes = hourDiff*60 + minuteDiff;
    let correctionTimeInMinutes = parseInt(correctionTimeHour)*60+parseInt(correctionTimeMinute); 
    numberOfDays = timeDiffInMinutes / correctionTimeInMinutes;
    return Math.abs(Math.ceil(numberOfDays))??0;
}

function runCalculation(caller){
    if(correctionTime===undefined || caller==="numberOfDays") {
        correctionTime = calculateCorrectionTime();
        correctionTimeEl.value = correctionTime;
    } else if(correctionTime!==undefined){
        numberOfDays = calculateNumberOfDays();
        numberOfDaysEl.value = parseInt(numberOfDays);
    }
}

function convertToDays(){
    let CorrectionTimeInMinutes;
    if(Math.abs(parseInt(correctionTimeHour))>0){
        CorrectionTimeInMinutes = parseInt(correctionTimeHour)*60+parseInt(correctionTimeMinute);
    } else{
        CorrectionTimeInMinutes = parseInt(correctionTimeMinute);
    }
    
    let correctionMinutesPrDay = Math.ceil(CorrectionTimeInMinutes/parseInt(numberOfDays));
    console.log("Number Of days: ", numberOfDays, "Corrmin: ", CorrectionTimeInMinutes);
    const result = {
        days:[]
    }
    for(let i = 1; i<=parseInt(numberOfDays);i++){
        const newDay = {};
        const date = new Date();
        date.setDate(date.getDate()+i);
        
        date.setHours(parseInt(currentStartHour), parseInt(currentStartMinute));
        
        date.setMinutes(date.getMinutes()+correctionMinutesPrDay*i);
        
        newDay.year = date.getFullYear();
        newDay.month = date.getMonth();
        newDay.day = date.getDate();
        if(date.getHours()<10){
            newDay.hourStart = "0" + date.getHours();
        } 
        else{
            newDay.hourStart = "" + date.getHours();
        }
        if(date.getMinutes()<10){
            newDay.minuteStart = "0" + date.getMinutes();
        } 
        else{
            newDay.minuteStart = "" + date.getMinutes();
        }
        const stopDate = new Date();
        stopDate.setDate(stopDate.getDate()+i);
        stopDate.setHours(currentStopHour, currentStopMinute);
        stopDate.setMinutes(stopDate.getMinutes()+correctionMinutesPrDay*i);
        if(stopDate.getHours()<10){
            newDay.hourStop = "0" + stopDate.getHours();
        } 
        else{
            newDay.hourStop = "" + stopDate.getHours();
        }
        if(date.getMinutes()<10){
            newDay.minuteStop = "0" + stopDate.getMinutes();
        } 
        else{
            newDay.minuteStop = "" + stopDate.getMinutes();
        }
        result.days.push(newDay);
    }
    return result;
}


function onSave(event){
    event.preventDefault();
    const dataToBeStored = convertToDays();
    console.log(dataToBeStored);
    
}

document.getElementById("runCalcBtn").addEventListener("click", onSave);
