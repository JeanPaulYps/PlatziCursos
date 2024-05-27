class MyCustomElement extends HTMLElement {
  constructor() {
    super();
    console.log("Hola desde el constructor - Memoria");
  }

  connectedCallback() {
    console.log("Hola desde el dom");
  }

  disconnectedCallback() {
    console.log("Adios del dom");
  }
}

customElements.define("my-custom-element", MyCustomElement);

document.querySelector("my-custom-element").remove();
