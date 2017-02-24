var listview;
// var url1 = "http://61.12.97.36:5050";

$(document).ready(function (url1) {

    function serviceCall() {
        var str = "";

        $.ajax({
            type: "GET",
            url: "http://61.12.97.36:5050/finiqweb_webservice/FinIQ_CMS/FinIQ_CMS.asmx/GetUserBooksView_json?UserId=1&Mode=Read",
            //data: "{'data':'This is static data from the JavaScript file'}",
            // contentType: "text/xml; charset=utf-8",
            // contentType: "application/json; charset=utf-8",
            dataType: "text",
            success:
            function (data) {
                getBookDetail(data)
            },
            error: function (e) {
                // console.error(e)
                $("#webservice_data").html("WebSerivce unreachable");
            },
            complete: function() {
            $('#list').listview('refresh');

        }
        });   
    }

    function getBookDetail(data) {
        var bookdetails = data.slice(data.indexOf("[") , data.indexOf("]")+1);
        var xmlDoc = $.parseJSON(bookdetails);
        console.log('xmlDoc', xmlDoc);
        var count = Object.keys(xmlDoc).length;
        populate_navBar(xmlDoc,count);
        populate_cardview_home(xmlDoc,count);
        // $("#webservice_data").append("Pitchbook_Id= "+xmlDoc[0].PitchBook_Id);
        return xmlDoc;
    }
    serviceCall();

    function populate_navBar(xmlDoc,count){
    var parent = document.getElementById('mySidenav');
        
            // $("h4").css("color","green");
        for(i = 0; i < count; i++) { 

            var listitem = document.createElement('li');
            listitem.setAttribute('id',xmlDoc[i].PitchBook_Id);
            var a = document.createElement('a');
            a.setAttribute('href','#');
            a.setAttribute('class','ui-btn');
            a.setAttribute('style','font-size: 13px')
            a.innerHTML = xmlDoc[i].Pitchbook_Name
            // listitem.setAttribute('data-role','list-divider');
            // listitem.innerHTML = xmlDoc[i].Pitchbook_Name;
            listitem.appendChild(a);

            $("#list").append(listitem);
            $('#listitem').trigger("create");  
        }
        // $('#list').listview('refresh');
    }
    function populate_cardview_home(xmlDoc,count){
        // var parent = document.getElementById('cardview_table');
        // console.log('parent table: ',parent);
        // var row = parent.getElementsByTagName('table')[0].childNodes[0];
        // console.log('Row: ',row);
        $('#card_table_home').find('tr').each(function(){
        for(i = 0; i < count; i++) {
            var card_td = document.createElement('td');
            var card_div_home = document.createElement('div');
            card_div_home.setAttribute('id',xmlDoc[i].PitchBook_Id);
            card_div_home.setAttribute('class','btn btn-card');
            var card_title_home = document.createElement('h3');
            card_title_home.setAttribute('class','card-title card-name');
            card_title_home.innerHTML = xmlDoc[i].Pitchbook_Name;

            // var card_img_home = document.createElement('img');
            // card_img_home.setAttribute('id','card_img_home');
            // card_img_home.setAttribute('class','home-img');
            // var bookImg = xmlDoc[i].Book_Icon;
            // console.log('book_Icon',bookImg);
            // getBookImg();
            // card_img_home.setAttribute('src',getBookImg());

            var card_sub_create = document.createElement('h5');
            card_sub_create.setAttribute('class','card-sub');
            card_sub_create.innerHTML = xmlDoc[i].CreatedBy;

            var card_sub_tag = document.createElement('h5');
            card_sub_tag.setAttribute('class','card-sub');
            card_sub_tag.innerHTML = xmlDoc[i].Tag;

            var card_sub_summary = document.createElement('h5');
            card_sub_summary.setAttribute('class','card-sub');
            card_sub_summary.innerHTML = xmlDoc[i].Book_Summary;
       
            $(this).append(card_td);
            card_td.appendChild(card_div_home);
            card_div_home.appendChild(card_title_home);
            // card_div_home.appendChild(card_img_home);
            card_div_home.appendChild(card_sub_create);
            card_div_home.appendChild(card_sub_tag);
            card_div_home.appendChild(card_sub_summary);
        }
    });
    }
});

function getBookImg(){
    $.ajax({
            type: "GET",
            url: 'http://61.12.97.36:5050/FinIQWebApp/FinIQ_Content_Management_System/uploads/BookIcons/book.png',
            //data: "{'data':'This is static data from the JavaScript file'}",
            // contentType: "text/xml; charset=utf-8",
            // contentType: "application/json; charset=utf-8",
            dataType: "image/png",
            success:
            function (data) {
                console.log('data Image', data);
                $("#card_img_home").attr('src',data);
                // return data;
            },
            error: function (e) {
                console.error(e)
                $("#webservice_data").html("WebSerivce unreachable");
            }
        });
//     var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function(){
//     if (this.readyState == 4 && this.status == 200){
//         //this.response is what you're looking for
//         handler(this.response);
//         console.log(this.response, typeof this.response);
//         var img = document.getElementById('card_img_home');
//         var url = window.URL || window.webkitURL;
//         img.src = url.createObjectURL(this.response);
//     }
// }
// xhr.open('GET', 'http://corpgov.net/wp-content/uploads/2013/10/silver-apple-logo-apple-picture.jpg');
// xhr.responseType = 'blob';
// xhr.send();

}

// $('#cardview_book').click(function(e){
// e.preventDefault();
// $ajax({
// type: ""
// });
// });


function storeIntelligrapeLogo(){
  var url = "http://www.intelligrape.com/images/logo.png"; // image url
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
      var imagePath = fs.root.fullPath + "/logo.png"; // full file path
      var fileTransfer = new FileTransfer();
      fileTransfer.download(url, imagePath, function (entry) {
               console.log(entry.fullPath); // entry is fileEntry object
      }, function (error) {
               console.log("Some error");
      });
   })
}

        
function refresh(){
    var list = document.getElementById('mySidenav');
    $(list).listdiv("refresh");
}