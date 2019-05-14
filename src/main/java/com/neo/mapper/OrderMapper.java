package com.neo.mapper;

import com.neo.entity.Order;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface OrderMapper {

    @Select("select a.* ,b.name as customerName from orders a " +
            "left join customer b on a.customerId = b.id " +
            "where a.createTime =#{date} and a.customerId = #{customerId} and userId= #{userId}")
    List<Map> getOrder(@Param("date") String date, @Param("customerId") int customerId,
                       @Param("userId") int userId);

    @Select("select a.* ,b.name as customerName from orders a " +
            "left join customer b on a.customerId = b.id " +
            "where a.userId = #{userId} and a.createTime = (select max(createTime) from orders where userId =#{#userId})")
    List<Map> getLatestOrder(int userId);

    @Insert("insert into orders(customerID,userId,productName,createTime,count,unit,price,totalPrice,isPayed) " +
            "values(#{customerId},#{userId},#{productName},#{createTime},#{count},#{unit},#{price},#{totalPrice},#{isPayed})")
    void save(Order order);

    @Delete("delete from orders where customerId = #{customerId} and createTime = #{cDate} and userId =#{userId}")
    void delete(@Param("customerId") String customerId, @Param("cDate") String cDate,@Param("userId") int userId);

    @Select("<script>" +
            "select b.id as customerId,b.name as customerName , sum(a.TotalPrice) as totalPrices , sum(IF(a.isPayed = 0,a.TotalPrice,0)  ) as unPayed " +
            "from orders a  left join customer b on a.customerId = b.id  " +
            " where a.userId=#{userId} and  " +
            " a.createTime BETWEEN #{startDate} and #{endDate} " +
            "<if test='customerId != null'>" +
            " and b.id= #{customerId}" +
            "</if>" +
            " GROUP BY b.id order by unPayed desc,totalPrices  " +
            "</script>" )
    List<Map> orderStatictis(@Param("startDate") String startDate,@Param("endDate") String endDate,
                             @Param("customerId") String customerID,@Param("userId") int userId);

//    @Select("select b.id as customerId,b.name as customerName , sum(a.TotalPrice) as totalPrices , sum(IF(a.isPayed = 0,a.TotalPrice,0)  ) as unPayed " +
//            "from orders a  left join customer b on a.customerId = b.id  " +
//            " where " +
//            " a.createTime BETWEEN #{startDate} and #{endDate} ")
//    List<Map> orderStatictis(@Param("startDate") String startDate,
//                                       @Param("endDate") String endDate);

    @Select("<script>" +
            "select a.* ,b.name as customerName from orders a " +
            "left join customer b on a.customerId = b.id " +
            "where  a.userId= #{userId} and a.createTime BETWEEN #{startDate} and #{endDate} " +
            "<if test='customerId != null'>" +
            " and a.customerId = #{customerId} " +
            "</if>" +
            "<if test='unPayed != null'>" +
            " and a.isPayed = 0 " +
            "</if>" +
            " order by b.name,a.createTime desc" +
            "</script>"
    )
    List<Map> orderDetail( @Param("startDate") String startDate,
                          @Param("endDate") String endDate,
                          @Param("customerId") String customerId,
                           @Param("unPayed") String unPayed,
                           @Param("userId") int userId);


}
