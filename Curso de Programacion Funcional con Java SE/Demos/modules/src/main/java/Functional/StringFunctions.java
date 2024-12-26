package Functional;

import java.util.function.BiFunction;
import java.util.function.BinaryOperator;
import java.util.function.UnaryOperator;

public class StringFunctions {
    public static void main(String[] args) {
        UnaryOperator<String> quote = text -> "\"" + text + "\"";
        BiFunction <Integer, Integer, Integer> multiplication = (x,y) -> x*y;
        BinaryOperator<Integer> multiplicationSecond = (x, y) -> x*y;


        System.out.println(quote.apply("Hola"));
        System.out.println(multiplication.apply(4,5));
        System.out.println(multiplicationSecond.apply(4,5));
    }
}
