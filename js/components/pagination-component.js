import { UpdatePaginationEvent } from "../events.js";

const styles = new CSSStyleSheet()
styles.replaceSync(`
    [part=pagination] {
        display: flex;
    }
`);

document.adoptedStyleSheets = [styles];

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

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles];
        this.shadowRoot.replaceChildren(template.content.cloneNode(true));

        document.addEventListener('table-data-loaded-event', (e) => {
            this.makeButtons(e.dataLength / this.perPage);
        });
    }

    makeButtons(numPages) {
        if( numPages > 1 ) {
            const select = document.createElement('select');

            const prevButton = document.createElement('button');
            prevButton.textContent = 'Prev';
            this.append(prevButton);


            prevButton.addEventListener('click', ()=> {
                const currentPage = parseInt(this.getAttribute('current-page'));
                this.setAttribute('current-page', currentPage-1);
                document.dispatchEvent(new UpdatePaginationEvent(currentPage-2));  
                select.value = currentPage-2;
            });

            const pageSelector = document.createElement('div');
            pageSelector.classList.add('pageSelector');

            const label = document.createElement('label');
            label.textContent = "Page";
            pageSelector.append(label);

            for (let i = 0; i < numPages; i++) {
                const option = document.createElement('option');
                option.textContent = i+1;
                option.value = i;
                select.append(option);
            } 

            select.addEventListener('change', ()=>{
                this.setAttribute('current-page', parseInt(select.value)+1);
                document.dispatchEvent(new UpdatePaginationEvent(parseInt(select.value)));  
            })

            pageSelector.append(select);
            this.append(pageSelector);

            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            this.append(nextButton);

            nextButton.addEventListener('click', ()=> {
                const currentPage = parseInt(this.getAttribute('current-page'));
                this.setAttribute('current-page', currentPage+1);
                document.dispatchEvent(new UpdatePaginationEvent(currentPage));  
                select.value = currentPage;
            });
        }
    }
    

    get pagesToShow() {
        const pagesToShow = this.getAttribute("pages-to-show");
        return parseInt(pagesToShow);
    }

    set pagesToShow(value) {
        this.setAttribute("pages-to-show", value);
    }

    get currentPage() {
        const currentPage = this.getAttribute("current-page");
        return currentPage;
    }

    set currentPage(value) {
        this.setAttribute("current-page", value);
    }

    get perPage() {
        const perPage = this.getAttribute("per-page");
        return perPage;
    }
  
    set perPage(value) {
        this.setAttribute("per-page", value);
    }
}
Pagination.define()
