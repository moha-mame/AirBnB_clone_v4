$(document).ready(function () {
  const amenityObj = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      amenityObj[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete amenityObj[$(this).attr('data-name')];
    }
    const names = Object.keys(amenityObj);
    $('.amenities h4').text(names.sort().join(', '));
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', (data, textStatus) => {
    if (textStatus === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  const users = {};
  $.getJSON('http://172.23.179.134:5001/api/v1/users', (data) => {
    for (const usr of data) {
      users[usr.id] = `${usr.first_name} ${usr.last_name}`;
    }
  });
   $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(amenityObj),
      success: function (response) {
        $('SECTION.places').empty();
        for (const data of response) {
          $('SECTION.places').append(
            `<article>
             <div class="title_box">
             <h2>${data.name}</h2>
             <div class="price_by_night">$ ${data.price_by_night}</div>
             </div>
             <div class="information">
             <div class="max_guest">${data.max_guest} Guest(s)</div>
             <div class="number_rooms">${data.number_rooms} Bedroom(s)</div>
             <div class="number_bathrooms">${data.number_bathrooms} Bathroom(s)</div>
             </div>
             <div class="user">
               <p><b>Owner: </b>${users[data.user_id]}</p>
             </div>
             <div class="description">${data.description}</div>
             </article>`
          );
        }
      },
      error: function (error) {
        console.log(error);
      }
    });

  $('button').click(function () {
    $('.places > article').remove();
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ amenities: Object.values(amenityObj) }),
      success: function (response) {
        $('SECTION.places').empty();
        for (const data of response) {
          $('SECTION.places').append(
            `<article>
             <div class="title_box">
             <h2>${data.name}</h2>
             <div class="price_by_night">$ ${data.price_by_night}</div>
             </div>
             <div class="information">
             <div class="max_guest">${data.max_guest} Guest(s)</div>
             <div class="number_rooms">${data.number_rooms} Bedroom(s)</div>
             <div class="number_bathrooms">${data.number_bathrooms} Bathroom(s)</div>
             </div>
             <div class="user">
               <p><b>Owner: </b>${users[data.user_id]}</p>
             </div>
             <div class="description">${data.description}</div>
             </article>`
          );
        }
      },
      error: function (error) {
        console.log(error);
      }
    })
  });
})
