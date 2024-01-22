package com.example.backend.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByOwner(Auth owner);

    long deleteByOwner(Auth owner);
}
