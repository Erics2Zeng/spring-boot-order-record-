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
    // setTable("","",lData);
    var lCustomerName = $("#tb1 tr").eq(0).find("td").eq(0).text();
    $.get("../customer/all",function(data,status){
        data.forEach(function (item) {
            $("#custName").append("<option  value="+item.id+(lCustomerName == item.name ? " selected=true" :  "" )+">"+item.name+"</option>");
        })
    });
    $("tbody tr:odd").css("background-color","#EEEEEE");
    search();
});
//加载人员数据
function search() {
    $("#search").click(function () {
        setTable($("#startTime").val(),$("#endTime").val(),$("#custName").val());
    });
}
function setTable(startDate,endDate,customerId){
    var htmlStr = "";
    $.ajax({
        url:"../order/statistics?startDate="+startDate+"&endDate="+endDate+"&id="+customerId,
        cache:true,
        async:false,
        type: "GET",
        success : function(data){
            if (data.length > 0 ) {
                data.forEach(function (item) {
                    htmlStr=htmlStr + "<tr >" +
                        "<td >"+ item.customerName +"</td>" +
                        "<td>"+(item.totalPrices  == null ? 0 : item.totalPrices)+"</td>" +
                        // "<td>"+(item.unPayed  == null ? 0 : item.unPayed)+"</td>" +
                        "<td ><a href='../detail.html?unPayed=yes&name="+item.customerName+"&customerId="+item.customerId+"&startDate="+startDate+"&endDate="+endDate+"'>"+(item.unPayed  == null ? 0 : item.unPayed)+"</a></td>" +
                        "<td ><a href='../detail.html?name="+item.customerName+"&customerId="+item.customerId+"&startDate="+startDate+"&endDate="+endDate+"'>详情</a></td>" +
                        "</tr>";
                });
            };
        }
    });
    $("#tb1").html(htmlStr);
    $("tbody tr:odd").css("background-color","#EEEEEE");

}

