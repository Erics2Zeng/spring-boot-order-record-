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
    var lData ={"ldate":""};
    setTable("","",lData);
    $("#todayTime").val(lData.ldate);
    var lCustomerName = $("#tb1 tr").eq(0).find("td").eq(0).text();
    $.get("../customer/all",function(data,status) {
        data.forEach(function (item) {
            $("#custName").append("<option  value=" + item.id + (lCustomerName == item.name ? " selected=true" : "") + ">" + item.name + "</option>");
        })
    });
    trEdit();
    $("tbody tr:odd").css("background-color","#EEEEEE");
    // trEdit();//td的点击事件封装成一个函数
    $("#addBtn").bind("click", function(){
        $("#tb1").append("<tr><td>"+ $("#custName :selected").text()+"</td><td></td><td></td><td></td><td></td><td></td><td  class='check-B'><input type='checkbox' ></td><td class='del-col'><a href='javascript:void(0);' class='delBtn'>删除</a></td></tr>");
        trEdit();
        delTr();
        $("tbody tr:odd").css("background-color","#EEEEEE");
    });
    delTr();
    search();
});
//加载人员数据
function search() {
    $("#custName").change(function () {
        setTable($("#todayTime").val(),$("#custName").val(),{});
    });
    $("#todayTime").change(function () {
        setTable($("#todayTime").val(),$("#custName").val(),{});
    });
}
function setTable(dates,customerId,lData){
    var htmlStr = "";
    var tPrice = 0;
    $.ajax({
        url:"../getOrder?dates="+dates+"&id="+customerId,
        cache:true,
        async:false,
        type: "GET",
        success : function(data){
            if (data.length > 0 ) {
                data.forEach(function (item) {
                    lData.ldate = item.createTime;
                    htmlStr=htmlStr + "<tr >" +
                        "<td >"+ item.customerName +"</td>" +
                        "<td>"+ item.productName+ "</td>" +
                        "<td>"+ (item.price == null ? '' : item.price)+"</td>" +
                        "<td>"+(item.count  == null ? '' : item.count) +"</td>" +
                        "<td>"+(item.unit  == null ? '' : item.unit)+"</td>" +
                        "<td>"+(item.totalPrice  == null ? 0 : item.totalPrice)+"</td>" +
                        "<td  class='check-B'><input type='checkbox' "+ (item.isPayed == 0 ? "" : " checked=true" )+"></td>" +
                        "<td class='del-col'><a href='javascript:void(0);' class='delBtn'>删除</a></td>" +
                        "</tr>";
                    tPrice += (item.totalPrice  == null ? 0 : item.totalPrice);
                });
            };
        }
    });
    $("#tb1").html(htmlStr);
    $("tbody tr:odd").css("background-color","#EEEEEE");
    $("#tPrice").text(tPrice+ "元");
    trEdit();
    delTr();
}

//保存模板
function saveOders(){
    var dataArray = [];
    var cNameId = $("#custName option:selected").attr("value");
    var cDate =  $("#todayTime").val();
    $("#tb1 tr").each(function(index,$this){
        dataArray[index]= {"customerId": cNameId,"productName":$(this).children('td').eq(1).text(),
            "createTime":cDate,"price":$(this).children('td').eq(2).text(),
            "count":$(this).children('td').eq(3).text(),"unit": $(this).children('td').eq(4).text(),
            "totalPrice":$(this).children('td').eq(5).text() ,
            "isPayed": ($(this).find('input').is(":checked")== true) ? 1 : 0};
    });
    console.log(JSON.stringify(dataArray));
    $.ajax({
        type: "POST",
        url: "/orders/save/"+ $("#custName :selected").attr("value")+"/"+$("#todayTime").val(),
        data: JSON.stringify(dataArray),
        contentType:"application/json;charset=UTF-8",
        success: function(msg){
            alert( "Data Saved: " + msg );
        }
    });
}

//删除
function delTr(){
    $(".delBtn").click(function(){
        $(this).parent().parent().remove();
    });
}
/*
function even(){
    $("tbody tr:even").css("background-color","#ECE9D8");
}*/


//我们需要找到所有的单元格
function trEdit(){
    var numTd = $("#tb1 td").not(".del-col,.check-B");
    //给这些单元格注册鼠标点击的事件
    numTd.click(function() {
        //找到当前鼠标点击的td,this对应的就是响应了click的那个td
        var tdObj = $(this);
        if (tdObj.children("input").length > 0) {
            //当前td中input，不执行click处理
            return false;
        }
        var text = tdObj.html();
        //清空td中的内容
        tdObj.html("");
        //创建一个文本框
        //去掉文本框的边框
        //设置文本框中的文字字体大小是12px
        //使文本框的宽度和td的宽度相同
        //设置文本框的背景色
        //需要将当前td中的内容放到文本框中
        //将文本框插入到td中
        var inputObj = $("<input type='text'>").css({"border":"0","width":"100%","height":"40px","font-size":"12px","text-align":"center"})
            .width(tdObj.width())
            .height(tdObj.height())
            .css("background-color",tdObj.css("background-color"))
            .val(text).appendTo(tdObj);
        //是文本框插入之后就被选中
        inputObj.trigger("focus").trigger("select");
        inputObj.click(function() {
            return false;
        });
        //处理文本框上回车和esc按键的操作
        inputObj.blur(function(event){
            //获取当前按下键盘的键值
            // var keycode = event.which;
            // //处理回车的情况
            // if (keycode == 13) {
            //     //获取当当前文本框中的内容
            var inputtext = $(this).val();
            //将td的内容修改成文本框中的内容
            tdObj.html(inputtext);
            // }
            // //处理esc的情况
            // if (keycode == 27) {
            //     //将td中的内容还原成text
            //     tdObj.html(text);
            // }
        });
    });
}

