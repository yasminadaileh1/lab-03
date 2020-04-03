$(function () {
  var hornsArr = [];
  var kayW = [];

  function Horns(hornItem) {
    this.title = hornItem.title;
    this.image_url = hornItem.image_url;
    this.description = hornItem.description;
    this.keyword = hornItem.keyword;
    this.horns = hornItem.horns;
    hornsArr.push(this);
  }

  Horns.prototype.render = function () {
    let $cloningHornse = $('#container').html();
    var rendered = Mustache.render($cloningHornse, this);
    $('#holder').append(rendered);
  }

  const readJson = (pageNum) => {
    $("#holder").empty();
    $.ajax(`data/page-${pageNum}.json`, { method: "GET", dataType: "JSON" }).then(data => {
      data.forEach(hornItem => {
        let horns = new Horns(hornItem);
        horns.selector();
        horns.render();
      });
    });
  };
  readJson(1);
// we use the concatination in this function to change the number of the page so if we want page number one we will pass it in the parameters when we call the function and it will be like this:
// `data/page-${pageNum}.json` => `data/page-1.json`

  Horns.prototype.selector = function () {
    let $selector = $("#selected")
    if (!(kayW.includes(this.keyword))) {
      kayW.push(this.keyword);
      $selector.append(`<option> ${this.keyword} </option>`);
    }
  }
  // in 38 line we are creating option tags dyinamic if we have 5 option or if we have 50 optin it will be created
  // in this function we stored the keyword in the option without repeated also here, so we can use this to reffered to the data in the select tag any time.
  // console.log(this)
  // this console will show us all the objects not only the keyword I think because we are in a prototype function and this will be reffered to the constructor
  // okay :) !

  function Sorting(array, property) {
    array.sort((a, b) => {
      let first = a[property];
      let second = b[property];
      if (first > second) {
        return 1
      } else if (first < second) {
        return -1
      } else {
        return 0
      }
    })
  }
  // this sorting function to sort the big array by property because the array we want to sort is array of objects and we want to sort it by the title(alphabet) or (numarical) and if want to sort it in other way we need just to pass the name of the key we want to sort it when we use the function.

  $('#selected').on('change', function () {
    let $selectedItem = $(this).val()
    $("div").hide();
    $(`.${$selectedItem}`).fadeIn(1500);
  })
  $('#page1').on('click', function () {
    readJson(1);
  });
  $('#page2').on('click', function () {
    readJson(2)
  });
  $('#alphapet').on('click', function () {
    Sorting(hornsArr, "title")
    $("#holder").empty();
    hornsArr.forEach(horns => horns.render())
  });
  $('#sortNum').on('click', function () {
    console.log(hornsArr)
    Sorting(hornsArr, "horns")
    $("#holder").empty();
    hornsArr.forEach(horns => horns.render())
  });
  // we have 4 event function the first two funtion is to render the pages and the last two to sort the objects reffered to the property we want to sort it and we use the forEach method to go through each object in the constructor and render it.
});