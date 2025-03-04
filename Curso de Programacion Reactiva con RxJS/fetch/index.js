const { range, filter, map,  of, catchError, mergeMap } = rxjs;
const {ajax} = rxjs.ajax;
const {fromFetch } = rxjs.fetch;

// const ditto$ = ajax("https://pokeapi.co/api/v2/pokemon/ditto").pipe(
//     map(data => console.log(data)),
//     catchError(error => of(error))
// )

// ditto$.subscribe(console.log);


const postRequest$ = ajax({
    url: "https://httpbin.org/delay/2",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: {
        message: "Donde esta dito?"
    }
}).pipe(
    map(response => response),
    catchError(error => error)
)

postRequest$.subscribe(console.log);


const dittoFetch$ = fromFetch("https://pokeapi.co/api/v2/pokemon/ditto").pipe(
    mergeMap(response => response.json()),
    catchError(error => of(error))
)

dittoFetch$.subscribe(console.log);
