public class Ejercicio1 {
    public static void main(String[] args) {
        String madre = "Ana";
        String padre = "Camilo";
        String hermano = "Xavi";

        System.out.println(madre + " " +  padre + " " + hermano);

        char c = 'z';
        int castC = (int) c;

        System.out.println(castC);

        int i = 250;
        long castILong = i;
        short castIShort = (short) castILong;

        System.out.println(castIShort);

        double d = 301.067;
        long castD = (long) d;

        System.out.println(castD);

        int i2 =  100;
        float i2Cast = (float) 100 + 5000.66f;
        System.out.println(i2Cast);

        int i3 = 737;
        byte i3Cast = (byte) (737 * 100);
        System.out.println(i3Cast);

        double d2 = 298.638/25;
        long d2Cast = (long) d;
        System.out.println(d2Cast);
    }
}
