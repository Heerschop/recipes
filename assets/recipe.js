function processRecipes() {
  for (const element of document.getElementsByTagName('div')) {
    if (element.hasAttribute && element.hasAttribute("recipe")){
      const link = document.createElement('a');
      const text = document.createTextNode(element.firstChild.textContent);

      link.href = element.getAttribute("recipe");
      link.target = '_blank';
      link.appendChild(text);

      element.classList.add('recipe');
      element.removeChild(element.firstChild);
      element.parentElement.insertBefore(link,element);
    }
  }
}

function processIngredients() {
  for (const ingredients of document.getElementsByClassName('ingredients')) {
    const header = document.createElement("h2");
    const text = document.createTextNode("Ingredients");

    header.appendChild(text);

    ingredients.insertBefore(header, ingredients.firstChild);

    const elements = [];
    
    for (const element of ingredients.childNodes) {
      if (element.getAttribute && element.getAttribute("image")) {
        elements.push(element);
      } 
    }

    for (const element of elements) {
      const image = element.getAttribute("image");

      if (image) {
        ingredients.insertBefore(document.createElement("hr"), element);

        const imageElement = document.createElement("img");

        imageElement.src = image;
        
        if (!image.startsWith('http')) {
          imageElement.src = 'images/' + image + '.png';
        }
        
        element.insertBefore(imageElement,element.firstChild);
      }
    }

    if (elements.length > 0) {
      ingredients.appendChild(document.createElement("hr"));
    }
  }
}

function processPreparation() {
  for (const preparation of document.getElementsByClassName('preparation')) {
    const header = document.createElement("h2");
    const text = document.createTextNode("Preparation");

    header.appendChild(text);

    preparation.insertBefore(header, preparation.firstChild);

    const elements = [];
    
    for (const element of preparation.childNodes) {
      if (element.getAttribute && element.hasAttribute("bullet")) {
      console.log(element.getAttribute("bullet"));
        elements.push(element);
      }
    }

    let number = 1;
    
    for (const element of elements) {
      preparation.insertBefore(document.createElement("hr"), element);

      const divElement = document.createElement("div");
      const text = document.createTextNode(number);

      divElement.appendChild(text);

      element.insertBefore(divElement,element.firstChild);
      
      number++;
    }

    if (elements.length > 0) {
      preparation.appendChild(document.createElement("hr"));
    }
  }
}
