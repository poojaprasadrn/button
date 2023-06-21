const template=document.createElement("template");
template.innerHTML=`
<style>
#mail{
    width:400px;
    height:50px;
    background-color:#f4e1d2;
    border-radius:8px;
}
#btn{
    width:100px;
    height:50px;
    border-radius:8px;
    background-color:#c94c4c;
}
#btn:hover{
    width:100px;
    height:50px;
    border-radius:8px;
    background-color: #eea29a;
}
.my-email{
    text-align:center;
    margin-top:250px;
}
</style>
<div class="my-email">
<h2 style="text-align:center; padding-bottom:20px; font-size:50px;">Email</h2>
<input type="email" id="mail" placeholder="Email">
<button id="btn">Submit</button>
</div>`;

class MyEmail extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('input').style.backgroundColor=this.getAttribute('bgcolor');
    }

    clicked(){
        const mail=this.shadowRoot.querySelector('#mail');
        var pattern=/^[A-Za-z0-9.]+@([a-z]{2,7})+.com$/;
        if((mail.value).match(pattern)){
            alert("Valid email address!");
            this.shadowRoot.querySelector('#mail').style.backgroundColor='green';
        }
        else{
            alert("You have entered an invalid email address! ");
            this.shadowRoot.querySelector('#mail').style.backgroundColor='red';
        }
    }

    connectedCallback(){
        this.shadowRoot.querySelector('#btn').addEventListener('click',()=>this.clicked());
    }

    disconnectedCallback(){
        this.shadowRoot.querySelector('#mail').removeEventListener();
    }
}

window.customElements.define("my-email",MyEmail);