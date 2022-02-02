const width = 600;

function compassTemplate(id) {
    let canvas = document.getElementById(id);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        ctx.fillStyle = '#E84C3D'; // red
        ctx.fillRect(0, 0, width / 2, width / 2);

        ctx.fillStyle = '#3598DB'; // blue
        ctx.fillRect(width / 2, 0, width / 2, width / 2);

        ctx.fillStyle = '#2DCC70'; // green
        ctx.fillRect(0, width / 2, width / 2, width / 2);

        ctx.fillStyle = '#8D44AD'; // purple
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

function circle(id, x, y, color, radius) {
    let canvas = document.getElementById(id);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 10 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.fillStyle = color;
        ctx.stroke();
        ctx.fill();
    }
}

function getData(fileurl) {
    p = new Promise(function (resolve, reject) {
        let array = [];
        $(document).ready(() => {
            $.ajax({
                url: fileurl,
                dataType: "text",
                success: function (data) {
                    let row = data.split(/\r?\n|\r/);
                    for (let i = 0; i < data.length; i++) {
                        if (row[i] != undefined) {
                            var cell = row[i].split(";");
                            if (cell != "") {
                                array.push(cell);
                            }
                        }
                    }
                    console.log(array);
                    if (array != undefined) {
                        resolve(array);
                    } else {
                        reject("error")
                    }
                }
            })
        })
    })
    return p
}

function plotData(id, array) {
    let sumx = 0,
        sumy = 0;
    let x, y;
    for (let i = 0; i < array.length; i++) {
        x = array[i][0].replace(",", ".");
        y = array[i][1].replace(",", ".");

        x = (parseFloat(x) + 1.0) * width / 2;
        y = (-parseFloat(y) + 1.0) * width / 2;

        sumx += x;
        sumy += y;
        circle(id, x, y, "red", 11);
    }
    circle(id, sumx / array.length, sumy / array.length, "blue", 11);
}

window.onload = async function () {
    let data1, data2;
    compassTemplate('left-compass');
    compassTemplate('right-compass');

    data1 = await getData("https://raw.githubusercontent.com/mizydorczyk/plc/main/dane1.csv"); // dane1 2021
    data2 = await getData("https://raw.githubusercontent.com/mizydorczyk/plc/main/dane2.csv"); // dane2 2022
    plotData('left-compass', data1);
    plotData('right-compass', data2);
};
