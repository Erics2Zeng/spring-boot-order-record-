package com.neo.mapper;

import com.neo.entity.Model;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ModelMapper {

    @Select("select * from model where customerId= #{id}")
    List<Model> getAllModel(int id);

    @Insert("insert into model values(#{customerId},#{name},#{price},#{count},#{unit},#{totalPrice})")
    int save(Model model);

    @Delete("delete from model where customerId=#{customerId}")
    void deleteBycustomerId(int customerId);
}
