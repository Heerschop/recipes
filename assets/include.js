async function processIncludes(){
  
  async function loadFile(fileName) {
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
  
      http.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            resolve(this.responseText);
          }
  
          if (this.status == 404) { 
            reject('file not found.'); 
          }
        }
      }
  
      http.open("GET", fileName, true);
      http.send();
    });
  
  }

  return new Promise(async (resolve, reject) => {
    for (const element of document.getElementsByTagName("*")) {
      const fileName = element.getAttribute("include-html");

      if (fileName){
        try{
          let content = await loadFile(fileName);
  
          for (let index = 0; index < element.attributes.length; index++) {
            const attribute = element.attributes.item(index);
            const matches = attribute.name.match(/^\[(.*)\]$/);
  
            if (matches !== null) {
              const attributeName = matches[1];
              const expression = new RegExp('{{' + attributeName + '}}', 'g');
  
              content = content.replace(expression, attribute.value);
            }
          }
  
          element.innerHTML = content;        
        } catch (error) {
        }
      }
    }

    resolve();
  });
}
