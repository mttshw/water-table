import { TableDataLoadedEvent } from "../events.js";
import { getTableData } from "../functions.js";
import { ItemCard } from "./item-card.js";
import { Pagination } from "./pagination-component.js";

const styles = new CSSStyleSheet()
styles.replaceSync(`
    [part="wrapper"] {
        overflow: scroll;
    }
    table {
        border-collapse: collapse;
        width: max(65rem, 100%);
        table-layout: fixed;
    }
    thead th:not(:first-child),
    td {
        text-align: end;
    }
    
    td, th {
        padding: 0.25rem 0.75rem;
        width: 6rem;
    }
    th {
        background: rgb(217, 237, 255);
        border-color: rgb(217, 237, 255);
    }
    th:first-child,
    td:first-child {
        position: sticky;
        inset-inline-start: 0;
        border-inline-end: none;
        width: 5rem;
    }
    th:first-child {
        background: rgb(217, 237, 255);
    }
    td:first-child {
        background: #fff;
    }


    td:first-of-type,
    th:first-of-type {
        border-inline-start: none;
    }

    th:first-child::after,
    td:first-child::after {
        content: '';
        position: absolute;
        inset-block-start: 0;
        inset-inline-end: 0;
        width: 1px;
        height: 100%;
        background: lightgrey;
    }

    .id span, 
    .sensorId span {
        font-family: monospace;
        font-size: 0.8rem;
        background: var(--gray);
        padding: 4px;
        display: inline-block;
        word-break: break-all;
    }
`);

document.adoptedStyleSheets = [styles];

const template = document.createElement("template");
template.innerHTML = `
    <div part="wrapper">
        <div part="filter">
            <div part="search">
                <label part="item-label">Search</label>
                <input part="text-input" type="text" />
            </div>
            <div part="sort">
                <label part="item-label">Sort by</label>
                <select>
                    <option>Order by...</option>
                </select>
            </div>
        </div>
        <slot></slot>
    </div>
`;

export class TableView extends HTMLElement {
    static define(tagName = "wt-table-view") {
      customElements.define(tagName, this)
    }

    shadowRoot = this.attachShadow({ mode: "open" });

    tableHeadings = [];

    tableData = [];
    searchData = [];
    
    perPage = 20;



    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles];
        this.shadowRoot.replaceChildren(template.content.cloneNode(true));
        
        this.getData();

        document.addEventListener('update-pagination-event', (e) => {
            this.makeTable(this.sliceForPagination(this.searchData, e.page-1), e.page);
        });

        const searchBox = this.shadowRoot.querySelector('[part="search"] input');
        searchBox.addEventListener('keyup', (e)=>{
            this.search(searchBox.value, this.tableData);
        });
    }

    async getData() {
        const data = await getTableData(); 
        
        this.tableData = data;
        this.searchData = data;
        document.dispatchEvent(new TableDataLoadedEvent(data.length));
        this.makeTable(this.sliceForPagination(data, 0), 1, true);
    }

    sliceForPagination(input, page) {
        return input.slice(page*this.perPage, (page+1)*this.perPage);
    }

    makeFilter(row) {
        const keys = Object.keys(row);
        const select = this.shadowRoot.querySelector('[part="filter"] select');
        
        keys.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = this.formatFilter(key);
            select.append(option);
        })
        select.addEventListener('change', (e)=>{
            this.sort(e.target.value);
        });
    }

    search(searchTerm) {

        var results = [];
        for(var i=0; i<this.tableData.length; i++) {
            for(var key in this.tableData[i]) {
                if(this.tableData[i][key].toString().indexOf(searchTerm)!=-1) {
                    results.push(this.tableData[i]);
                }
            }
        }
        // return results;
        this.searchData = results;
        this.makeTable(this.sliceForPagination(results, 0), 1);
    }

    makeTable(data, page, makeFilter = false) {
        this.innerHTML = '';
        
        data.forEach((row, index) => {
            if( index == 0 && makeFilter ) this.makeFilter(row);
            this.append(new ItemCard(row));
        });
        const pagination = new Pagination(this.searchData.length, page, this.perPage);
        this.append(pagination);
    }

    formatFilter(heading) {
        const result = heading.replace(/([A-Z])/g, " $1");
        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return(finalResult);
    }

    sort(name) {
        if(this.sortCol && this.sortCol === name) this.sortAsc = !this.sortAsc;
        this.sortCol = name;
        this.searchData.sort((a, b) => {
            if(a[this.sortCol] < b[this.sortCol]) return this.sortAsc?1:-1;
            if(a[this.sortCol] > b[this.sortCol]) return this.sortAsc?-1:1;
            return 0;
        });

        const data = this.searchData.slice(0, this.perPage);
        document.dispatchEvent(new TableDataLoadedEvent(data.length));
        this.makeTable(data, 1);
    }
    
    
}
TableView.define()
