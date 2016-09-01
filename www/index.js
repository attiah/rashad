var resultDiv;

document.addEventListener("deviceready", init, false);
function init() {
    document.querySelector("#startScan").addEventListener("touchend", startScan, false);
    resultDiv = document.querySelector("#results");
}

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
            SCAN_WIDTH: 1920,
            SCAN_HEIGHT: 1080 
        }
    );

    }


    //-----------------------------
    
//------------------------------
function savedata(hno,hname) {
try
 {
     var id = localStorage.getItem("id");
     var tid = document.getElementById("cmb").value;
    $.ajax({
        type: "POST",
        url: "http://www.haj2way.com//code/record.ashx",
        data: { hajno: hno, tid: tid,id:id },
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
    catch(e){toast(e);}
}