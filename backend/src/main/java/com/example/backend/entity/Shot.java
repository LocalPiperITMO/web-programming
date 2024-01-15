package com.example.backend.entity;

import com.example.backend.mvc.DataPreprocessor;

import lombok.Getter;

@Getter
public class Shot {
    private double x;
    private double y;
    private long r;
    private boolean isHit;
    private String owner;
    
    public Shot(double x, double y, long r, String owner) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.owner = owner;
        this.isHit = DataPreprocessor.calculateHit(x, y, r);
    }
}
