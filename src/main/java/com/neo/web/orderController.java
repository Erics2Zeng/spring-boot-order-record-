package com.neo.web;

import com.neo.config.WebConfiguration;
import com.neo.entity.Order;
import com.neo.mapper.OrderMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class orderController {

    @Autowired
    private OrderMapper orderMapper;


    @RequestMapping("/getOrder")
    public List<Map> getOrder(@RequestParam String dates, @RequestParam String id, HttpServletRequest request){
        Integer userId = Integer.parseInt((String)request.getSession().getAttribute(WebConfiguration.LOGIN_KEY));
        if (StringUtils.isBlank(dates) || StringUtils.isBlank(id)){
            return orderMapper.getLatestOrder(userId);
        }
        List<Map>  result = orderMapper.getOrder(dates,Integer.parseInt(id),userId);
        return result;
    };

    @RequestMapping("/order/statistics")
    public List<Map> orderStatistics(@RequestParam String startDate,@RequestParam String endDate
            ,@RequestParam String id, HttpServletRequest request){
        if(StringUtils.isBlank(startDate)) return new ArrayList();
        endDate = StringUtils.isBlank(endDate) ? new SimpleDateFormat("yyyy-MM-dd").format(new Date()) : endDate;
        if (StringUtils.isBlank(id)) id = null;
        Integer userId = Integer.parseInt((String)request.getSession().getAttribute(WebConfiguration.LOGIN_KEY));
        return  orderMapper.orderStatictis(startDate,endDate,id,userId);
    };

    @RequestMapping("/order/detail")
    public List<Map> orderDetail(@RequestParam String startDate,@RequestParam String endDate
            ,@RequestParam String customerId,@RequestParam(required = false) String unPayed,HttpServletRequest request){
        if(StringUtils.isBlank(startDate)) return new ArrayList();
        endDate = StringUtils.isBlank(endDate) ? new SimpleDateFormat("yyyy-MM-dd").format(new Date()) : endDate;
        if (StringUtils.isBlank(customerId)) customerId = null;
        if (StringUtils.isBlank(unPayed)) unPayed = null;
        Integer userId = Integer.parseInt((String)request.getSession().getAttribute(WebConfiguration.LOGIN_KEY));
        return  orderMapper.orderDetail(startDate,endDate,customerId,unPayed,userId);
    };

    // only latest 7 days data can modiify
    @RequestMapping("/orders/save/{customerId}/{cDate}")
    @Transactional
    public String saveOrders(@PathVariable String cDate, @PathVariable String customerId,
                             @RequestBody List<Order> orders,HttpServletRequest request){
        if (StringUtils.isBlank(cDate) || StringUtils.isBlank(customerId)){
            return "failed";
        }
        try {
            Date sdate = new SimpleDateFormat("yyyy-MM-dd").parse(cDate);
            long diff = System.currentTimeMillis() - sdate.getTime();
            long dayDiff = diff / (1000*60*60*24);
            if ( dayDiff >= 7 ) return "不能修改一个星期以前的数据！";
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Integer userId = Integer.parseInt((String)request.getSession().getAttribute(WebConfiguration.LOGIN_KEY));
        if(orders.size() > 0){
            orderMapper.delete(customerId,cDate,userId);
        }
        for (Order order: orders) {
            order.setUserId(userId);
            orderMapper.save(order);
        }
        return "success";
    };

}
