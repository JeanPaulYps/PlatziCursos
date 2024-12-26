package Functional;

import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;

public class NombresUtils   {
    public static <T> List<T> getList(T...elements){
        return Arrays.asList(elements);
    }

    public static void main(String[] args) {
        List <String> profesores = getList("Nicolas", "Juan", "Zulema");
        Consumer <String> printer = text -> System.out.println(text);
        profesores.forEach(System.out::println);
    }
}
