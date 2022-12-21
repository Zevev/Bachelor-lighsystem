
const axios = require("axios"); // Needed together with node to sendt http requests


const host = ""; // IP-adress for the bridge
const username = "XCfVN74dQYUPYlW2QLS4zk-YGdjPgaRr-oHZY60I"; //Confirmed user able to make changes to the bridge
const hueUrl = `${host}/api/${username}`; // Combined URL to the bridge
let wakeUpMinute = 0;
let wakeUpHour = 8;
let sleepHour = 22;
let sleepMinute = 0;

function lightButtonAutomatic() {
setInterval(function(){ // Set interval for checking
    var date = new Date(); // Create a Date object to find out what time it is
    if(date.getHours() === 8 && date.getMinutes() === 0){ // Check the time waking up
        turnLightOnOrOff(1, true, 153, 180*10000, 412);
        turnLightOnOrOff(2, true, 153, 180*10000, 412 );
    }

    if(date.getHours() === 8 && date.getMinutes() === wakeUpMinute+30){ // Check the time for changing color temp midday
        turnLightOnOrOff(1, true, 215, 540*10000, 5);
        turnLightOnOrOff(2, true, 215, 540*10000, 5);
    }

    if(date.getHours() === wakeUpHour+2 && date.getMinutes() === wakeUpMinute){ // Check the time for changing color temp midday
        turnLightOnOrOff(1, true, 254, 720*10000, 1);
        turnLightOnOrOff(2, true, 254, 720*10000, 1);
    }

    if(date.getHours() === wakeUpHour+4 && date.getMinutes() === wakeUpMinute){ // Check the time for changing color temp midday
        turnLightOnOrOff(1, true, 254, 2880*10000, 454);
        turnLightOnOrOff(2, true, 254, 2880*10000, 454);
    }
     

    if(date.getHours() === sleepHour-2 && date.getMinutes() === sleepMinute){ // Check the time for going to sleep
        turnLightOnOrOff(1, false, 0, 720*10000, 454);
        turnLightOnOrOff(2, false, 0, 720*10000, 454);
    }
}, 30000); // Repeat every 30000 milliseconds (30 seconds)
}

function lightButtonOn() {
    turnLightOnOrOff(1, true, 254, 2, 1);
    turnLightOnOrOff(2, true, 254, 2, 1);
}

function lightButtonOff(){
    turnLightOnOrOff(1, false, 254, 2, 1);
    turnLightOnOrOff(2, false, 254, 2, 1);
}

const turnLightOnOrOff = async (lightId, on, bri, transitiontime, ct) => {
    const url = `${hueUrl}/lights/${lightId}/state`
    try {
        return await axios.put(url, {
            on,
            bri, // Brightness
            transitiontime,
            ct, // Color
        });
    } catch (err) {
        console.error(err);
    }
};
