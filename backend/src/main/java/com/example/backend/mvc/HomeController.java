package com.example.backend.mvc;

import java.io.IOException;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.backend.entity.Auth;
import com.example.backend.entity.AuthRepository;
import com.example.backend.entity.Result;
import com.example.backend.entity.ResultRepository;
import com.example.backend.entity.Shot;
import com.example.backend.entity.UserData;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

@Controller
public class HomeController {
    @Autowired
    ResultRepository repository;
    @Autowired
    AuthRepository authRepository;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:5173");
            }
        };
    }

    @PostMapping("/process")
    void process(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String requestData = request.getReader().lines().collect(Collectors.joining());

        DataPreprocessor preprocessor = new DataPreprocessor();
        Shot shot = preprocessor.preprocess(requestData);
        long userId = new JSONObject(requestData).getLong("id");
        Auth owner = authRepository.findById(userId);
        if (owner == null) {
            response.setStatus(403);
            response.getWriter().println(repository.findByOwner(owner));
            return;
        }

        if (shot != null) {
            repository.save(new Result(shot.getX(), shot.getY(), shot.getR(), shot.isHit(), owner));
        }

        response.setStatus(200);
        response.getWriter().println(repository.findByOwner(owner));
    }

    @PostMapping("/clear")
    @Transactional
    void clear(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String requestData = request.getReader().lines().collect(Collectors.joining());
        long userId = new JSONObject(requestData).getLong("id");
        Auth owner = authRepository.findById(userId);
        if (owner == null) {
            response.setStatus(403);
            response.getWriter().println("ERROR: Not authorized");
            return;
        }
        repository.deleteByOwner(owner);
        response.setStatus(200);
        response.getWriter().println("Cleared data");
    }

    @PostMapping("/signin")
    void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String requestData = request.getReader().lines().collect(Collectors.joining());

        JSONObject loginData = new JSONObject(requestData);

        Auth existCheck = authRepository.findByName(loginData.getString("username"));
        if (existCheck != null) {
            String password = SecureUtils.getSecurePassword(loginData.getString("password"), existCheck.getSalt());
            if (password.equals(existCheck.getPassword())) {
                response.setStatus(200);
                response.getWriter().println(authRepository.findByName(loginData.getString("username")).getId());
            } else {
                response.setStatus(400);
                response.getWriter().println("Access denied. Invalid login/password");
            }
        } else {
            response.setStatus(400);
            response.getWriter().println("Access denied. Invalid login/password");
        }

    }

    @PostMapping("/signup")
    void register(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String requestData = request.getReader().lines().collect(Collectors.joining());

        DataPreprocessor preprocessor = new DataPreprocessor();
        UserData userData = preprocessor.checkReg(requestData);
        if (userData != null) {
            Auth existCheck = authRepository.findByName(userData.getUsername());
            if (existCheck != null) {
                response.setStatus(409);
                response.getWriter().println("Access denied. Username already in use");
            } else {
                authRepository
                        .save(new Auth(userData.getUsername(), userData.getEncodedPassword(), userData.getSalt()));
                response.setStatus(200);
                response.getWriter().println(authRepository.findByName(userData.getUsername()).getId());
            }

        } else {
            response.setStatus(400);
            response.getWriter().println("Access denied. Wrong username/password format");
        }
    }
}
