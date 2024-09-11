package com.example.backend.mvc;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Shot {
    private double x;
    private double y;
    private long r;
    private boolean isHit;

    public Shot(double x, double y, long r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public void calculate() {
        this.isHit = DataPreprocessor.calculateHit(this.x, this.y, this.r);
    }
}
