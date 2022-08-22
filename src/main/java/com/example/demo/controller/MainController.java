package com.example.demo.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping(value="/main")
    public String init(Model model) {

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        String dateTimeFormatted = formatter.format(now);

        model.addAttribute("now", dateTimeFormatted);
        model.addAttribute("name", "철수네");

        return "/main";
    }

    
}
