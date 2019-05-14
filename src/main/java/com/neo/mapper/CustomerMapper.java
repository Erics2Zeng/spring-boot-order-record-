package com.neo.mapper;

import com.neo.entity.Customer;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CustomerMapper {
    @Select("select * from customer")
    List<Customer> getAllCustomer();

    @Insert("insert into customer(name,phone,description) values(#{name},#{phone},#{description})")
    void save(Customer customer);
}
