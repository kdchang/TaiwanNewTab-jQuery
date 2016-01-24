$(document).ready(function() {
    // loading photos
    function loadPhoto() {
        //var url = 'https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos.json';
        var url = '../photos.json';

        // get images
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: url,
            success: function(response) {
                var rand = 0;
                // Math random; 值範圍：0 ~ 0.9999999(無窮小數)
                rand = Math.floor(Math.floor(Math.random() * response.length));

                // 判斷資料長度非0
                if (response.length !== 0) {
                    // 動態插入背景圖和文字
                    $('body').css('background-image', response[rand].path);
                    $('#img-name').html(response[rand].name);
                    $('#img-link').attr('href', response[rand].link);
                    $('#img-link').attr('title', 'photo via ' + response[rand].authorName);
                }
            },
            error: function(e) {

            }
        }).done(function() {
            // hide the loading bar as loading over
            $('#loading-block').hide();
        });
    }

    // initializeClock
    function initializeClock() {
        var timeinterval = setInterval(function() {
            var now = new Date();
            $('#clock-font').html(formatAMPM(now));
        }, 1000);
    }

    // transfer AM/PM
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        var strTime = '';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
        return strTime;
    }

    function initToogleBar() {
        // toogle search bar
        $('#navbtn').on('click', function() {
            $('#input-block').toggle();
        });
    }

    // call function 
    loadPhoto();
    initializeClock();
    initToogleBar();
});