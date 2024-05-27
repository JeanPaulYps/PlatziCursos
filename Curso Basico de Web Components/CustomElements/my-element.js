class myElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static observedAttributes = ["title", "parrafo", "img"];

  attributeChangedCallback(attribute, oldValue, newValue) {
    console.log("DEBUG", arguments);
    if (oldValue !== newValue) {
      if (attribute === "title") {
        this.title = newValue;
        this.render();
      }
      if (attribute === "parrafo") {
        this.parrafo = newValue;
      }
      if (attribute === "img") {
        this.img = newValue;
      }
    }
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
        <section>
            <h2>${this.title}</h2>
            <slot></slot>
            <div>
              <p>${this.parrafo}</p>
            </div>
        </section>
        ${this.getStyles()}
    `;
    return template;
  }

  getStyles() {
    return `
    <style>
      :host {
        display: inline-block;
      }
        
    </style>
    `;
  }

  render() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }
    this.shadowRoot.replaceChildren(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("my-element", myElement);
