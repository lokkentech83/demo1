package com.example.demo.pg001.contoller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class PG001Controller {

    @GetMapping(value="/pg001")
    public String getMethodName(Model model) {
        return "/pg001/pg001";
    }
    
}
