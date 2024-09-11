package com.example.backend.mvc;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

import com.example.backend.entity.Result;

public class DataPreprocessor {

    public List<Shot> safeTransform(List<Result> results) {
        List<Shot> shots = new ArrayList<>();
        for (Result result : results) {
            shots.add(new Shot(result.getX(), result.getY(), result.getR(), result.isHit()));
        }
        return shots;
    }

    public static boolean calculateHit(double x, double y, long r) {
        if (r >= 0) {
            boolean sector2 = x <= 0 && y >= 0 && x >= -r && y <= r;
            boolean sector3 = x <= 0 && y <= 0 && (Math.pow(x, 2) + Math.pow(y, 2)) <= Math.pow(r, 2);
            boolean sector4 = x >= 0 && y <= 0 && y >= (x * 2 - r);
            return sector2 || sector3 || sector4;
        }
        boolean sector1 = x >= 0 && y >= 0 && (Math.pow(x, 2) + Math.pow(y, 2)) <= Math.pow(r, 2);
        boolean sector2 = x <= 0 && y >= 0 && y <= (x * 2 - r);
        boolean sector4 = x >= 0 && y <= 0 && x <= Math.abs(r) && y >= r;
        return sector1 || sector2 || sector4;
    }

    public Shot preprocess(String rawdata) {
        try {
            JSONObject json = new JSONObject(rawdata);
            Double x = Double.parseDouble(json.get("x").toString());
            Double y = Double.parseDouble(json.get("y").toString());
            Long r = Long.parseLong(json.get("r").toString());
            System.out.println(x);
            System.out.println(y);
            System.out.println(r);
            Shot shot = new Shot(x, y, r);
            shot.calculate();
            /*
             * if (!validator.validate(shot)) {
             * System.out.println("Invalid values");
             * return null;
             * }
             */
            return shot;
        } catch (NumberFormatException nfe) {
            System.out.println("Invalid data types!");
        } catch (JSONException jse) {
            System.out.println("Invalid number of args");
        }
        return null;
    }

    public UserData checkReg(String rawdata) {
        try {
            JSONObject json = new JSONObject(rawdata);
            String username = json.getString("username");
            if (username.trim().length() == 0 || json.getString("password").trim().length() == 0) {
                System.out.println("No username/password provided!");
                return null;
            }
            byte[] salt = SecureUtils.getSalt();
            String password = SecureUtils.getSecurePassword(json.getString("password"), salt);
            return new UserData(username, password, salt);
        } catch (NoSuchAlgorithmException nsae) {
            System.err.println("UNKNOWN ERROR");
            return null;
        }
    }
}
