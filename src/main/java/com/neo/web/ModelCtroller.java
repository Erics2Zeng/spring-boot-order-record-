package com.neo.web;

import com.neo.entity.Model;
import com.neo.mapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ModelCtroller {

    @Autowired
    private ModelMapper modelMapper;

    @RequestMapping("/model/{customerId}")
    public List<Model> getAllModel(@PathVariable  int customerId){
      return   modelMapper.getAllModel(customerId);
    }

    @RequestMapping("/model/save/{customerId}")
    @Transactional
    public String saveModelLisst(@RequestBody List<Model> models,@PathVariable int customerId){
        if (models.size() == 0 ) {
            return "failed";
        }
        modelMapper.deleteBycustomerId(customerId);
        for (Model model: models) {
            model.setCustomerId(customerId);
            modelMapper.save(model);
        }
        return "success";
    }
}
