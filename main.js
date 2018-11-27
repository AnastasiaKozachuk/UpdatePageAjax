function filterJson(data) {

    var i = data.length - 1;
    for (i; i >= 0; i--) {
        delete data[i]["__v"];
        delete data[i]["_id"];
    }
    return data;
}


function fillTableWithAjax() {
    $.ajax({
        type: "GET",
        url: "/findAll",
        timeout: 2000,
        success: [
            function (data) {
                console.log('Success filling!')
            }
        ],
        complete: [
            function (data) {

                $("#table").html("");
                var jsonData = [];

                for(var i in data.responseJSON){
                    jsonData.push(data.responseJSON[i]);
                }
                var filteredJson = filterJson(jsonData);

                buildHtmlTable(filteredJson);

                setTimeout(function () {
                   fillTableWithAjax();
                }, 500);

            }
        ],
        error: [function (jqXHR, textStatus, err) {
            console.log('text status ' + textStatus + ', err ' + err)
        }]
    });

}

function buildHtmlTable(myList) {
    var selector = "#table";
    var columns = addAllColumnHeaders(myList, selector);

    for (var i = 0; i < myList.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        $(selector).append(row$);
    }
}

function addAllColumnHeaders(myList, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $(selector).append(headerTr$);

    return columnSet;
}
