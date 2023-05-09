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
