/*global $ _*/

module.exports = function(element, value) {
  const opts = Array.isArray(value) ? value : [value];

  let selectedIndex = 0;

  $(element).empty();

  opts.forEach(function(opt, index) {
    let label;
    let val;

    if (typeof opt === 'string') {
      label = opt;
      val = opt;
    } else {
      label = opt.label;
      val = opt.value;

      if (!!opt.selected) {
        selectedIndex = index;
      }
    }

    $(element).append(`<option value="${val}">${label}</option>`);
  });

  $(element).children('option').eq(selectedIndex).attr('selected', 'selected');
  $(element).trigger('change');
};