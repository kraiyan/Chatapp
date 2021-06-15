

const socket =io()

let name1;

let messageArea= document.querySelector('.chatScreen')

do{

    name1= prompt("Plz enter your name: ")

}while(!name1)

let textarea=document.querySelector('#textarea');

    textarea.addEventListener('keyup',(e)=>{

           if(e.key=='Enter'){

            sendMessage(e.target.value)
           }
    })


    function sendMessage(msg){

                let msg1={

                    user:name1,
                    message: msg.trim()

                }

                appendMessage(msg1,'outgoing')

                textarea.value= ''

                scrolltoBottom()

                socket.emit('message',msg1)
    }

    function appendMessage(msg1,type){


      let mainDiv= document.createElement('div')

      let className= type 

             mainDiv.classList.add(className,'message')
      let markup= `
      
          <h2>${msg1.user}</h2>
          <p>${msg1.message}</p>
      
      
      `

        mainDiv.innerHTML= markup

        messageArea.appendChild(mainDiv)

    }

    socket.on('message',(msg)=>{

        appendMessage(msg,'incoming')
        scrolltoBottom();

    })


    function scrolltoBottom(){

        messageArea.scrollTop= messageArea.scrollHeight
    }

   