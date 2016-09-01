$(function () {
    loaddata();
    $("#MainMenu").enhanceWithin().popup();
    
});

var map;
var markers = [];


function loaddata() 
{
    $('#menudata').empty();
    $('<li>').append('<a href="javascript:home()" class="ui-btn ui-btn-icon-right ui-icon-home"  style="text-align:right"> الرئيسية   </a>').appendTo('#menudata');
    $('<li>').append('<a href="javascript:search()"  class="ui-btn ui-btn-icon-right ui-icon-search"  style="text-align:right">بحث عن حاج </a> ').appendTo('#menudata');
    $('<li>').append('<a href="javascript:qread()"  class="ui-btn ui-btn-icon-right ui-icon-user"  style="text-align:right">  قراءة الكرت</a> ').appendTo('#menudata');
    $('<li>').append('<a href="javascript:listop()"  class="ui-btn ui-btn-icon-right ui-icon-eye"  style="text-align:right">متابعة القراءات</a> ').appendTo('#menudata');
    $('<li>').append('<a href="javascript:logout()"  class="ui-btn ui-btn-icon-right ui-icon-back"  style="text-align:right">تسجيل خروج  </a> ').appendTo('#menudata');
    $('#menudata').listview().listview('refresh');
}

function home() {
    window.location = "adminhome.html";
}

function search() {
    window.location = "listhajj.html";
}
function qread() {
    window.location = "qread.html";
}
function listop() {
    window.location = "logindata.html";
}
function logout() {
    window.location = "index.html";
}
//-----------------------------
function listhaj() {
    try {

        $.ajax({
            type: "POST",
            url: "http://www.haj2way.com//code/allhajj.ashx",
            data: { id: '' },
            success: function (text) {
                try {

                    if (text != "") {
                        $('#loc').empty();
                        var arr = text.split("//");
                       
                        var x = 0;
                        while (x < arr.length - 1) {
                            var info = arr[x].split(";");
                            $('<li  data-icon="false" style ="text-align:right " >').append('<h3>' + info[0] + '</h3><h4> ' + info[1] + '</h4><h4> مقعد : ' + info[10] + '</h4><h4><a href="tel:' + info[7] + '"> جوال :' + info[7] + '</a></h4> <h4> ' + info[8] + '</h4><h4> رقم الحجز :' + info[5] + '</h4><h4> رقم العقد ' + info[4] + '</h4><h4> المرشد :' + info[2] + '</h4><h4><a href="tel:' + info[3] + '"> جواله :' + info[3] + '</a></h4><h4> ' + info[9] + '</h4>').appendTo('#loc');
                            x = x + 1;
                        }


                        $('#loc').listview().listview('refresh');
                    }

                } catch (ex) { toast(ex); }
            },
            error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
        });
    }
    catch (e) { toast(e); }


}
//-----------------------------
function listlogin() {
    try {

        $.ajax({
            type: "POST",
            url: "http://www.haj2way.com//code/alllogin.ashx",
            data: { id: '' },
            success: function (text) {
                try {

                    if (text != "") {
                        $('#loc').empty();
                        var arr = text.split("//");

                        var x = 0;
                        while (x < arr.length - 1) {
                            var info = arr[x].split(";");
                            $('<li  data-icon="false" style ="text-align:right " >').append('<h3>' + info[3] + '</h3><h4> رقم العقد :' + info[0] + '</h4><h4>' + info[1] + '</h4><h4>' + info[2] + '</h4> <h4> ' + info[4] + '</h4><h4>' + info[5] + '</h4>').appendTo('#loc');
                            x = x + 1;
                        }


                        $('#loc').listview().listview('refresh');
                    }

                } catch (ex) { toast(ex); }
            },
            error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
        });
    }
    catch (e) { toast(e); }


}

//----------------------------------
var toast = function (msg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'  data-theme='a'><h3>" + msg + "</h3></div>")
.css({ display: "block",
    opacity: 0.90,
    position: "fixed",
    padding: "7px",
    color: "#FFF",
    "background-color": "Darkblue",
    "text-align": "center",
    width: "270px",
    left: ($(window).width() - 284) / 2,
    top: $(window).height() / 2
})
.appendTo($.mobile.pageContainer).delay(1500)
.fadeOut(400, function () {
    $(this).remove();
});
}





function loadop() {
    try {
        
        $.ajax({
            type: "POST",
            url: "http://www.haj2way.com//code/taf.ashx",
            success: function (text) {
                   try {
                                    //alert(text);
                                    if (text != "") {
                                        $('#cmb').empty();
                                        var arr = text.split("//");
                                        $('#cmb').append('<option value="0">من فضلك حدد نوع التفويج</option>');
                                        var x = 0;
                                        while (x < arr.length - 1) {
                                            var info = arr[x].split(";");
                                            $('#cmb').append('<option value="' + info[0] + '">' + info[1] + '</option>');
                                            x = x + 1;
                                        }
                                        $("#cmb").selectmenu('refresh', true);
                                    }
                                } catch (ex) { toast(ex); }
            },
            error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
        });
    }
    catch (e) { toast(e); }
}