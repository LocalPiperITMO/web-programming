package com.example.backend.mvc;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.backend.entity.ResultRepository;

import jakarta.servlet.http.HttpServletResponse;

@Controller
public class HomeController {
    @Autowired
    ResultRepository repository;
    @GetMapping("/process")
    void manual(HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setStatus(200);
        response.getWriter().println(repository.findAll());
    }
}
