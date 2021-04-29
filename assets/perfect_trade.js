var timer = null;
var last_timestamp = null;
var mode = 0;
var verticalLayout = false;
var layoutChanged = false;
var mobile = false;
var feed = "Live";
var minHorizontal = 820;
var refreshTime = 2000;

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function getCurrentTime() {
    var d = new Date();
    var hh = d.getHours();
    var mm = d.getMinutes();
    var ss = d.getSeconds();
    var tt = " AM";
    if (hh > 12) {
        hh = hh - 12;
        tt = " PM";
    }
    if (mm < 10) mm = "0" + mm;
    if (ss < 10) ss = "0" + ss;
    return hh + ":" + mm + ":" + ss + tt;
};

function PerfectTrade() {
    $(window).resize(function () {
        console.log("window.resize");
    });

    mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log("mobile:" + mobile);
    if (mobile)
        minHorizontal = 981;
    //if (getUrlParameter("feed"))
    //    feed = getUrlParameter("feed")
    mode = parseInt(getUrlParameter("mode"));
    if (getUrlParameter("refresh") && parseInt(getUrlParameter("refresh")) > 99)
        refreshTime = parseInt(getUrlParameter("refresh"));

    GetData();

    timer = window.setInterval(GetData, refreshTime);
}

function GetData() {
    var width = $(window).width();
    var height = $(window).height();
    layoutChanged = verticalLayout != width < minHorizontal;
    verticalLayout = width < minHorizontal
    console.log("width:" + width + "/" + height + " verticalLayout:" + verticalLayout + " changed:" + layoutChanged);
    switch (mode) {
        case 1: //just first 3 lights
        case 2: //first 3 lights and triggers
            DrawData();
            break;
        case 3: //history only
            DrawHistory();
            break;
    }
}

function DrawData() {
    jQuery.getJSON("http://bma.robotalgo.com/perfecttrade/pt_data.json", function (data, textStatus, jqXHR) {
        if (textStatus != "success") {
            return;
        }

        $("#sp_scanning").html("Scanning (" + data.Count + ") stocks ... last updated at " + getCurrentTime());

        if (data.TimeStamp != last_timestamp) {
            console.log("New Data TimeStamp: " + data.TimeStamp);
            last_timestamp = data.TimeStamp;
        } else {
            if (!layoutChanged)
                return;
        }

        var longs_html = "<table class='data'>";
        if (mode == 2) longs_html += "<tr class='header'><td>Symbol&nbsp;</td><td>Institutions&nbsp;</td><td>Momentum&nbsp;</td><td>Day Trade&nbsp;</td><td>Entry Buy&nbsp;</td><td>Trigger Time</td></tr>";
        else longs_html += "<tr class='header'><td>Symbol&nbsp;</td><td>Institutions&nbsp;</td><td>Momentum&nbsp;</td><td>Day Trade</td></tr>";

        for (i = 0; i < data.Longs.length; i++) {
            longs_html += "<tr><td>" + data.Longs[i].Symbol + "</td>";

            if (data.Longs[i].Institutions == "1") longs_html += "<td style='background-color: green'></td>";
            else longs_html += "<td style='background-color: white'></td>";

            if (data.Longs[i].Momentum == "1") longs_html += "<td style='background-color: green'></td>";
            else longs_html += "<td style='background-color: white'></td>";

            if (data.Longs[i].DayTrade == "1") longs_html += "<td style='background-color: green'></td>";
            else longs_html += "<td style='background-color: white'></td>";

            if (mode == 2) {
                if (data.Longs[i].Entry == "1") longs_html += "<td style='background-color: green'></td>";
                else longs_html += "<td style='background-color: white'></td>";
                if (data.Longs[i].TriggerTime != "12:00 AM") longs_html += "<td class='time'>" + data.Longs[i].TriggerTime + "</td>";
                else longs_html += "<td class='time'></td>";
            }

            longs_html += "</tr>";
        }
        longs_html += "</table>";

        var shorts_html = "<table class='data'>";
        if (mode == 2) shorts_html += "<tr class='header'><td>Symbol&nbsp;</td><td>Institutions&nbsp;</td><td>Momentum&nbsp;</td><td>Day Trade&nbsp;</td><td>Entry Short&nbsp;</td><td>Trigger Time</td></tr>";
        else shorts_html += "<tr class='header'><td>Symbol&nbsp;</td><td>Institutions&nbsp;</td><td>Momentum&nbsp;</td><td>Day Trade</td></tr>";
        for (i = 0; i < data.Shorts.length; i++) {
            shorts_html += "<tr><td>" + data.Shorts[i].Symbol + "</td>";

            if (data.Shorts[i].Institutions == "-1") shorts_html += "<td style='background-color: red'></td>";
            else shorts_html += "<td style='background-color: white'></td>";

            if (data.Shorts[i].Momentum == "-1") shorts_html += "<td style='background-color: red'></td>";
            else shorts_html += "<td style='background-color: white'></td>";

            if (data.Shorts[i].DayTrade == "-1") shorts_html += "<td style='background-color: red'></td>";
            else shorts_html += "<td style='background-color: white'></td>";

            if (mode == 2) {
                if (data.Shorts[i].Entry == "-1") shorts_html += "<td style='background-color: red'></td>";
                else shorts_html += "<td style='background-color: white'></td>";
                if (data.Shorts[i].TriggerTime != "12:00 AM") shorts_html += "<td class='time'>" + data.Shorts[i].TriggerTime + "</td>";
                else shorts_html += "<td class='time'></td>";
            }

            shorts_html += "</tr>";
        }
        shorts_html += "</table>";

        var table_html;
        if (verticalLayout) {

            table_html = longs_html + "</br>";
            table_html += shorts_html;
        }
        else {
            table_html = "<table ><tr style='vertical-align:top;'>";
            table_html += "<td>" + longs_html + "</td>";
            table_html += "<td>" + shorts_html + "</td>";
            table_html += "</tr></table>";
        }
        $("#sp_table").html(table_html);
    })
}

function DrawHistory() {
    jQuery.getJSON("http://bma.robotalgo.com/perfecttrade/pt_history.json", function (data, textStatus, jqXHR) {
        if (textStatus != "success") return;

        if (data.TimeStamp != last_timestamp) {
            console.log("New History TimeStamp: " + data.TimeStamp);
            last_timestamp = data.TimeStamp;
        } else return;

        var triggers = $("#sp_history_table");
        var triggers_html = "<table class='data'>";
        triggers_html += "<tr class='header'><td>Symbol&nbsp;</td><td>Side&nbsp;</td><td>Trigger Time</td></tr>";
        for (i = 0; i < data.Triggers.length; i++) {
            triggers_html += "<tr>";
            triggers_html += "<td>" + data.Triggers[i].Symbol + "</td>";
            if(data.Triggers[i].Side == "BUY")
                triggers_html += "<td class='trigger_buy'>" + data.Triggers[i].Side + "</td>";
            else
                triggers_html += "<td class='trigger_sell'>" + data.Triggers[i].Side + "</td>";
            triggers_html += "<td class='time'>" + data.Triggers[i].TriggerTime + "</td>";
            triggers_html += "</tr>";
        }
        triggers_html += "</table>";
        triggers.html(triggers_html);
    })
}
