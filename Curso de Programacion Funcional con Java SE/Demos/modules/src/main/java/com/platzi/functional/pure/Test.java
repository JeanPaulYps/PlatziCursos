package com.platzi.functional.pure;

import java.util.function.Function;
import java.util.function.Predicate;

public class Test {
    public static void main(String[] args) {
        System.out.println("Hola mundo");
        Function <Integer, Integer> square = new Function<Integer, Integer>() {
            @Override
            public Integer apply(Integer x) {
                return x * x;
            }
        };

        System.out.println(square.apply(2));
        Function <Integer, Boolean> isOdd = x -> x%2 == 1;
        Predicate<Integer> isEven = x -> x % 2 == 0;
    }
}
