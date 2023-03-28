export interface Driver {
  database: string;
  password: string;
  port: number;

  connect(): void;
}

// const driver: Driver = {
//   database: '',
//   password: '',
//   port: 23,
// };

class PostgresDriver implements Driver {
  constructor(
    public database: string,
    public password: string,
    public port: number
  ) {}
  connect(): void {
     //
  }
}
