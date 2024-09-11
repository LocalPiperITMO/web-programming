package com.example.backend.mvc;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserData {
    private String username;
    private String encodedPassword;
    private byte[] salt;
}
