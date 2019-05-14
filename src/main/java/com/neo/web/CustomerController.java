package com.neo.web;

import com.neo.entity.Customer;
import com.neo.mapper.CustomerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
public class CustomerController {
    @Autowired
    private CustomerMapper customerMapper;

    @RequestMapping("/customer/all")
    public List<Customer> getAllCustomers(){
        return customerMapper.getAllCustomer();
    }

    @RequestMapping("/customer/save")
    @Transactional
    public String save(@RequestBody List<Customer> customers){
        if (customers.size() == 0) return "failed";
        List<Customer> customerList = getAllCustomers();
        Set<String> nameSet =customerList.stream().map(cus -> cus.getName()).collect(Collectors.toSet());
        for (Customer customer : customers){
            if (nameSet.contains(customer.getName())) return "name already exists!";
            customerMapper.save(customer);
            nameSet.add(customer.getName());
        }
        return "success";
    }
}
