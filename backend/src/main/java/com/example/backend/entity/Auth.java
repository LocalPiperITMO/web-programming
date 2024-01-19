package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Auth {
    private @Id @GeneratedValue Long id;
    private String name;
    private String password;
    private String salt;

    public Auth(String name, String password, String salt) {
        this.name = name;
        this.password = password;
        this.salt = salt;
    }
}
