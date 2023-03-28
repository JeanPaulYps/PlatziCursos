import { subDays, format } from "date-fns";

const exampleDate = new Date(1998, 1, 28);
const rta = subDays(exampleDate, 28)
const str = format(rta, "yyyy/MM/dd");

console.log(str);
