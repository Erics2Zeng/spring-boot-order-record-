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
    $.ajax({
        url:"../customer/all",
        cache:true,
        async:false,
        type: "GET",
        success : function(data){
            data.forEach(function (item) {
                $("#custName").append("<option  value="+item.id+">"+item.name+"</option>");
            })
        }
    });
    loadData();
    $("#custName").change(function (){
        loadData();
    })
    trEdit();
    $("tbody tr:odd").css("background-color","#EEEEEE");
    // trEdit();//td的点击事件封装成一个函数
    $("#addBtn").bind("click", function(){
        $("#tb1").append("<tr><td>"+ $("#custName :selected").text()+"</td><td></td><td></td><td></td><td></td><td></td><td  class='check-B' ><input type='checkbox' disabled ></td><td class='del-col'><a href='javascript:void(0);' class='delBtn'>删除</a></td></tr>");
        trEdit();


        delTr();
        $("tbody tr:odd").css("background-color","#EEEEEE");
    });
    delTr();
});
//加载人员数据
function loadData() {
        $("#tb1").html("");
           var customerId= $("#custName :selected").attr("value");
        var customerName= $("#custName :selected").text();
                    var htmlStr = "";
            $.ajax({
                url:"../model/"+customerId,
                cache:true,
                async:false,
                type: "GET",
                success : function(data){
                    if (data.length > 0 ) {
                        data.forEach(function (item) {
                                htmlStr=htmlStr + "<tr >" +
                                "<td>"+customerName+"</td>" +
                                "<td>"+ item.name  +"</td>" +
                                "<td>"+ (item.price == null ? "" : item.price)+"</td>" +
                                "<td>"+(item.count  == null ? "" : item.count) +"</td>" +
                                "<td>"+(item.unit  == null ? "" : item.unit)+"</td>" +
                                "<td>"+(item.totalPrice  == null ? "" : item.totalPrice)+"</td>" +
                                "<td  class='check-B' ><input type='checkbox' disabled></td>" +
                                "<td class='del-col'><a href='javascript:void(0);' class='delBtn'>删除</a></td>" +
                                "</tr>";
                        });
                    };
                }
            });
        $("#tb1").html(htmlStr);
        $("tbody tr:odd").css("background-color","#EEEEEE");
        trEdit();
        delTr();
}
//保存模板
function saveMode(){
    var dataArray = [];
    $("#tb1 tr").each(function(index,$this){
        dataArray[index]= {"name": $(this).children('td').eq(1).text(),"price":$(this).children('td').eq(2).text(),
            "count":$(this).children('td').eq(3).text(),"unit": $(this).children('td').eq(4).text(),
            "totalPrice":$(this).children('td').eq(5).text() ,
            "isPayed": ($(this).find('input').is(":checked")== true) ? 1 : 0};
    });
    console.log(JSON.stringify(dataArray));
    $.ajax({
        type: "POST",
        url: "/model/save/"+ $("#custName :selected").attr("value"),
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

