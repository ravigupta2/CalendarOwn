$(document).ready(function () {
    var i=0,dow=4,daysCounter=1;
    for (i=1970;i<2071;i++){
        if(i==2020){
            $('#year').append(`<option value="${i}" selected> 
                                       ${i} 
                                  </option>`);
        }
        else {
            $('#year').append(`<option value="${i}"> 
                                       ${i} 
                                  </option>`);
        }
    }
    var months=["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
    var days=["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"]
    for(i=0;i<12;i++){
        $('#month').append(`<option value="${i}"> 
                                       ${months[i]} 
                                  </option>`);
    }
    var d = new Date();
    var currentYear, currentDay, currentDate,currentMonth;
    currentYear=d.getFullYear();
    currentDate=d.getDate();
    currentMonth=d.getMonth();
    renderCalendar(currentYear,currentMonth,currentDate);
    $("#month").click(function () {
        $("#date").empty();
        let k=0;
        let value=$(this).children("option:selected").val();
        if(value==0 || value==2 || value==4 || value==6 || value==7 || value==9 || value==11 ){
            k=32;
        }
        else if(value==1){
            var yearValue=$("#year").children("option:selected").val();
            if(yearValue%4==0 && yearValue%400==0 || yearValue%4==0 && yearValue%100!=0){
                k=30;
            }
            else {
                k=29;
            }
        }
        else {
            k=31;
        }
        for (i=1;i<k;i++){
            $('#date').append(`<option value="${i}"> 
                                       ${i} 
                                  </option>`);
        }
    })
    function today() {
        var d = new Date();
        var currentYear, currentDay, currentDate,currentMonth;
        currentYear=d.getFullYear();
        currentDate=d.getDate();
        currentMonth=d.getMonth();
        renderCalendar(currentYear,currentMonth,currentDate)

    }

    $("#currentDay").click(function () {
    today();
    })
    $("#find").click(function () {

        let year=$("#year").children("option:selected").val();
        let month=$("#month").children("option:selected").val();
        let date=$("#date").children("option:selected").val();
        renderCalendar(year,month,date)
    })
    $("#next").click(function () {
        let month=$("#Monthdisplay").attr('value');
        let year=$("#Yeardisplay").html();
        let date=d.getDate();
        if(month<11){
            month++;
        }
        else {
            month=0;
            year++;
        }
        renderCalendar(year,month,date)
    })
    $("#prev").click(function () {
        let month=$("#Monthdisplay").attr('value');
        let year=$("#Yeardisplay").html();
        let date=d.getDate();

        if(month>0){
            month--;
        }
        else {
            month=11;
            year--;
        }
        renderCalendar(year,month,date)
    })
    function leapYear(yearValue){
        if(yearValue%4==0 && yearValue%400==0 || yearValue%4==0 && yearValue%100!=0){
            return true;
        }
        else {
            return false;
        }
    }
    function totalDays(m,y){
        if(m==0 || m==2 || m==4 || m==6 || m==7 || m==9 || m==11 ){
           return 31;
        }
        else if (m==1) {
            if (leapYear(y)) {
                return 29;
            } else {
                return 28;
            }
        }
        else {
            return 30;
        }
    }
    function renderCalendar(year,month,date){
        $("#Monthdisplay").html(months[month]+' ').attr('value',month);
        $("#Yeardisplay").html(year);
        $("#calenderBody td").css("border","none").html(' ');
        for (i=1970; i<=year; i++)
        {
            dow++;
            if (leapYear(i-1))
                dow ++;
        }
        dow=(dow-1)%7;
        for (i = 0; i<month; i++) {
            dow += totalDays(i, year);
        }
        let startingDay=(dow)%7;
        dow=4;
        let totalCel=$("#calenderBody td").length;
        let monthDays=totalDays(month, year);
        for(i=0;i<totalCel;i++){
            if(i>=startingDay && i<monthDays+startingDay){
                if(daysCounter<=monthDays) {
                    $("#calenderBody td").eq(i).html(daysCounter);
                    if(daysCounter==date){
                        $("#calenderBody td").eq(i).css("border","1px solid #bf822f")
                    }
                    daysCounter++;
                }
            }
        }
        daysCounter=1;
    }
});