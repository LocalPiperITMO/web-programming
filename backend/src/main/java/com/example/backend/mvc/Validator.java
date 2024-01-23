package com.example.backend.mvc;

import java.util.ArrayList;
import java.util.List;

public class Validator {
    private List<Double> xDataArray = new ArrayList<>();
    private List<Long> rDataArray = new ArrayList<>();
    private double yLeft;
    private double yRight;

    public Validator() {
        xDataArray.add(-3.0);
        xDataArray.add(-2.0);
        xDataArray.add(-1.0);
        xDataArray.add(0.0);
        xDataArray.add(1.0);
        xDataArray.add(2.0);
        xDataArray.add(3.0);
        xDataArray.add(4.0);
        xDataArray.add(5.0);
        rDataArray.add(-3l);
        rDataArray.add(-2l);
        rDataArray.add(-1l);
        rDataArray.add(0l);
        rDataArray.add(1l);
        rDataArray.add(2l);
        rDataArray.add(3l);
        rDataArray.add(4l);
        rDataArray.add(5l);
        yLeft = -3;
        yRight = 5;
    }

    public boolean validate(Shot shot) {
        return xDataArray.contains(shot.getX()) &&
                shot.getY() > yLeft && shot.getY() < yRight &&
                rDataArray.contains(shot.getR());
    }

}
