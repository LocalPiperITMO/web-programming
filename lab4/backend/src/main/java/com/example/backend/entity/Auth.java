package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users", schema = "public")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Auth {
    private @Id @GeneratedValue Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private byte[] salt;

    public Auth(String name, String password, byte[] salt) {
        this.name = name;
        this.password = password;
        this.salt = salt;
    }
}
