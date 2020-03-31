$(function(){
    var hornsArr = [];
    var kayW = [];
  function Horns (hornItem){

        this.title = hornItem.title;
        this.image_url = hornItem.image_url ;
        this.description = hornItem.description;
        this.keyword = hornItem.keyword;
        hornsArr.push(this);

  }

  Horns.prototype.render = function() {
    let $cloningHornse = $('#container').html();
    var rendered = Mustache.render($cloningHornse , this);
     $('main').append(rendered);
    }


    Horns.prototype.selector = function(){
   let $selector = $("select")
   if(!(kayW.includes(this.keyword))){
        kayW.push(this.keyword);
        $selector.append(`<option> ${this.keyword} </option>`);
   }
  }


    const readJson = () => {
        $.ajax("data/page-1.json", { method: "GET", dataType: "JSON" }).then(data => {
          data.forEach(hornItem => {
            let horns = new Horns(hornItem);
            horns.selector();
            horns.render();
      
          });
        });
      };
      readJson();

      const readJson2 = () => {
        $.ajax("data/page-2.json", { method: "GET", dataType: "JSON" }).then(data => {
          data.forEach(hornItem => {
            let horns = new Horns(hornItem);
            horns.selector();
            horns.render();
            // console.log(data)
      
          });
        });
      };
      readJson2();

      $('#selected').on('change' , function(){
        let $selectedItem = $(this).val()
            $("div").hide();
            $(`.${$selectedItem}`).fadeIn(1000);
            console.log($selectedItem);
   
      })

      let page1 = () => {
        $('div').remove();
        kayW.splice(0, kayW.length);
        $('#selected').empty('');
        readJson();

    };
    let page2 = () => {   
        $('div').remove();
        kayW.splice(0, kayW.length);
        $('#selected').empty('');
        readJson2();
    };
    $('#page1').on('click', page1);
    $('#page2').on('click', page2);

    const sortByAlphapet = () => {
      hornsArr.sort((a, b) => {
          if (a.title.toUpperCase() < b.title.toUpperCase()) {
              return -1;
          }
      });
      $('div').empty('');
      hornsArr.forEach(val =>{
          val.render();
      })
  };
  // const sortByNum = () => {
  //     hornsArr.sort((a, b) => {
  //         return a.hornsArr - b.hornsArr;
  //     });
  //     $('div').empty();
  //     hornsArr.forEach(val =>{
  //         val.render();
  //     })
  // }
  $('#alphapet').on('click', sortByAlphapet);
  // $('#sortNum').on('click', sortByNum);


     

});



