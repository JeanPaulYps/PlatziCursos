import java.util.Arrays;

public class ArraysExample {
    public static void main(String[] args) {
        String [] androidVersions = new String[17];
        for (int i = 1; i <= 17; i++) {
            androidVersions[i -1] = String.valueOf(i);
        }
        System.out.println(Arrays.toString(androidVersions));

        String [][] cities = new String[4][2];

    }
}
