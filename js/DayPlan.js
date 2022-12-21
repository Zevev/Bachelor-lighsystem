export class DayPlan {
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