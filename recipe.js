const ingredients = document.getElementById("ingredients");

if (ingredients) {
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

      const inputElement = document.createElement("input");
      inputElement.type = "checkbox"
      ingredients.insertBefore(inputElement, element);

      const imageElement = document.createElement("img");
      imageElement.src = (image.startsWith('http') ? '' : 'images/') + image;
      ingredients.insertBefore(imageElement, element);
    }
  }

  if (elements.length > 0) {
    ingredients.appendChild(document.createElement("hr"));
  }
}
