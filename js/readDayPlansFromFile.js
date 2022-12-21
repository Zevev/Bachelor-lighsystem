
let allText;
let dayplans;

const weekDays = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];

class DayPlan {
    constructor(day, date, startTime, stopTime){
        this.day = day;
        this.date = date;
        this.startTime = startTime;
        this.stopTime = stopTime;
    }

    get dayName() {
        return this.day; 
    }

    get dayDate() {
        return this.date; 
    }

    get dayStartTime() {
        return this.startTime; 
    }

    get dayStopTime() {
        return this.stopTime; 
    }
}


async function getFile(){
    const result = await fetch("/bachelor/js/test.json");
    console.log(result);
    const jsonFile = await result.json();
    console.log(jsonFile);
    return jsonFile;
}

function convertToDayPlans(data){   
    let dayPlans = [];
    for(let day of data.days){
        dayPlans.push(convertToDayPlan(day));
    } 
    return dayPlans;
}

function convertToDayPlan(day){
    console.log(day);
    const date = new Date(day.year, day.month, day.day);
    console.log(`date `, date);
    const dayName = dateToDay(date);
    console.log(`dayName `, dayName);
    const startTime = `${day.hourStart}:${day.minuteStart}`;
    console.log(`start `, startTime);
    const stopTime = `${day.hourStop}:${day.minuteStop}`;
    console.log(`stop `, stopTime);
    const dayPlan = new DayPlan(dayName, date, startTime, stopTime);
    return dayPlan;
}

function dateToDay(date){
    return weekDays[date.getDay()];
}



function generateRows(dayPlans){
    const rows = dayPlans.map((dayPlan) => {
        return `
        <tr>
        <td>${dayPlan.dayName}</td>
        <td>${dayPlan.dayDate.getDate()}.${dayPlan.dayDate.getMonth()}.${dayPlan.dayDate.getFullYear()} </td>
        <td>${dayPlan.startTime}</td>
        <td>${dayPlan.stopTime}</td>
        </tr>
        `
    })
    return rows;
}

async function readDayPlansFromFile(){
    const tableBodyEl = document.getElementById("dayTableTbody");
    const data = await getFile();
    const dayPlans = convertToDayPlans(data);
    tableBodyEl.innerHTML = generateRows(dayPlans);
}

readDayPlansFromFile();