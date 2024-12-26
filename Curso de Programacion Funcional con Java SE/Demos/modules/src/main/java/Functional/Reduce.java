package Functional;

import java.util.stream.Stream;

public class Reduce {
    public static void main(String[] args) {
        Stream<String> aLongStoryStreamAgain = Stream.of("Cuando", "despertó,", "el", "dinosaurio", "todavía", "estaba", "allí.");
        int charCount = aLongStoryStreamAgain.parallel().reduce(0, (count, word) -> {
            System.out.println("Count: "+ count + " , Word: " + word.length());
            return count + word.length();
        }, (x,y)-> {
            System.out.println("X: "+ x + " , Y: " + y);
            return x + y;
        });
        System.out.println(charCount);
    }
}
