(()=>{
  let myNull: null = null;
  let myUndefined: undefined = undefined;

  let myString: string | undefined = undefined;
  myString = "aas";

  function hi (name: string | null) {
    let hello = "Hola ";
    if (name) {
      hello += name;
    } else {
      hello += 'nobody';
    }
    console.log(hello);
  }

  function hiV2 (name: string | null) {
    let hello = "Hola ";
    hello += name?.toLowerCase() || "nobody";
    console.log(hello);
  }

  hi("Nicolas");
  hi(null);
  hiV2("Nicolas");
  hiV2(null);
})()
