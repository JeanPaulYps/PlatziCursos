package Models;

public class Nurse extends User {

    private String specialty;

    public Nurse(String name, String email) {
        super(name, email);
    }

    @Override
    public void showDataUser() {
        System.out.println("Empleado del Hospital: Cruz verde");
        System.out.println("Departamentos: Nutriologia, Pediatria");
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }
}
