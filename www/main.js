//-----------
var resultDiv;

document.addEventListener("deviceready", init, false);
function init() {
    document.querySelector("#startScan").addEventListener("touchend", startScan, false);
    resultDiv = document.querySelector("#results");
}

//---------------- Search
$(document).on("pageshow", "#searchhaj", function () {
    listhaj();
});
//---------------- QR Reader
$(document).on("pageshow", "#Qrcard", function () {
    loadop();
});

//---------------- QR all Reader
$(document).on("pageshow", "#allread", function () {
    loadop1();
    $('#lallreader').empty();
    $('#lallreader').listview().listview('refresh');
});

//---------------- QR process
$(document).on("pageshow", "#process", function () {
    loadop2();
    $('#lproreader').empty();
    $('#lproreader').listview().listview('refresh');
});
//==================================
function senduser() {
    try {
        var name = document.getElementById("fname").value;
        var title = document.getElementById("title").value;
        var message = document.getElementById("message").value;
        var email = document.getElementById("email").value;
        var jawal = document.getElementById("jawal").value;
        if (name == "") {
            toast("يجب ادخال الاسم");
            return;
        }
        if (name.length == "") {
            toast(" يجب ادخال الاسم بصورة صحيحة");
            return;
        }
        var exp = /^[ا-يa-zA-Z |]+$/;

        if (!exp.test(name)) {
            toast("يجب ان يكون الاسم من الحروف فقط ");
            return;
        }
        var arr = name.split(" ");
        if (arr.length < 3) {
            toast("ادخل الاسم ثلاثي ");
            return;
        }
        if (jawal == "") {
            toast("ادخل رقم الجوال ");
            return;
        }
        var expname = /^[0-9|]+$/;

        if (!expname.test(jawal)) {
            toast("يجب ان يكون الجوال من ارقام فقط ");
            return;
        }
        if (jawal.length != 10) {
            toast("ادخل رقم الجوال مكون من 10 ارقام");
            return;
        }
        if (jawal.substr(0, 2) != '05') {
            toast("رقم الهاتف يجب يبدا بـ 05 ");
            return;
        }
        if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
            toast("ادخل البريد الالكتروني بصورة سليمة ");
            return;
        }
        if (title == "") {
            toast("ادخل عنوان الرسالة ");
            return;
        }
        if (message == "") {
            toast("ادخل نص الرسالة ");
            return;
        }
       
        $.ajax({
            type: "POST",
            url: "http://www.haj2way.com/code/send.ashx",
            data: { name: name, jawal: jawal, email: email, title: title, message: message },
            success: function (text) {
                try {
                    var obj = JSON.parse(text);
                    toast(obj.message);
                    var op = obj.op;
                    if (op == "1") {
                        document.getElementById("fname").value = "";
                        document.getElementById("title").value = "";
                        document.getElementById("message").value = "";
                        document.getElementById("email").value = "";
                        document.getElementById("jawal").value = "";
                    }


                } catch (ex) { toast(ex); }
            },
            error: function (msg) { toast(msg); }
        });
    }
    catch (e) { toast(e); }


}

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
            url: "http://www.haj2way.com/code/login.ashx",
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
                            localStorage.setItem("job", obj.job);
                            $.mobile.changePage("#uhome", { role: "page" });
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

//-----------------------------
function listhaj() {
    try {
        toast("start");
        $.ajax({
            type: "POST",
            url: "http://www.haj2way.com/code/allhajj.ashx",
            data: {},
            success: function (text) {
                try {
                    //alert(text);
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
            url: "http://www.haj2way.com/code/alllogin.ashx",
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

//----------------------
function LoadRead() {
    try {
        var id = document.getElementById("cmbs").value;
        var job = localStorage.getItem("job");
        var empid = localStorage.getItem("id");
        
        if (id == "0") {
            toast("من فضلك حدد نوع التفويج");
            return;
        }

        $.ajax({
            type: "POST",
            url: "http://www.haj2way.com/code/alllogin.ashx",
            data: { id: id, job: job, empid: empid },
            success: function (text) {
                try {
                    $('#lallreader').empty();
                    if (text != "") {
                        var arr = text.split("//");
                        var x = 0;
                        while (x < arr.length - 1) {
                            var info = arr[x].split(";");
                            $('<li  data-icon="false" style ="text-align:right " >').append('<h3>' + info[3] + '</h3><h4> رقم المجموعة :' + info[6] + '</h4><h4> رقم العقد :' + info[0] + '</h4><h4>' + info[1] + '</h4><h4> ' + info[4] + ' مقعد : ' + info[7] + '</h4><h4>' + info[5] + '</h4>').appendTo('#lallreader');
                            x = x + 1;
                        }
                    }
                    $('#lallreader').listview().listview('refresh');
                } catch (ex) { toast(ex); }
            },
            error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
        });
    }
    catch (e) { toast(e); }

}
//-------------------------

//----------------------
function Loadprocess() {
    try {
        var id = document.getElementById("cmbf").value;
        var job = localStorage.getItem("job");
        var empid = localStorage.getItem("id");

        if (id == "0") {
            toast("من فضلك حدد نوع التفويج");
            return;
        }

        $.ajax({
            type: "POST",
            url: "http://www.haj2way.com/code/processRead.ashx",
            data: { id: id, job: job, empid: empid },
            success: function (text) {
                try {
                    $('#lproreader').empty();
                    if (text != "") {
                        var arr = text.split("//");
                        var x = 0;
                        while (x < arr.length - 1) {
                            var info = arr[x].split(";");
                            $('<li  data-icon="false" style ="text-align:right " >').append('<h3>' + info[3] + '</h3><h4> رقم المجموعة :' + info[6] + '</h4><h4> رقم العقد :' + info[0] + '</h4><h4>' + info[1] + '</h4><h4> ' + info[4] + ' مقعد : ' + info[7] + '</h4><h4>' + info[5] + '</h4>').appendTo('#lproreader');
                            x = x + 1;
                        }
                    }
                    $('#lproreader').listview().listview('refresh');
                } catch (ex) { toast(ex); }
            },
            error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
        });
    }
    catch (e) { toast(e); }

}
//-------------------------
function loadop() {
    try {

        $.ajax({
            type: "POST",
            url: "http://www.haj2way.com/code/taf.ashx",
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
//-------------------------

function loadop1() {
    try {

        $.ajax({
            type: "POST",
            url: "http://www.haj2way.com/code/taf.ashx",
            success: function (text) {
                try {
                    //alert(text);
                    if (text != "") {
                        $('#cmbs').empty();
                        var arr = text.split("//");
                        $('#cmbs').append('<option value="0">من فضلك حدد نوع التفويج</option>');
                        var x = 0;
                        while (x < arr.length - 1) {
                            var info = arr[x].split(";");
                            $('#cmbs').append('<option value="' + info[0] + '">' + info[1] + '</option>');
                            x = x + 1;
                        }
                        $("#cmbs").selectmenu('refresh', true);
                    }
                } catch (ex) { toast(ex); }
            },
            error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
        });
    }
    catch (e) { toast(e); }
}
//-------------------------

function loadop2() {
    try {

        $.ajax({
            type: "POST",
            url: "http://www.haj2way.com/code/taf.ashx",
            success: function (text) {
                try {
                    //alert(text);
                    if (text != "") {
                        $('#cmbf').empty();
                        var arr = text.split("//");
                        $('#cmbf').append('<option value="0">من فضلك حدد نوع التفويج</option>');
                        var x = 0;
                        while (x < arr.length - 1) {
                            var info = arr[x].split(";");
                            $('#cmbf').append('<option value="' + info[0] + '">' + info[1] + '</option>');
                            x = x + 1;
                        }
                        $("#cmbf").selectmenu('refresh', true);
                    }
                } catch (ex) { toast(ex); }
            },
            error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
        });
    }
    catch (e) { toast(e); }
}
//-------------------------
function startScan() {
    var cmb = document.getElementById("cmb").value;

    // toast(id);
    if (cmb == "0") {
        toast("من فضلك حدد نوع التفويج");
        return;
    }
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            var arr = result.text.split("\n");
            var x = 0;
            var data = "";
            while (x < arr.length) {
                data += arr[x] + "</br>";
                x = x + 1;
            }
            var s = data + "<br/>";
            // "Format: " + result.format + "<br/>" +
            // "Cancelled: " + result.cancelled;
            resultDiv.innerHTML = s;
            try {
                var qr = arr[1].split(":");
                var ar = arr[3].split(":");
                savedata(qr[1].trim(), ar[1].trim());
            } catch (hh) {
                var an = confirm("خطا في عملية القراءة \n هل تريد قراءة مرة اخري");
                if (an) { startScan(); }
            }
        },
        function (error) {
            var an1 = confirm("خطا في عملية القراءة \n هل تريد قراءة مرة اخري");
            if (an1) { startScan(); }
        }
        ,
        {
            SCAN_WIDTH: 900,
            SCAN_HEIGHT: 980
        }
    );

}

//------------------------------
function savedata(hno, hname) {
    try {
        var id = localStorage.getItem("id");
        var tid = document.getElementById("cmb").value;
        $.ajax({
            type: "POST",
            url: "http://www.haj2way.com//code/record.ashx",
            data: { hajno: hno, tid: tid, id: id },
            success: function (text) {
                try {
                    var obj = JSON.parse(text);

                    var an2 = confirm(obj.message + " " + hname + " \n هل تريد قراءة كارت جديد");
                    if (an2) { startScan(); }

                } catch (ex) {
                    var an3 = confirm("خطا في عملية التسجيل \n هل تريد قراءة مرة اخري");
                    if (an3) { startScan(); }
                }
            },
            error: function (msg) {
                var an4 = confirm("خطا في عملية التسجيل \n هل تريد قراءة مرة اخري");
                if (an4) { startScan(); }
            }
        });
    }
    catch (e) { toast(e); }
}

//-------------------
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


