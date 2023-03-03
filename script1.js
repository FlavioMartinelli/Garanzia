$('#form1').on('submit', function (e) {
    e.preventDefault();
    //GETINFO
    $.ajax({
        type: "POST",
        cache: false,
        url: 'test.php',
        data: $(this).serialize(),
        dataType: "html",
        success: function (data) {
            console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
});