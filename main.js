function postItem() {
    $.ajax({
        type: "POST",
        url: "/saveBook",
        timeout: 2000,
        data: {
            author: $("#author").val(),
            country: $("#country").val(),
            imageLink: $("#imageLink").val(),
            language: $("#language").val(),
            link: $("#link").val(),
            pages: $("#pages").val(),
            title: $("#title").val(),
            year: $("#year").val()
        },
        success: [
            function (data) {
                console.log('Success!')
            }
        ],
        complete: [
            function (data) {
               fillTable();
            }
        ],
        error: [function (jqXHR, textStatus, err) {
            console.log('text status ' + textStatus + ', err ' + err)
        }]
    });
}


$("#button").click(function () {
    postItem();
});

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
                location.reload();

                /*var jsonData = [];

                for(var i in data.responseJSON){
                    jsonData.push(data.responseJSON[i]);
                }
                var filteredJson = filterJson(jsonData);

                buildHtmlTable(filteredJson);*/
            }
        ],
        error: [function (jqXHR, textStatus, err) {
            console.log('text status ' + textStatus + ', err ' + err)
        }]
    });

}

function fillTable(){
    $.get("http://localhost:8888/findAll", function (data) {
        var filteredJson = filterJson(data);
        buildHtmlTable(filteredJson);
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


$(function () {

    fillTable();

})
