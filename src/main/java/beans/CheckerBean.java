package beans;

public class CheckerBean {
    public static boolean checkHit(double x, double y, int r) {
        boolean sector2 = x >= -r && x <= 0
                && y <= r && y >= 0
                && Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2);
        boolean sector3 = x >= -r && x <= 0
                && y >= -r && y <= 0
                && y >= -x - r;
        boolean sector4 = x >= 0 && x <= r
                && y <= 0 && y >= -r;
        return sector2 || sector3 || sector4;
    }
}
