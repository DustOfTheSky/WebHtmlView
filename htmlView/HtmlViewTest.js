class HtmlView extends HTMLElement {

    __templayout=''
    constructor()
    {
        super()
        if (new.target === HtmlView) {
            throw new Error('本类必须由子类实现')
        }
        this.attachShadow({mode: "open"})

    }

    get overideCSS()
    {
        return ``;
    }
    overideTemplate(item)
    {
        return ``;
    }
    get overideData()
    {
        return {};
    }

    __layout()
    {
        this.shadowRoot.innerHTML=this.overideCSS;
        this.shadowRoot.innerHTML+=this.__templayout
    }
    __attrOf(val)
    {

        let ns= val



        let nsData= this.overideData[ns]
       // console.log( nsData)
        for (const nameElement of nsData) {
          this.__templayout+=this.overideTemplate(nameElement);
        }
    }


    static get observedAttributes()
    {
        return ['of','if']
    }
    attributeChangedCallback(name,oldV,newV)
    {

        switch (name)
        {

            case 'of':
                this.__attrOf(newV)
                break;
            case 'if':
                let show=this.overideData[newV]
                if(show)
                {
                    this.hidden=true;
                }
                else
                {
                    this.hidden=false;
                }
                break;
        }

        this.__layout()

    }

    eachEvent(callback=Function)
    {
        let list=this.shadowRoot.children
        list=  Array.from(list)
        list.splice(0,1)
        for (const li of list) {
            li.addEventListener('click',(e)=>{

                callback && callback(li)
            })
        }

    }

    static registerView(viewType=HTMLElement,viewName='')
    {
        customElements.define(viewName,viewType)
        return {dataType:viewType,registerLable:viewName}
    }

    toString()
    {
        return this.constructor.name;
    }

}
//
class   CircleView extends HtmlView{
    constructor() {
        super();
    }

    get overideCSS() {
        return `<style>
                    .circleview{
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    width: 100px;
                    height: 100px;
                    background-color: red;
                    border-radius: 50%;
                    transition: 1s;
                    cursor: pointer;
                    margin: 2px;
                    }
                    .circleview:hover{
                        transform: scale(1.5);
                        margin: 20px;
                        background:radial-gradient(red,blue,pink);
                    }
                </style>`;

    }

    get overideData() {
        return {
            show:false,
            abc:[100,200,300,500,600]
        }
    }
    overideTemplate(item) {
        return `<div class="circleview">${item}</div>`
    }
}

class  HelloView extends HtmlView{
    constructor() {
        super();
    }
    overideTemplate(item) {
        return `<li class="helloview">
                <h5>${item.user}</h5>
                <img src="${item.photo}"/>
                </li>`;
    }

    get overideCSS() {
        return `<style>
                .helloview{
                    display: inline-flex;
                    justify-content: center;
                    width: 200px;
                    height: 200px;
                    flex-direction: column;
                    border: 1px solid pink;
                    align-items: center;
                    margin: 10px;
                    list-style: none;
                }
                .helloview>h5{
                    display: inline-block;
                    height: 20px;
                }
                .helloview>img{
                width: 180px;
                height: 180px;
                }
                
                </style>`
    }

    get overideData() {
        return {
            persion:[
                {user:'早上好',photo:'./my.jpg'},
                {user:'中午好',photo:'./my.jpg'},
                {user:'晚上好',photo:'./my.jpg'},
            ]
        }
    }
}



customElements.define('circle-view',CircleView)
customElements.define('hello-view',HelloView)
let helloview=document.querySelector('#hello')
helloview.eachEvent(v=>{
    //console.log(v)
        alert(v.children[0].textContent)
})