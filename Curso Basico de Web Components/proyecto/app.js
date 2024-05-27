class myElement extends HTMLElement {
  static observedAttributes = [
    "brandName",
    "productImage",
    "productName",
    "backgroundColor",
    "productCollection",
    "productDescription",
    "productPrice",
    "buttonCTA",
  ];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    myElement.observedAttributes.forEach((attribute) => {
      console.log(attribute);
      this[attribute] = this.getAttribute(attribute);
    });

    // this.brandName = this.getAttribute("brandName");
    // this.productImage = this.getAttribute("productImage");
    // this.productName = this.getAttribute("productName");
    // this.productCollection = this.getAttribute("productCollection");
    // this.productDescription = this.getAttribute("productDescription");
    // this.price = this.getAttribute("price");
    this.USDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    console.log("DEBUG", arguments);
    if (oldValue !== newValue) {
      console.log(this);
      if (attribute in observedAttributes) {
        this[attribute] = newValue;
        this.render();
      }
    }
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
        <div class="card" style="margin: 0 auto;">
            <div class="card__background">
            <p class="card__brand"> ${this.brandName} </p>
            <img src="${this.productImage}" class="card__photo" />
            </div>
            <div class="card__information">
            <h3>${this.productName}</h3><span>${this.productCollection}</span>
            <p class="card__description">${this.productDescription} </p>
            <div class="card__purchaseInformation">
                <p class="card__price">${this.USDollar.format(
                  this.productPrice
                )} </p>
                <button class="card__button">${this.buttonCTA}</button>
            </div>
            </div>
        </div>
        ${this.getStyles()}
      `;
    return template;
  }

  getStyles() {
    return `
      <style>
         
        :host {
            padding: 0;
            margin: 0;
            box-sizing: content-box;
        }
    
    
        .card {
            font-family: Arial;
        }
    
        .card__background {
            background-color: #47559f;
            position: relative;
        }
    
        .card__photo {
            width: 300px;
            position: absolute;
            bottom: -50px;
            right: 20px;
        }
    
        .card__brand {
            font-size: 72px;
            font-weight: bold;
            color: #3e4c94;
            padding: 20px 0 0 20px;
        }
    
        .card__information {
            background-color: white;
        }
    
        .card__information h3 {
            display: inline;
            margin-right: 10px;
            font-size: 30px;
        }
    
        .card__information span {
            display: inline;
            text-transform: uppercase;
            font-weight: bold;
            color: gray;
        }
    
        .card__description {
            margin: 20px 0;
        }
    
        .card__purchaseInformation {
            display: flex;
            align-items: center;
        }
    
        .card__price {
            margin-right: auto;
            font-size: 30px;
            font-weight: bold;
            color: gray;
        }
    
        .card__button {
            background-color: #4c55a0;
            color: white;
            height: 50px;
            border-radius: 25px;
            padding: 10px 30px;
            border: 0;
            font-weight: bold;
            letter-spacing: 1px;
        }
    
        .card__button:hover {
            cursor: pointer;
        }
    
        @media (max-width: 999px) {
            .card__background {
            height: 200px;
            }
    
            .card__information {
            /* margin-top: 20px; */
            padding: 30px 20px 10px;
            }
        }
    
        @media (min-width: 1000px) {
            .card {
            display: flex;
            flex-wrap: nowrap;
            max-width: 900px;
            height: 450px;
            }
    
            .card__background {
            width: 400px;
            flex-grow: 1;
            flex-shrink: 0;
            }
    
            .card__photo {
            width: 600px;
            transform: rotate(-30deg);
            right: -50px;
            bottom: 0px;
    
    
            }
    
            .card__information {
            flex-grow: 0;
            padding: 10px 20px;
            }
    
            .card__information span {
            display: block;
            }
    
            .card__description {
            padding-left: 60px;
            }
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

customElements.define("product-card", myElement);

    
