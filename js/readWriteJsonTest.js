
const fs = require ("fs");

const testWrite = {
    "year": 2022,
    "month": 5,
    "day": 16,
    "hourStart": '12',
    "minuteStart": '30',
    "hourStop": '23',
    "minuteStop": '30'
};





fs.readFile('js/test.json', 'utf-8',(err, data) => {
    if(err) {
        throw err
    }
    let times = JSON.parse(data.toString());
    
});

target

document.getElementById("runCalcBtn").addEventListener("click", write(data));

function write(data){
    console.log("data" + targetStartTime);
    console.log("full data" + data);

fs.writeFile('js/test.json', data, (err) => {
    if(err){
        throw err;
    }
    console.log('Write succsesfull')
});}
