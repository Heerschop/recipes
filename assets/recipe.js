let selectedText = null;

function* getElementsByAttribute(elementName, attributeName) {
  for (const element of document.getElementsByTagName(elementName)) {
    if (element.hasAttribute && element.hasAttribute(attributeName)) {
      yield element;
    }
  }
}

function onCopyClick(){
  const element = document.getElementById('copy-textarea');

  element.value = selectedText;
  element.select();

  document.execCommand("copy");
}

function onCardItemClick(mouseEvent) {
  const element = mouseEvent.target;

  if (element.tagName==='DIV'){
    selectedText = element.textContent;

    if (element.classList.contains('card-item-selected')) {
      element.classList.remove('card-item-selected');
    } else {
      element.classList.add('card-item-selected');
    }

    return;
  }

  if (element.tagName==='IMG'){
    if (element.classList.contains('card-image-selected')) {
      element.classList.remove('card-image-selected');
    } else {
      element.classList.add('card-image-selected');
    }

    return;
  }
}

function onCardClick(mouseEvent){
  const element = mouseEvent.target;

  if (element.tagName==='DIV'){
    if (element.classList.contains('card-collapsed')) {
      element.classList.remove('card-collapsed');
    } else {
      element.classList.add('card-collapsed');
    }

    return;
  }
}

function processRecipes() {
  for (const element of getElementsByAttribute('div', 'recipe')) {
    const link = document.createElement('a');
    const text = document.createTextNode(element.firstChild.textContent);

    link.href = element.getAttribute('recipe');
    link.target = '_blank';
    link.appendChild(text);

    element.classList.add('recipe');
    element.removeChild(element.firstChild);
    element.parentElement.insertBefore(link, element);
  }
}

function processIngredients() {
  for (const ingredients of getElementsByAttribute('div', 'ingredients')) {
    const header = document.createElement('h2');
    const text = document.createTextNode('Ingredients');

    header.appendChild(text);
    header.addEventListener("click", (source) => onCardClick({
      target:ingredients,
    }));

    ingredients.classList.add('ingredients', 'card');
    ingredients.insertBefore(header, ingredients.firstChild);

    const elements = [];

    for (const element of ingredients.childNodes) {
      if (element.getAttribute && element.getAttribute('image')) elements.push(element);
    }

    for (const element of elements) {
      const image = element.getAttribute('image');

      if (image) {
        ingredients.insertBefore(document.createElement('hr'), element);

        const imageElement = document.createElement('img');

        imageElement.src = image;

        if (!image.startsWith('http')) {
          imageElement.src = 'images/' + image + '.png';
        }

        element.insertBefore(imageElement, element.firstChild);
        element.addEventListener("click", (source) =>           onCardItemClick(source)        );
      }
    }

    if (elements.length > 0) ingredients.appendChild(document.createElement('hr'));
  }
}

function processPreparation() {
  for (const preparation of getElementsByAttribute('div', 'preparation')) {
    const header = document.createElement('h2');
    const text = document.createTextNode('Preparation');

    header.appendChild(text);
    header.addEventListener("click", (source) => onCardClick({
      target:preparation,
    }));

    preparation.classList.add('preparation', 'card');
    preparation.insertBefore(header, preparation.firstChild);

    const elements = [];

    for (const element of preparation.childNodes) {
      if (element.getAttribute && element.hasAttribute('bullet')) elements.push(element);
    }

    let number = 1;

    for (const element of elements) {
      preparation.insertBefore(document.createElement('hr'), element);

      const divElement = document.createElement('div');
      const text = document.createTextNode(number);

      divElement.appendChild(text);

      element.insertBefore(divElement, element.firstChild);
      element.addEventListener("click", (source) => {
        onCardItemClick({
          target:element,
        });
      });

      number++;
    }

    if (elements.length > 0) preparation.appendChild(document.createElement('hr'));
  }
}
