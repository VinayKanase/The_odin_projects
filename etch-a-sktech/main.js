let bgColor = "#FFFFFF";
let penColor = "#000000";
let pixelCount = 16;
document.querySelector(".options").addEventListener("click",(e)=>{
  let element = e.target;
  if(element.classList.contains("brushColor")){
    element.addEventListener("change",()=>{
      penColor = element.value;
    });
  }
  else if(element.classList.contains("bgColor")){
      element.addEventListener("change",()=>{
        bgColor = element.value;
        document.querySelector(".wrapper").style.background = bgColor;
      });
  }
  else if(element.classList.contains("pixelSize")){
    let elementValue = element.value;
    let headingSize = document.querySelector(".pixelheading span");
    pixelCount = elementValue;
    setPixels();
    headingSize.textContent = `${elementValue} x ${elementValue}`;
  }
  else if(element.classList.contains("gridLines")){
     document.querySelector(".wrapper").classList.toggle("grid");
  }
  else if(element.classList.contains("clear")){
      let divs = document.querySelectorAll(".wrapper div");
      divs.forEach((div)=>{
        div.style = "";
      });
  }
  else {
      let elementClassList = element.classList;
      if(elementClassList.contains("eraser")){
      checkForActive(elementClassList,"eraser")
      }
      else if(elementClassList.contains("rainbowPen")){
        checkForActive(elementClassList,"rainbowPen");
      }
      else if(elementClassList.contains("shadingPen")){
        checkForActive(elementClassList,"shadingPen");
      }
  }
});
function checkForActive(elementClassList,cursorName){
    if(document.querySelector(".active")){
        let temp = document.querySelector(".active");
        if(temp.classList.contains(elementClassList[0])){
            elementClassList.remove("active");
            CustomCursor("default");
        }
        else{
            temp.classList.remove("active");
            elementClassList.add("active");
            CustomCursor(cursorName);
        }
      }
      else{
          elementClassList.add("active");
          CustomCursor(cursorName);

      }
} 
document.querySelector(".wrapper").addEventListener("mousemove",(e)=>{
    let x = e.clientX;
    let y = e.clientY;
    let cursor = document.querySelector(".cursor");
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    cursor.style.color = penColor;
    if(cursor.classList.contains("hide")){
        cursor.classList.remove("hide");
    }
    setTimeout(() => {
        cursor.classList.add("hide");
    }, 1000);
});
function CustomCursor(cursorType){
    let cursor = document.querySelector(".cursor"); 
    if(cursorType == undefined || cursorType === "default"){
        cursor.childNodes[1].setAttribute("class","");
        if(!cursor.childNodes[1].classList.contains("gg-pen")) cursor.childNodes[1].classList.add("gg-pen"); 
        CursorProperty("default");
    } 
    else if(cursorType === "eraser"){
        cursor.childNodes[1].setAttribute("class","");
        cursor.childNodes[1].classList.add("gg-square");
       CursorProperty(cursorType);
    }
    else if(cursorType === "rainbowPen"){
        cursor.childNodes[1].setAttribute("class","");
        if(!cursor.childNodes[1].classList.contains("gg-pen")) cursor.childNodes[1].classList.add("gg-pen");
        cursor.childNodes[1].classList.add("rainbow");
       CursorProperty(cursorType);
    }
    else if(cursorType === "shadingPen"){
        cursor.childNodes[1].setAttribute("class","");
        if(!cursor.childNodes[1].classList.contains("gg-pen")) cursor.childNodes[1].classList.add("gg-pen");
        cursor.childNodes[1].classList.add("shading");
        CursorProperty(cursorType);
    }
}
function CursorProperty(cursorType){
  let divs = document.querySelectorAll(".wrapper div");
  if(cursorType === "default"){
    divs.forEach((div)=>{
      div.addEventListener("mousemove",()=>{
        div.style.background = penColor;
      });
    });
  }
  else if(cursorType === "eraser"){
    divs.forEach((div)=>{
        div.addEventListener("mousemove",()=>{
          div.style.background = "";
        });
    });
  }
  else if(cursorType === "rainbowPen"){
      let rColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
      divs.forEach((div)=>{
        div.addEventListener("mousemove",()=>{
          div.style.background = rColors[Math.floor(Math.random() * rColors.length)];
        });
      });
  }
  else if(cursorType === "shadingPen"){
      let gColors = ["#B2BEB5","#A9A9A9","#808080","#818589","#D3D3D3","#E5E4E2","#C0C0C0","#848884","#71797E"];
      divs.forEach((div)=>{
        div.addEventListener("mousemove",()=>{
          div.style.background = gColors[Math.floor(Math.random() * gColors.length)];
        });
      });
  }
}

function setPixels(){
    if(pixelCount > 64) throw new Error("pixelCount Cannot be greater than 64");
  let totalDivs = pixelCount * pixelCount;
  let wrapper = document.querySelector(".wrapper");
  wrapper.innerHTML = "";
  wrapper.style.cssText = `
  grid-template-columns: repeat(${pixelCount},1fr);
  grid-template-rows: repeat(${pixelCount},1fr);`
  for(let i = 0;i < totalDivs;i++){
    let div = document.createElement("div");
    wrapper.append(div); 
  } 
}
setPixels();
CursorProperty("default");