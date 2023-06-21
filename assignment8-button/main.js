const template=document.createElement("template");
template.innerHTML=`
<style>

#btn{
    text-align:center;
    background-color:red;
    border-radius:5px;
    padding:15px;
    width:100px;
    height:50px;

}

.my-button {
    text-align: center;
}

</style>
<div class="my-button">
<button id="btn"></button>
</div>
`;


class MyButton extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('button').innerText=this.getAttribute('name');
     
    }

    clicked(){
        this.shadowRoot.querySelector('#btn').style.backgroundColor='green';
    } 
    dbclicked(){
        this.shadowRoot.querySelector('#btn').style.backgroundColor='brown';
    }
    msover(){
        this.shadowRoot.querySelector('#btn').style.backgroundColor='white';
    }
    msout(){
        this.shadowRoot.querySelector('#btn').style.backgroundColor='yellow';
    }

    connectedCallback(){
        this.shadowRoot.querySelector('#btn').addEventListener('click',()=>this.clicked());
        this.shadowRoot.querySelector('#btn').addEventListener('dblclick',()=>this.dbclicked());
        this.shadowRoot.querySelector('#btn').addEventListener('mouseover',()=>this.msover());
        this.shadowRoot.querySelector('#btn').addEventListener('mouseout',()=>this.msout());
    }
    
    disconnectedCallback(){
        this.shadowRoot.querySelector('#btn').removeEventListener();
    }

}

window.customElements.define("my-button",MyButton);
  

  