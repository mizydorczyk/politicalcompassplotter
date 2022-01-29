function compassTemplate(id) {
    const width = 600;
    var canvas = document.getElementById(id);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = '#E84C3D'; //czerwony
        ctx.fillRect(0, 0, width / 2, width / 2);

        ctx.fillStyle = '#3598DB'; //niebieski
        ctx.fillRect(width / 2, 0, width / 2, width / 2);

        ctx.fillStyle = '#2DCC70'; //zielony
        ctx.fillRect(0, width / 2, width / 2, width / 2);

        ctx.fillStyle = '#8D44AD'; //fiolet
        ctx.fillRect(width / 2, width / 2, width / 2, width / 2);

        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(width / 2, width);
        ctx.lineTo(width / 2, 0);
        ctx.stroke();


        ctx.beginPath();
        ctx.moveTo(0, width / 2);
        ctx.lineTo(width, width / 2);
        ctx.stroke();
    }
}

function circle(id, x, y) {
    var canvas = document.getElementById(id);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, 100 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.fillStyle = "red";
        ctx.stroke();
        ctx.fill();
    }
}

function getData(fileurl) {
    var array = [];
    $(document).ready(() => {
        $.ajax({
            url: fileurl,
            dataType: "text",
            success: function (data) {
                var row = data.split(/\r?\n|\r/);
                for (var i = 0; i < data.length; i++) {
                    if (row[i] != undefined) {
                        var cell = row[i].split(";");
                        if (cell != "") {
                            array.push(cell);
                        }
                    }
                }
                console.log(array);
                return array;
            }
        })
    })
}

// function plotData(id, array) {
//     var x, y;
//     for (var i = 0; i < array.length; i++) {
//         x = (array[i][0] + 1) * 300;
//         y = (array[i][1] + 1) * 300;
//         console.log(x);
//     }
// }

window.onload = function () {
    compassTemplate('left-compass');
    compassTemplate('right-compass');
    getData("https://raw.githubusercontent.com/mizydorczyk/plc/main/dane1.csv"); // dane1.csv
    getData("https://raw.githubusercontent.com/mizydorczyk/plc/main/dane2.csv"); // dane2.csv
};