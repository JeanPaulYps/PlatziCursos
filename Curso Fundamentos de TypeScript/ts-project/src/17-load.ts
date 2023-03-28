import _ from "lodash";

const data = [
  {
    username:  "nico",
    role: "admin"
  },
  {
    username:  "valentina",
    role: "seller"
  },
  {
    username:  "zulema",
    role: "seller"
  },
  {
    username:  "santiago",
    role: "seller"
  }
];

const group = _.groupBy(data, (item) => item.role);

console.log(group);
