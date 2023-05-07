$(document).ready(function () {
  const amenityChecked = {};

  $('input[type=checkbox]').change(function () {
    const amenityId = $(this).data('data-id');
    const amenityName = $(this).data('data-name');

    if (this.checked) {
      amenityChecked[amenityId] = amenityName;
    } else {
      delete amenityChecked[amenityId];
    }

    const amenityNames = Object.values(amenityChecked);

    if (amenityNames.length > 0) {
      $('.amenities h4').text(amenityNames.join(', '));
    } else {
      $('.amenities h4').html('&nbsp;');
    }
  });
});
const url = 'http://0.0.0.0:5001/api/v1/status/';
$.get(url, function (data, textStatus) {
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});
