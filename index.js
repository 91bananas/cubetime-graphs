var _ = require('underscore');
var c3 = require('c3');
var $ = require('jquery');
//line chart over time
debugger
var parsed = _.map(data, function (time, index) {
    return time[0][1]/1000;
    return list;
});

parsed.unshift('first');
console.log('line chart data');
console.log(parsed);

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

var chart = c3.generate({
    data: {
        // x: 'x',
        columns: [
            parsed
        ],
        type: 'bar',
    },
    // axis: {
    //     x: {
    //         // type: 'category',
    //         tick: {
    //             format: function (x) {
    //                 return x;
    //             }
    //         },
    //         height: 40,
    //     },
    //     y: {
    //         min: 0,
    //         max: 1,
    //         padding: {
    //             bottom: 0,
    //             top: 4
    //         },
    //         tick: {
    //             format: function (y) {
    //                 return y;
    //             }
    //         },
    //     }
    // },
    tooltip: {
        format: {
            name: function (name) {
                return templateHelpers.titleify(name);
            }
        }
    }
});
$('.chart').empty().append(chart.element);
