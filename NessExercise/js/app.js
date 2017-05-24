$(document).ready(function(event) {
    var addRow;
    var tableBody;
    var searchRow;
    var vehicleTab, vehicleRow, vehicleselectType, vehicleMake, vehicleModel;
    var index;
    addRow = document.getElementsByClassName('add-row');
    searchRow = document.getElementById('searchIcon');
    convertTable = document.getElementById('convert-table');

    tableBody = document.getElementById('VehicleTable');

    //For adding the vehicle Details on + button
    addRow[0].addEventListener("click", function() {
        searchRow.value = "";
        index = document.getElementById("selectType").selectedIndex;
        if (index == 0) {
            alert("Please select a type");
            return false;
        } else if (document.getElementById("make").value == "") {
            alert("Please enter value in make textbox");
            return false;
        } else if (document.getElementById("model").value == "") {
            alert("Please enter value in model textbox");
            return false;
        }
        vehicleTab = document.getElementById("VehicleTable");
        vehicleRow = vehicleTab.insertRow(-1);
        vehicleselectType = vehicleRow.insertCell(0);
        vehicleMake = vehicleRow.insertCell(1);
        vehicleModel = vehicleRow.insertCell(2);

        vehicleselectType.innerHTML = document.getElementsByTagName("option")[index].value;
        vehicleMake.innerHTML = document.getElementById("make").value;
        vehicleModel.innerHTML = document.getElementById("model").value;
        document.getElementById("selectType").value = document.getElementsByTagName("option")[0].value;
        document.getElementById("make").value = "";
        document.getElementById("model").value = "";
    });
	
    //For searching the vehicle Details on search input textbox
    searchRow.addEventListener("keyup", function(event) {
        var tr = tableBody.getElementsByTagName("tr");
        var v = searchRow.value.toLowerCase();

        var found;
        for (var i = 0; i < tr.length; i++) {
            var fullnameCol = tr[i].getElementsByTagName("td");

            if (fullnameCol) {
                found = false;
                for (var j = 0; j < fullnameCol.length; j++) {
                    fullnameColVal = fullnameCol[j].innerHTML.toLowerCase();
                    if (v.length > 2) {
                        if (fullnameColVal.indexOf(v) > -1) {
                            found = true;
                        } else {}
                    }
                }
                tableBody.rows[i].className = "none";
                if (found == false && v.length > 2) {
                    tableBody.rows[i].className = "none";
                } else if (found == true && v.length > 2) {
                    tableBody.rows[i].className = "display";
                }
            }
        }
    });
	
    //For Populating the Json in Divs by Json button
    convertTable.addEventListener("click", function(event) {
        var myRows = {
            vehicleData: []
        };
        var htmlText = '';
        document.getElementById("div-container").innerHTML = "";
        var row, rows = tableBody.rows;
        if (rows.length == 0) {
            alert("There is no Data Available.Add the Data to Vehicle table");
            return false;
        }
        for (var k = 0; k < rows.length; k++) {
            var obj = {};
            row = rows[k];
            var columns = row.getElementsByTagName("td");
            for (var td = 0; td < columns.length; td++) {
                if (td == 0) {
                    obj["Type"] = row.cells[0].textContent;
                } else if (td == 1) {
                    obj["Make"] = row.cells[1].textContent;
                } else if (td == 2) {
                    obj["Model"] = row.cells[2].textContent;
                }

            }
            myRows.vehicleData.push(obj);
        }
        var data = JSON.stringify(myRows);
        var jsonObject = JSON.parse(data);
        if (jsonObject.vehicleData[0]) {
            $('#jsondiv-container').html(data);

            for (var key in jsonObject.vehicleData) {
                htmlText += '<p class="p-type"> Type: ' + jsonObject.vehicleData[key].Type + '</p>';
                htmlText += '<p class="p-make"> Make: ' + jsonObject.vehicleData[key].Make + '</p>';
                htmlText += '<p class="p-model" style="border-bottom:1px solid red"> Model: ' + jsonObject.vehicleData[key].Model + '</p>';
            }
            $('#div-container').append(htmlText);
            var DivDatapopulated = document.getElementById("div-container");
            DivDatapopulated.className = "divContainer";
            $('.divContainer').show();
        }
    });
});