import { UpdatePaginationEvent } from "../events.js";

const template = document.createElement("template");
template.innerHTML = `
    <div part="pagination">
        <slot></slot>
    </div>
`;

export class Pagination extends HTMLElement {
    static define(tagName = "wt-pagination") {
        customElements.define(tagName, this)
    }

    shadowRoot = this.attachShadow({ mode: "open" });

    constructor(dataLength, currentPage, perPage) {
        super();
        this.dataLength = dataLength;
        this.currentPage = currentPage;
        this.perPage = perPage;
    }

    numPages = 0;

    connectedCallback() {
        this.shadowRoot.replaceChildren(template.content.cloneNode(true));

        this.numPages = this.dataLength / this.perPage;
        this.makeButtons(this.numPages);
        
    }

    makeButtons(numPages) {
        
        if( numPages > 1 ) {

            const select = document.createElement('select');

            const prevButton = document.createElement('button');
            prevButton.classList.add('prevBtn');
            prevButton.textContent = 'Prev';
            this.append(prevButton);


            prevButton.addEventListener('click', ()=> {
                document.dispatchEvent(new UpdatePaginationEvent(this.currentPage-1));  
            });

            const pageSelector = document.createElement('div');
            pageSelector.classList.add('pageSelector');

            const label = document.createElement('label');
            label.textContent = "Page";
            pageSelector.append(label);

            for (let i = 0; i < numPages; i++) {
                const option = document.createElement('option');
                option.textContent = i+1;
                option.value = i+1;
                select.append(option);
            } 

            select.value = this.currentPage;

            select.addEventListener('change', ()=>{
                document.dispatchEvent(new UpdatePaginationEvent(parseInt(select.value)));  
            })

            pageSelector.append(select);
            this.append(pageSelector);

            const nextButton = document.createElement('button');
            nextButton.classList.add('nextBtn');
            nextButton.textContent = 'Next';
            this.append(nextButton);

            nextButton.addEventListener('click', ()=> {
                document.dispatchEvent(new UpdatePaginationEvent(this.currentPage+1));  
            });

            this.disableButtons();
        }
    }

    disableButtons() {
        const prevBtn = document.querySelector('.prevBtn')
        const nextBtn = document.querySelector('.nextBtn')
        if( this.currentPage == 1 ) {
            prevBtn.setAttribute('disabled', '');
        } else {
            prevBtn.removeAttribute('disabled');
        }

        if( this.currentPage == this.numPages ) {
            nextBtn.setAttribute('disabled', '');
        } else {
            nextBtn.removeAttribute('disabled');
        }
    }

   
}
Pagination.define()
