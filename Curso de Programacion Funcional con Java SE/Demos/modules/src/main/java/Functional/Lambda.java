package Functional;

import java.util.List;

public class Lambda {
    public static void main(String[] args) {
        List<String> cursos = NombresUtils.getList("Java", "Functional");
        cursos.forEach(curso -> System.out.println(curso));
        useZero(() -> 2);
    }

    static void useZero (ZeroArguments zeroArguments) {

    }
    @FunctionalInterface
    interface ZeroArguments{
        int get();
    }
}
