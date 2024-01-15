package com.example.backend.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.backend.entity.ResultRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {
    private final ResultRepository repository;

    @Autowired
    public DatabaseLoader(ResultRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
    }
}
