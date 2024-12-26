package Functional;

import java.time.LocalDate;
import java.util.function.Function;

public class AgeUtils {
    public static void main(String[] args) {
        Function<Integer, String> addZeros = x -> x < 10 ? "0" + x : String.valueOf(x);
        TriFunction <Integer, Integer, Integer, LocalDate> parseDate =
                (day, month, year) -> LocalDate.parse(year + "-" + addZeros.apply(month) + "-" + addZeros.apply(day));

        System.out.println(parseDate.apply(1,3,1998));
    }
    @FunctionalInterface
    interface TriFunction <T,U,V,R> {
        R apply (T t, U u, V v);
    }
}
