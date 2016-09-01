$(function () {
    loaddata();
    $("#MainMenu").enhanceWithin().popup();
   // loadop();
});


var map;
var markers = [];


function loaddata() 
{
    $('#menudata').empty();
    $('<li>').append('<a href="javascript:home()" class="ui-btn ui-btn-icon-right ui-icon-home"  style="text-align:right"> الرئيسية   </a>').appendTo('#menudata');
    $('<li>').append('<a href="javascript:view()"  class="ui-btn ui-btn-icon-right ui-icon-eye"  style="text-align:right">رؤية المخيم</a> ').appendTo('#menudata');
    $('<li>').append('<a href="javascript:location2()"  class="ui-btn ui-btn-icon-right ui-icon-location"  style="text-align:right">موقعنا للحج العام</a> ').appendTo('#menudata');
    $('<li>').append('<a href="javascript:location1()"  class="ui-btn ui-btn-icon-right ui-icon-location"  style="text-align:right">موقعنا للحج المخفض</a> ').appendTo('#menudata');
    $('<li>').append('<a href="javascript:service()"  class="ui-btn ui-btn-icon-right ui-icon-cloud"  style="text-align:right">خدمتنـــا</a> ').appendTo('#menudata');
    $('<li>').append('<a href="javascript:optiondata()"  class="ui-btn ui-btn-icon-right ui-icon-star"  style="text-align:right">مــزايـانـا  </a> ').appendTo('#menudata');
   // $('<li>').append('<a href="javascript:callus()"  class="ui-btn ui-btn-icon-right ui-icon-phone"  style="text-align:right">اتصل بنا  </a> ').appendTo('#menudata');
    $('<li>').append('<a href="javascript:login()"  class="ui-btn ui-btn-icon-right ui-icon-lock"  style="text-align:right">تسجيل دخول  </a> ').appendTo('#menudata');
    $('#menudata').listview().listview('refresh');
}
//=================================
function home() {
    window.location = "index.html";
}

function view() {
    window.location = "view.html";
}
function service() {
    window.location = "service.html";
}

function location1() {
    window.location = "location1.html";
}
function location2() {
    window.location = "location2.html";
}
function optiondata() {
    window.location = "optiondata.html";
}
function callus() {
    window.location = "callus.html";
}
function login() {
    window.location = "login.html";
}
//-----------------------------

//-----------------
function loginuser() {
    try {
        var id = document.getElementById("luserid").value;
        var pass = document.getElementById("lpassword").value;
        if (id == "") {
            toast("ادخل رقم المستخدم");
            return;
        }
        if (pass == "") {
            toast("ادخل كلمة المرور");
            return;
        }
        $.ajax({
            type: "POST",
            url: "http://www.haj2way.com//code/login.ashx",
            data: { id: id, pass: pass },
            success: function (text) {
                try {
                   
                    if (text != "") {
                        var obj = JSON.parse(text);
                        var op = "0";
                        op = obj.op;

                        if (op == "1") {
                            toast("مرحبا بك " + obj.message);
                            localStorage.setItem("id", id);
                            window.location = ("adminhome.html");
                        }
                        else {
                            toast(obj.message);
                        }
                    }

                } catch (ex) { toast(ex); }
            },
            error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
        });
    }
    catch (e) { toast(e); }
}


//----------------------
function drawMap(latlng) {

    var myOptions =
        {
            zoom: 14,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    
    map = new google.maps.Map(document.getElementById("showdata"), myOptions);
    deleteMarkers();
    var op = "0";
    if (op == "0") {
        document.getElementById("mapt").value = "موقعك الحالي";
        addMarker(latlng);
        showMarkers();
    }
    else {
        root(latlng);
    }
}
//------------ root
function root(currentPosition) {
    try {
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsService = new google.maps.DirectionsService();
        directionsDisplay.setMap(map);
        var n = document.getElementById("n").value;
        var e = document.getElementById("e").value;
        var targetDestination = new google.maps.LatLng(n, e);
        var request =
         {
             origin: currentPosition,
             destination: targetDestination,
             travelMode: google.maps.DirectionsTravelMode["DRIVING"]
         };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setPanel(document.getElementById("directions"));
                directionsDisplay.setDirections(response);
            }
        });
    }
    catch (ex) { alert(ex); }
}
// Add a marker to the map and push to the array.
function addMarker(location) {

    var marker = new google.maps.Marker({
        position: location,
        animation: google.maps.Animation.DROP,
        map: map,
        title: document.getElementById("mapt").value
    });
    var infowindow = new google.maps.InfoWindow({
        content: document.getElementById("mapt").value
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
    markers.push(marker);
}

// Sets the map on all markers in the array.
function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}
//----------------
function loadmap() {
    
    var defaultLatLng = new google.maps.LatLng(21.423106, 39.825692);
    
    if (navigator.geolocation) 
    {
        function success(pos) 
        {
            // Location found, show map with these coordinates
           
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        function fail(error) 
        {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, { maximumAge: 300000, enableHighAccuracy: true, timeout: 6000 });
    }
    else 
    {

        drawMap(defaultLatLng);  // No geolocation support, show default map
    }
}
//-------------

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


