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