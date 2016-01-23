$(document).ready(function() {
    function loadPhoto() {
        //var url = 'https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos.json';
        var url = '../photos.json';

        // get images
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: url,
            success: function(response) {
                var imgSource = [];
                var imgLink = [];
                var imgName = [];
                var imgAuthor = [];
                var rand = 0;
                var showImgSource = '';
                var showImgLink = '';
                var showImgName = '';
                var showImgAuthor = '';

                for (var key in response) {
                    imgSource.push(response[key].path);
                    imgLink.push(response[key].link);
                    imgName.push(response[key].name);
                    imgAuthor.push(response[key].authorName);
                }

                rand = Math.floor(Math.floor(Math.random() * imgSource.length));

                showImgSource = imgSource[rand];
                showImgLink = imgLink[rand];
                showImgName = imgName[rand];
                showImgAuthor = imgAuthor[rand];

                if (imgSource.length !== 0) {
                    $('body').css('background-image', showImgSource);
                    $('#img-name').html(showImgName);
                    $('#img-link').attr('href', showImgLink);
                    $('#img-link').attr('title', 'photo via ' + showImgAuthor);
                }
            },
            error: function(e) {

            }
        }).done(function() {
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
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
        return strTime;
    }

    // toogle search bar
    $('#navbtn').click(function() {
        $('#input-block').toggle();
    });

    // call function 
    loadPhoto();
    initializeClock();
});
