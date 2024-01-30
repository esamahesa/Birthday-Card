// The Section you can edit its value to make some variation

let speed = {
  // If you put the Next Paragraph 500ms or even more, so will get the result of pending Writing the next paragraph
  "Type Writer Animation and Caret Animation": 100,
  "Next Paragraph": 100
};

let word = {
  // U can change the text of the paragprah!
  "Paragraph 1": "Happy Birthday Ka Tya",
  "Paragraph 2": "Congratulations on your 25th Birthday",
  "Paragraph 3": "I hope u always healthy and happy!",
  "Signed": "Mahesa Jenar"
};

// Below this, please dont edit!
const $ = id=>{return document.getElementById(id)};
let card = $('card'),
    openButton = $('open'),
    closeButton = $('close'),
    timer = null;
const paragraphInside = document.querySelector('#card-inside .wrap');

let isWriteFinish = false;
const attemptWord = (object)=>{
  let obj = {};
  let i = 0;
  for(let prop in object){
    i++;
    obj[i] = [object[prop], false];
  };

  for(let prop in obj){
    if(prop == i){
      obj[prop].push(true); // This use for identification of the signed text
    } else{
      obj[prop].push(false);
    };
  };

  return obj;
};

const open = ()=>{
  card.className = 'open-half';
  if(timer) clearTimeout(timer);
  timer = setTimeout(()=>{
    card.className = 'open-fully';
    
    loopParagraph(attemptWord(word));
    let checkIsWriteReallyFinish = setInterval(()=>{
      if(isWriteFinish){
        clearInterval(checkIsWriteReallyFinish);
        timer = null;
      };
    }, 100);
  }, 1000);
};

const close = ()=>{
  if(!isWriteFinish) return;
  card.className = 'close-half';
  if(timer) clearTimeout(timer);
  timer = setTimeout(()=>{
    isWriteFinish = false;
    card.className = '';
    timer = null;
    setTimeout(removeParagraph, 1000);
  }, 1000);
};

const removeParagraph = ()=>document.querySelectorAll('#card-inside .wrap p').forEach(element=>element.remove());

function pending(ms){
  return new Promise(resolve=>{
    setTimeout(resolve, ms);
  });
};

const writeText = async (arr)=>{
  let paragraphElement = document.createElement('p');

  if(arr[2]) paragraphElement.classList.add('signed');
  paragraphInside.appendChild(paragraphElement);

  let i = 0;
  let writingInterval = setInterval( async ()=>{
    // Create a span element that has class of caret then append the next word of the text rightaway
    let caretElement = `<span class='caret'>${arr[0].charAt(i + 1) || ""}</span>`; 
    paragraphElement.innerHTML += arr[0].charAt(i) + caretElement; // append the text and the next text with caret

    await pending(speed["Type Writer Animation and Caret Animation"] / 2);
    let caret = document.querySelectorAll('.caret');
    caret[caret.length - 1].remove();

    if(i >= arr[0].length-1){
      clearInterval(writingInterval);
      arr[1] = true;
    };
    i++;
  }, speed["Type Writer Animation and Caret Animation"]);
};

const loopParagraph = (obj)=>{
  let i = 1;
  writeText(obj[i]);
  i++;
  let loopInterval = setInterval(()=>{
    if(!obj[i]){
      clearInterval(loopInterval);
      isWriteFinish = true;
      return;
    }

    if(obj[i - 1][1]){
      writeText(obj[i]);
      i++;
    };
  }, speed["Next Paragraph"]);
};

// WAHAHAHA SELESAI!!
openButton.addEventListener('click', open);
closeButton.addEventListener('click', close);
