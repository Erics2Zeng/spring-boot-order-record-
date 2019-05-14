package com.neo.web;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.neo.config.WebConfiguration;
import com.neo.util.Aes;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.neo.entity.UserEntity;
import com.neo.mapper.UserMapper;

import javax.servlet.http.HttpServletRequest;

@Controller
public class UserController {
	@Autowired
	private UserMapper userMapper;


	@RequestMapping("/")
	public String login() {
		return "redirect:/login.html";
	}
	@RequestMapping("/getUsers")
	@ResponseBody
	public List<UserEntity> getUsers() {
		List<UserEntity> users=userMapper.selectAll();
		return users;
	}
	
    @RequestMapping("/getUser")
	@ResponseBody
    public UserEntity getUser(Integer id) {
    	UserEntity user=userMapper.selectByPrimaryKey(id);
        return user;
    }
//    
    @RequestMapping("/login")
	public String login(@RequestParam String names,@RequestParam String password , HttpServletRequest request) {
		Map result = new HashMap();
		result.put("result","faield");
		if (StringUtils.isBlank(names)) return "redirect:/login.html";
		UserEntity user = null;
		try {
			String pass= Aes.aesDecrypt(password,Aes.KEY);
			user = userMapper.selectByUserNameAndPassword(names, pass);
		} catch (Exception e) {
			e.printStackTrace();
			return "redirect:/error.html";
		}
		if (user == null) return "redirect:/login.html";
		request.getSession().setAttribute(WebConfiguration.LOGIN_KEY,user.getId()+"");
		request.getSession().setAttribute(WebConfiguration.LOGIN_USER,user);
		request.getSession().setMaxInactiveInterval(20);
		return "redirect:/orderList.html";

    }
    
}