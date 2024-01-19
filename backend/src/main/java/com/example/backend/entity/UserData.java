package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class UserData {
    private String username;
    private String encodedPassword;
    private String salt;
}
