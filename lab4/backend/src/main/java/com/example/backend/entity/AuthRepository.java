package com.example.backend.entity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthRepository extends JpaRepository<Auth, Long> {
    Auth findByName(String name);

    Auth findById(long id);
}
