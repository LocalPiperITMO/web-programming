package com.example.backend.mvc;

import com.example.backend.entity.Shot;

public class DataPreprocessor {
    public static boolean calculateHit(double x, double y, long r) {
        boolean sector2 = x <= 0 && y >= 0 && x >= -r && y <= r;
        boolean sector3 = x <= 0 && y <= 0 && (Math.pow(x, 2) + Math.pow(y, 2)) <= Math.pow(r, 2);
        boolean sector4 = x >= 0 && y <= 0 && y <= (x * 2 - r);
        return sector2 || sector3 || sector4;
    }

    public Shot preprocess(String rawdata) {
        String filtered = rawdata.replaceAll("[^0-9,-]", "");
        String[] numbers = filtered.split(",");

        try {
            double x = Double.parseDouble(numbers[0]);
            double y = Double.parseDouble(numbers[1]);
            long r = Long.parseLong(numbers[2]);

            return new Shot(x, y, r, "test");
        } catch (NumberFormatException nfe) {
            System.out.println("Invalid arguments!");
        } catch (IndexOutOfBoundsException ioobe) {
            System.out.println("Invalid number of arguments!");
        }
        return null;
    }
}
