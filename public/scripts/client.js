console.log('js');

$(document).ready(function () {
  console.log('JQ');
  $.ajax({
    method: 'GET',
    url: '/jokes',
    success: function (response) {
      console.log(response);
      $('#outputDiv').empty();
      for (var i = 0; i < response.length; i++) {
        var joke = response[i];
        $('#outputDiv').append('<div>' + joke.whoseJoke + ' : ' + joke.jokeQuestion + ' | ' + joke.punchLine + '</div>');
      }
    }
  });
  $('#addJokeButton').on('click', function () {
    console.log('addJokeButton on click');
    $.ajax({
      method: 'POST',
      url: '/jokes',
      data: {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
        punchLine: $('#punchlineIn').val()
      },
      success: function (response) {
        console.log(response);
        $.ajax({
          method: 'GET',
          url: '/jokes',
          success: function (response) {
            console.log(response);
            $('#outputDiv').empty();
            for (var i = 0; i < response.length; i++) {
              var joke = response[i];
              $('#outputDiv').append('<div>' + joke.whoseJoke + ' : ' + joke.jokeQuestion + ' | ' + joke.punchLine + '</div>');
            }
          }
        });
      }
    });
  }); // end addJokeButton on click
}); // end doc ready