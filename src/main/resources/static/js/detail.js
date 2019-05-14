//需要首先通过Jq来解决内容部分奇偶行的背景色不同
// $(document).ready(function(){
//     //找到表格的内容区域中所有的奇数行
//     //使用even是为了把通过tbody tr返回的所有tr元素中，
//     //在数组里面下标是偶数的元素返回，因为这些元素，
//     //实际上才是我们期望的tbody里面的奇数行
//
//
// });

/*下面兩段开始添加删除行**/
$(document).ready(function() {
    // var lCustomerName = $("#tb1 tr").eq(0).find("td").eq(0).text();
    $("tbody tr:odd").css("background-color","#EEEEEE");
    var parametersMap = fetchRequestParmValue(window.location.search);
    $("#startTime").text(getParamtes(parametersMap,"startdate"));
    var endDate = getParamtes(parametersMap,"enddate");
    if (!endDate) {
        var myDate = new Date();
        endDate =  myDate.getFullYear() + "-" +(myDate.getMonth()+1)+"-"+myDate.getDate();
    }
    $("#endTime").text(endDate);
    var customers = decodeURI(getParamtes(parametersMap,"name"));
    $("#custName").text( customers == "" ? "所有人" : customers );
    setTable(window.location.search);
});

function fetchRequestParmValue(url,paras) {
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    return paraObj;
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

function getParamtes(keyMap ,key){
    var returnValue = keyMap[key.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

function setTable(searchStr){
    var htmlStr = "";
    $.ajax({
        url:"../order/detail"+searchStr,
        cache:true,
        async:false,
        type: "GET",
        success : function(data){
            if (data.length > 0 ) {
                data.forEach(function (item) {
                    htmlStr=htmlStr + "<tr >" +
                        "<td >"+ item.customerName +"</td>" +
                        "<td>"+ item.productName+ "</td>" +
                        "<td>"+ (item.price == null ? '' : item.price)+"</td>" +
                        "<td>"+(item.count  == null ? '' : item.count) +"</td>" +
                        "<td>"+(item.unit  == null ? '' : item.unit)+"</td>" +
                        "<td>"+(item.totalPrice  == null ? 0 : item.totalPrice)+"</td>" +
                        "<td  class='check-B'><input type='checkbox' disabled "+ (item.isPayed == 0 ? "" : " checked=true" )+"></td>" +
                        "<td>"+ item.createTime+ "</td>" +
                        "</tr>";
                });
            };
        }
    });
    $("#tb1").html(htmlStr);
    $("tbody tr:odd").css("background-color","#EEEEEE");

}

