package com.example.backend.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.backend.entity.AuthRepository;
import com.example.backend.entity.ResultRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {
    private final ResultRepository repository;
    private final AuthRepository authRepository;

    @Autowired
    public DatabaseLoader(ResultRepository repository, AuthRepository authRepository) {
        this.repository = repository;
        this.authRepository = authRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
    }
}
