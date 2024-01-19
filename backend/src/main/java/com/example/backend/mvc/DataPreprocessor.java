package com.example.backend.mvc;

import java.security.SecureRandom;

import org.json.JSONException;
import org.json.JSONObject;

import com.example.backend.entity.Shot;
import com.example.backend.entity.UserData;

public class DataPreprocessor {
    public static boolean calculateHit(double x, double y, long r) {
        boolean sector2 = x <= 0 && y >= 0 && x >= -r && y <= r;
        boolean sector3 = x <= 0 && y <= 0 && (Math.pow(x, 2) + Math.pow(y, 2)) <= Math.pow(r, 2);
        boolean sector4 = x >= 0 && y <= 0 && y <= (x * 2 - r);
        return sector2 || sector3 || sector4;
    }

    public Shot preprocess(String rawdata) {
        try {
            JSONObject json = new JSONObject(rawdata);
            Double x = Double.parseDouble(json.get("x").toString());
            Double y = Double.parseDouble(json.get("y").toString());
            Long r = Long.parseLong(json.get("r").toString());

            Shot shot = new Shot(x, y, r, "test");
            Validator validator = new Validator();
            if (!validator.validate(shot)) {
                System.out.println("Invalid values");
                return null;
            }
            return shot;
        } catch (NumberFormatException nfe) {
            System.out.println("Invalid data types!");
        } catch (JSONException jse) {
            System.out.println("Invalid number of args");
        }
        return null;
    }

    public UserData checkReg(String rawdata) {
        JSONObject json = new JSONObject(rawdata);
        String username = json.getString("username");
        if (username.trim().length() == 0 || json.getString("password").trim().length() == 0) {
            System.out.println("No username/password provided!");
            return null;
        }
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        String password = (new PasswordEncoder()).encrypt(json.getString("password"), salt.toString());
        return new UserData(username, password, salt.toString());
    }
}
