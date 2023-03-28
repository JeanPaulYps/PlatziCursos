(() => {
  let productTitle = "My product";
  productTitle = "My product changed";
  console.log({productTitle});

  const productDescription = "bla bla";
  console.log({productDescription});

  const summary = `
    title: ${productTitle},
    descrpition: ${productDescription}
  `

})()
