const template=document.createElement('template');
let count=0;
template.innerHTML=`
<style>
.editable-list{
    background-color: #B5E5CF;
    text-align: center;
    padding: 50px 90px;
}
.editable-list:after {
    content: "";
    display: table;
    clear: both;
}
input[type=text]{
    width: 100%;
    color:black;
    border-radius: 3px;
    height: 40px;
}
input[type=submit]{

    border-radius: 5px;
    font-size: 20px;
    background-color: #FCB5AC;
    color:white;
    width:150px;
    height:40px;
}
ul{
    margin:0;
    border:0;
}
ul li {
cursor: pointer;
position: relative;
padding: 12px 8px 12px 40px;
list-style-type:none;
background: #eee;
font-size: 18px;
width: 100%;
}


.deletion {
position: absolute;
right: 0;
top: 0;
padding: 12px 16px 12px 16px;
}
* {
box-sizing: border-box;
}

#btn:hover{
background-color:  #3D5B59;
}

#btn:active{
    background-color: #B99095;
}

</style>
<div class="editable-list">
<p><input type="text" id="data" placeholder="Type something..."></p>
<p><input type="submit" value="ADD" id="btn"></p>
<div>
<ul id="items">
</ul>
</div>
</div>
`;

class EditList extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    addItem(){
        
        var input=this.shadowRoot.getElementById("data").value;
        var list=this.shadowRoot.getElementById("items");
        var listItem=document.createElement("li");
        var paragraph=document.createElement("p");
        var span=document.createElement("span");

        listItem.style.textAlign="start";
        listItem.innerHTML=(input);

        var cancel=document.createElement("button");
        cancel.style.backgroundColor="red"
        cancel.innerHTML="X";
        cancel.contentEditable="false";

        var edit=document.createElement("button");
        edit.style.backgroundColor="orange"
        edit.innerHTML="edit";
        edit.contentEditable="false";

        paragraph.appendChild(listItem);
        span.appendChild(edit);
        span.style.float="right";
        span.appendChild(cancel);
        span.style.float="right";

        listItem.appendChild(span);
        if(input==""){
            alert("Please write something");
        }
        else{
            this.shadowRoot.getElementById("items").appendChild(paragraph);
        }
        listItem.addEventListener("click",()=>{
            if(count==0){
                listItem.style.backgroundColor="green";
            count++;
            }
            else{
                listItem.style.backgroundColor="#eee";
                count--;
            }
        })
        edit.addEventListener("click",()=>{
            paragraph.contentEditable=true;
            //li.style.backgroundColor="#eee";

        })
        cancel.addEventListener("click",()=>{
            list.removeChild(paragraph);
        })
        this.shadowRoot.getElementById("data").value="";
    }

    connectedCallback(){
        this.shadowRoot.getElementById("btn").addEventListener("click",()=>{
            this.addItem();
        })
    }

    disconnectedCallback(){
        this.shadowRoot.querySelector('#btn').removeEventListener();
    }
}

window.customElements.define("editable-list",EditList);