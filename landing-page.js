$(document).ready(function () {
    var targetPosition = 600;
    var slots = '';

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
        return validation;
    }

    function updateSlots() {
        let slotsObj = JSON.parse(slots);
        $(".slotsDiv").html("")
        let html = ""
        for (var i = 0; i < parseInt(slotsObj['Number_Of_Slots']); i++) {
            console.log(slotsObj['Slot' + (i + 1)]);
            html = html + '<label class="btn btn-weekdays"><input type="radio" name="options" id="' + slotsObj['Slot' + (i + 1)] + '" checked> ' + slotsObj['Slot' + (i + 1)] + '</label>'
        }
        $(".slotsDiv").html(html)

    }

    $(".gotoStep2").on('click', function () {
        console.log("bbbb")

        if (step1FormValid()) {
            $(".step-1").hide();
            $(".step-2").show();

            $.ajax({
                url: 'https://el-chatbot-790176496.development.catalystserverless.com/get_data',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'ZCFKEY': 'aab5bb6204a6c653a2e0590450e57d78'
                },
                type: "POST", /* or type:"GET" or type:"PUT" */
                dataType: "json",
                data: { "action": "getdemoslots", "language": "Kannada" },
                success: function (result) {
                    console.log(result);
                    slots=reslult;
                    updateSlots();
                },
                error: function (result) {
                    console.log(result);
                    console.log("error");
                    slots = '{"Number_Of_Slots":"2","Slot1":"22 Sep, Fri 05:00 PM","1":"3527424000220791740","Slot2":"22 Sep, Fri 08:00PM","2":"3527424000220791770"}';
                    updateSlots();
                }
            });
        }

    })

    $(".gotoStep3").on('click', function () {

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
            "pincode" : $("#inputPincode").val()
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