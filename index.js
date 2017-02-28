var _ = require('underscore');
var c3 = require('c3');
var $ = require('jquery');
var data = require('./data.js');
//line chart over time
var dd = [];
_.each(data.sessionName, function (key, value) {
    if (data['session' + key] && data['session' + key].length) {
        dd.push([value].concat(
            _.map(data['session' + key], function (time, index) {
                return time[0][1]/1000;
            })
        ));
    }
});
dd = _.reject(dd, function (a) {return a.length === 0;});
/*{
    "keys":{
        "value":[
            "Existing Customer",
            "Other",
            "Referral",
            "Inbound",
            "SDRs",
            "Employee Referral"
        ]
    },
    "json":[
        {"Existing Customer":102},
        {"Other":94},
        {"Referral":165},
        {"Inbound":134},
        {"SDRs":133},
        {"Employee Referral":21}
    ],
    "type":"donut"
}*/
var types = [
    'area-step',
    'step',
    'line',
    'bar',
],
$body = $('body');

_.each(types, function (type) {
    $body.append('<div id="' + type + '"></div>');
    var chart = c3.generate({
        data: {
            // x: 'x',
            columns: dd,
            type: type,
        },
        zoom: {
            enabled: true
        }
    });
    $('#' + type).append(chart.element);
});

var donut = _.map(dd, function (times, overallIndex) {
    var name = times.shift();
    var gped = _.groupBy(times, Math.ceil);
    var keys = _.keys(gped);
    var sections = Math.floor(_.keys(_.groupBy(times, Math.floor)).length / 5);

    var gps = [];
    for (var i = 0; i < keys.length / sections; i++) {
        var object = {};
        var tk = keys.slice(i*sections, sections * (i + 1));
        if (tk[0] === tk[tk.length - 1]) {
            object[(tk[0] - 1) + '+'] = tk;
        } else {
            object[(tk[0] - 1) + ' - ' + tk[tk.length - 1]] = tk;
        }
        gps.push(object);
    }

    var obj = _.map(gps, function (val, key) {
        var objkey = _.keys(val)[0];
        var oo2 = [];
        oo2.push(objkey);
        oo2.push(_.flatten(
            _.map(val[objkey], function (a) {
                return gped[a];
            })
        ).length);

        return oo2;
    });

    var donut = c3.generate({
        data: {
            columns: obj,
            type: 'donut'
        },
    });
    var d = $('<div class="donut"/>');
    d.append(donut.element).appendTo('body');
    console.log(dd, data);
    d.append('<h3 class="fancy-label">' + data.sessionName[overallIndex+1 + ''] + '</h3>');
});
//
// var chart = c3.generate({
//     data: {
//         // x: 'x',
//         columns: [
//             dd
//         ],
//         type: 'donut',
//     },
// });
