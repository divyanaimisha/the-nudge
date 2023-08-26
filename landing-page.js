$(document).ready(function () {

    let counts = setInterval(updated);
    let upto = 0;
    function updated() {
        let count = document.getElementById("counter");
        upto = upto + 100;
        count.innerHTML = upto;
        if (upto === 15000) {
            clearInterval(counts);
        }
    }

    $(".gotoStep2").on('click', function(){
        $(".step-1").hide();
        $(".step-2").show()
        // $(".step-3").hide()
    })

    $(".gotoStep3").on('click', function(){
        $(".step-1").hide();
        $(".step-2").hide();

        

        // Update In Excel

        var ss = SpreadsheetApp.getActive();

function onOpen() {
  var menu = [{name:"Add New Last Row", functionName:"addFirstRow"}];
  ss.addMenu("Extra", menu);
}

function addFirstRow() {
  var sheet = ss.getActiveSheet();
  sheet.appendRow(['This row']);

  // Insert one empty row after the last row in the active sheet.
  sheet.insertRowsAfter(sheet.getMaxRows(), 1);
  sheet.appendRow(['That Row']);
  
  
  // Shifts all rows down by one
  sheet.insertRows(1);
  
  // inserts a row at row 10
  sheet.insertRows(10);
  
}

        // $(".step-3").hide()
    })

});