$(document).ready(function () {
    var targetPosition = 600;
    var slots = '{"Number_Of_Slots":"2","Slot1":"22 Sep, Fri 05:00 PM","1":"3527424000220791740","Slot2":"22 Sep, Fri 08:00PM","2":"3527424000220791770"}';

    // ----------------------------------------------------
    // Dynamically change number of people in UI
    // ----------------------------------------------------
    var onScroll = function () {
        var scrollPosition = $(this).scrollTop();
        // console.log(scrollPosition);
        if (scrollPosition >= targetPosition) {
            console.log("function hit");
            targetPosition += 500;
            let counts = setInterval(updated);
            let upto = 0;
            function updated() {
                $("#SuccessStoriesSlider").carousel(0)
                let count = document.getElementById("counter");
                upto = upto + 50;
                count.innerHTML = upto;
                if (upto === 15000) {
                    clearInterval(counts);
                }
            }
        }
    }
    $(window).on('scroll', onScroll);

    // ----------------------------------------------------
    // Validate Form in Step 1 before proceeding
    // ----------------------------------------------------

    function step1FormValid() {
        let validation = true;
        console.log("aaa");
        if ($("#inputName").val() == "") {
            $("#inputNameFeedback").show()
            validation = false;
        } else {
            $("#inputNameFeedback").hide()
        }

        if ($("#inputPhone").val().length < 10) {
            $("#inputPhoneFeedback").show()
            validation = false;
        } else {
            $("#inputPhoneFeedback").hide()
        }

        if ($("#inputPincode").val().length != 6) {
            $("#inputPincodeFeedback").show()
            validation = false;
        } else {
            $("#inputPincodeFeedback").hide()
        }

        if (!$("#customWhatsappCheck").is(":checked")) {
            $("#inputWhatsappFeedback").show()
            validation = false;
        } else {
            $("#inputWhatsappFeedback").hide()
        }

        return validation;
    }

    // ----------------------------------------------------
    // Update Total slots in UI
    // ----------------------------------------------------

    function updateSlots() {
        let slotsObj = JSON.parse(slots);
        $(".slotsDiv").html("")
        let html = ""
        for (var i = 0; i < parseInt(slotsObj['Number_Of_Slots']); i++) {
            console.log(slotsObj['Slot' + (i + 1)]);
            html = html + '<label class="btn btn-weekdays"><input class="slotInputs" type="radio" name="options" id="' + slotsObj['Slot' + (i + 1)] + '" checked> ' + slotsObj['Slot' + (i + 1)] + '</label>'
        }
        $(".slotsDiv").html(html)

    }

    // ----------------------------------------------------
    // Go to Step 2, update UI
    // ----------------------------------------------------

    $(".gotoStep2").on('click', async function () {
        if (step1FormValid()) {
            $(".step-1").hide();
            $(".step-2").show();

            const url = 'https://el-chatbot-790176496.development.catalystserverless.com/get_data';

            const data = '{"action":"getdemoslots","language":"Kannada"}';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'ZCFKEY': 'aab5bb6204a6c653a2e0590450e57d78',
                    'Cookie': '"46512fd555=bbdfb771565421abbe10f7a180903d28; ZD_CSRF_TOKEN=d8354dd1-9e69-4a70-97f5-73374b273234; _zcsr_tmp=d8354dd1-9e69-4a70-97f5-73374b273234"',
                    'Content-Type': 'application/json',
                },
                body: data,
            });

            slots = await response.text();
            console.log(slots);
            updateSlots();
        }

    })

    // ----------------------------------------------------
    // Go to Step 3, update UI
    // ----------------------------------------------------

    $(".gotoStep3").on('click', function () {

        let selectedSlot=""; //data

        for(let i=0; i< $(".slotInputs").length; i++){
            if($(".slotInputs")[i].checked){
                selectedSlot = $(".slotInputs")[1].id;
            }
        }

        if(selectedSlot==""){
            $("#selectSlotError").show()
            return;
        }else{
            $("#selectSlotError").hide()
        }

        $(".step-1").hide();
        $(".step-2").hide();
        $(".step-3").show()

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("ZCFKEY", "aab5bb6204a6c653a2e0590450e57d78");
        myHeaders.append("Cookie", "46512fd555=ba2a1b22f2a5e14b0d2647f7e38884fc; ZD_CSRF_TOKEN=98bf8780-3b99-4bf1-95ff-9fbce59d922b; _zcsr_tmp=98bf8780-3b99-4bf1-95ff-9fbce59d922b");

        var raw = JSON.stringify({
            "Student Name": $("#inputName").val(),
            "Age": "",
            "Mobile Number": $("#inputPhone").val(),
            "language": "kannada",
            "slot" : selectedSlot,
            "pincode": $("#inputPincode").val()
        });

        console.log('sent params', raw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://el-chatbot-790176496.development.catalystserverless.com/newlead", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    })



});