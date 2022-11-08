let x, y, z = 0;
let remains = 5;

const myOverFunction = () => {
    mLeft = Math.random() * 300;
    mTop = Math.random() * 300;
    document.getElementById("runaway-container").style.left = mLeft;
    document.getElementById("runaway-container").style.top = mTop;
}

const startCaptcha = () => {
    const collection = document.getElementsByClassName("leter");
    for (let i = 0; i < collection.length; i++) {
        collection[i].style.fontSize = "large";
    }
    document.getElementById("runaway-container").remove();
}

const createBox = () => {
    const box = document.createElement("div");
    box.setAttribute("id", "div1");
    box.setAttribute("ondrop", "drop(event)");
    box.setAttribute("ondragover", "allowDrop(event)");
    document.body.appendChild(box);

    const instructions = document.createElement("div");
    instructions.setAttribute("id", "fade-in");
    box.append(instructions);
    document.getElementById("fade-in").innerText = "Drag here the words";
    document.getElementById("fade-in").style.fontStyle = "italic";
}

const explode = () => {

    let linkText = document.getElementById("initialText").textContent;
    
    const cadena = [];
    cadena[0] = linkText.slice(0, -12);
    cadena[1] = linkText.slice(4, -6);
    cadena[2] = linkText.slice(10);
    cadena[3] = 'like';
    cadena[4] = 'a human';

    startCaptcha();

    for (i = 0; i < 5; i++) {
        let part = document.createElement("span");
        part.innerText = cadena[i];
        part.style.position = "relative";
        part.style.left = Math.random() * 123;
        part.style.top = "-" + Math.random() * 133;
        part.setAttribute("id", `drag${i+1}`);
        part.setAttribute("draggable", "true");
        part.setAttribute("ondragstart", "drag(event)");
        document.body.appendChild(part);
    }

    createBox();
}

const allowDrop = (ev) => {
    ev.preventDefault();
}

const drag = (ev) => {
    document.getElementById("fade-in") ? document.getElementById("fade-in").remove() : '';
    ev.dataTransfer.setData("text", ev.target.id);
}

const drop = (ev) => {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    document.getElementById(data).style.left = 0;
    document.getElementById(data).style.top = 0;
    ev.target.appendChild(document.getElementById(data));
    checkOrder(data);
}

const wrongWord = (data, origin) => {

    let textLink = document.getElementById(data).textContent;
    let parentDiv = document.getElementById("anchorPoint").parentNode;
    let newNode = document.createElement("span");

    newNode.innerText = textLink;
    newNode.style.position = "relative";
    newNode.style.right =  Math.random() * 187;
    newNode.style.bottom =  Math.random() * 126;
    newNode.setAttribute("id", `drag${origin}`);
    newNode.setAttribute("draggable", "true");
    newNode.setAttribute("ondragstart", "drag(event)");
    console.log(data, origin, textLink, parentDiv);

    let sp2 = document.getElementById("anchorPoint");
    return parentDiv.insertBefore(newNode, sp2);
} 

const checkOrder = (data) => {

    let parentDiv = document.getElementById("anchorPoint").parentNode;
    let dad = document.getElementById ("div1");
    let origin = data.substring(4,5); 

    if( data === 'drag1' && remains === 5 ) {
        document.getElementById(data).style.color = 'green';
        document.getElementById(data).style.fontWeight = 'bolder';
        remains = 4;
    } else if ( data != 'drag1' && remains === 5 ) {
        wrongWord(data, origin);
        let item = dad.querySelector(`#${data}`);
        dad.removeChild(item);
    }    
    if( data === 'drag2' && remains === 4 ) {
        document.getElementById(data).style.color = 'green';
        document.getElementById(data).style.fontWeight = 'bolder';
        remains = 3;
    } else if ( (data != 'drag2' && data != 'drag1') && remains === 4 ) {
        wrongWord(data, origin);
        let item = dad.querySelector(`#${data}`);
        dad.removeChild(item);
    } 
    if( data === 'drag3' && remains === 3 ) {
        document.getElementById(data).style.color = 'green';
        document.getElementById(data).style.fontWeight = 'bolder';
        remains = 2;
    } else if ( (data != 'drag3' && data != 'drag2' && data != 'drag1') && remains === 3 ) {
        wrongWord(data, origin);
        let item = dad.querySelector(`#${data}`);
        dad.removeChild(item);
    } 
    if( data === 'drag4' && remains === 2 ) {
        document.getElementById(data).style.color = 'green';
        document.getElementById(data).style.fontWeight = 'bolder';
        remains = 1;
    } else if ( (data != 'drag4' && data != 'drag3' && data != 'drag2' && data != 'drag1') && remains === 2 ) {
        wrongWord(data, origin);
        let item = dad.querySelector(`#${data}`);
        dad.removeChild(item);
    } 
    if( data === 'drag5' && remains === 1 ) {
        document.getElementById(data).style.color = 'green';
        document.getElementById(data).style.fontWeight = 'bolder';
        document.getElementById("div1").style.backgroundColor = 'white';
        document.getElementById("div1").style.border = "thick solid green";
        document.getElementById("div1").innerText = 'Captcha Sucesfull';
        
        setTimeout(() => {
            document.getElementById("div1").remove();  
            let congrats = document.createElement("span");
            congrats.innerText = 'Congratulations, now you can access the link:';
            congrats.style.color = 'white';
            let sp2 = document.getElementById("anchorPoint");
            parentDiv.insertBefore(congrats, sp2);
    
            let theLink = document.createElement('a');
            let textNode = document.createTextNode("The Oatmeal");
    
            theLink.appendChild(textNode);
            theLink.href = "https://theoatmeal.com/";
            parentDiv.insertBefore(theLink, sp2);
    
            const collection = document.getElementsByClassName("leter");
            for (let i = 0; i < collection.length; i++) {
                collection[i].style.fontSize = "400%";
            }
        }, 1000);
    } 
}
