$(document).ready(function () {
    var targetPosition = 600;
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

    function step1FormValid(){
        let validation= true;
        console.log("aaa");
        if($("#inputName").val() == ""){
            $("#inputNameFeedback").show()
            validation= false;
        }else{
            $("#inputNameFeedback").hide()
        }

        if($("#inputPhone").val().length < 10){
            $("#inputPhoneFeedback").show()
            validation= false;
        }else{
            $("#inputPhoneFeedback").hide()
        }

        if($("#inputPincode").val().length != 6){
            $("#inputPincodeFeedback").show()
            validation= false;
        }else{
            $("#inputPincodeFeedback").hide()
        }

        
        return validation;

    }

    $(".gotoStep2").on('click', function () {
        console.log("bbbb")
  
        if(!step1FormValid()){
            $(".step-1").hide();
            $(".step-2").show();
            let data= {"action":"getdemoslots"}

            $.ajax({
                url: 'https://el-chatbot-790176496.catalystserverless.com/get_data?ZCFKEY=2fac13314c8b51b3fb116cb9d9b9b577',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'ZCFKEY':'aab5bb6204a6c653a2e0590450e57d78'
                },
                type: "POST", /* or type:"GET" or type:"PUT" */
                dataType: "json",
                data:  {"action":"getdemoslots"},
                success: function (result) {
                    console.log(result);
                },
                error: function (result) {
                    console.log(result);
                    console.log("error");
                }
            });

            // $(".step-3").hide()
        }
       
    })

    $(".gotoStep3").on('click', function () {
        $(".step-1").hide();
        $(".step-2").hide();
    })



});