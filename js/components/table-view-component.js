import { TableDataLoadedEvent } from "../events.js";
import { getTableData } from "../functions.js";

const styles = new CSSStyleSheet()
styles.replaceSync(`
    table {
        max-width: 100%;
        border-spacing:0; 
        border-collapse: collapse;
    }
    th {
        text-align: left;
        border-bottom: 1px solid #000;
        text-transform: uppercase;
        font-weight: 200;
        font-size: 0.8rem;
        padding: 1vw;
    }
    td {
        overflow: hidden; 
        text-overflow: ellipsis; 
        word-wrap: break-word;
        padding: 1vw;
    }
    tr:nth-child(odd) {
        background: rgb(242, 245, 255);
    }
    tr:nth-child(even) {
        background: rgb(229, 235, 255);
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
    <table>
        <thead>
            <tr part="tableHeadings"></tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <slot>d</slot>
`;

export class TableView extends HTMLElement {
    static define(tagName = "wt-table-view") {
      customElements.define(tagName, this)
    }

    shadowRoot = this.attachShadow({ mode: "open" });

    tableHeadings = [];

    tableData = [];
    perPage = 0

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles];
        this.shadowRoot.replaceChildren(template.content.cloneNode(true));
        this.shadowRoot.is

        this.perPage = document.querySelector('wt-pagination').getAttribute('per-page');

        
        this.getData();

        document.addEventListener('update-pagination-event', (e) => {

            this.makeTable(this.sliceForPagination(this.tableData, e.page));
        });

    }

    async getData() {
        const data = await getTableData(); 
        
        this.tableData = data;
        // console.log(data);
        // console.log(this.tableData);
        document.dispatchEvent(new TableDataLoadedEvent(data.length));
        this.makeTable(this.sliceForPagination(data, 0));
    }

    sliceForPagination(input, page) {
        console.log( page*this.perPage , (page+1)*this.perPage );
        return input.slice(page*this.perPage, (page+1)*this.perPage);
    }

    makeTable(data) {
        const tbody = this.shadowRoot.querySelector('tbody');
        tbody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');


            for (let item in row) {
                
                    this.checkTableHeadings(item);
                    this.addCell(row[item], tr, item);
                    
                
            }

            tbody.append(tr);

        });
    }

    addCell(item, tr, className = 'cell') {
        const td = document.createElement('td');
        const span = document.createElement('span');
        td.classList.add(className)
        span.textContent = item;
        td.append(span);
        tr.append(td);
    }

    checkTableHeadings(heading) {
        if(!this.tableHeadings.includes(heading)) {
            this.tableHeadings.push(heading);
            const th = document.createElement('th');
            th.setAttribute('sort', heading);
            th.addEventListener('click', (e)=>{
                this.sort(heading)
            }, false);
            th.textContent = this.formatHeading(heading);

            this.shadowRoot.querySelector('[part="tableHeadings"]').append(th);
        }
    }

    formatHeading(heading) {
        const result = heading.replace(/([A-Z])/g, " $1");
        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return(finalResult);
    }

    sort(name) {
        const tbody = this.shadowRoot.querySelector('tbody');
        tbody.innerHTML = '';

        console.log('sort by',name);

        if(this.sortCol && this.sortCol === name) this.sortAsc = !this.sortAsc;
        this.sortCol = name;
        this.tableData.sort((a, b) => {
            if(a[this.sortCol] < b[this.sortCol]) return this.sortAsc?1:-1;
            if(a[this.sortCol] > b[this.sortCol]) return this.sortAsc?-1:1;
            return 0;
        });

        const data = this.tableData.slice(0, this.perPage);
        this.makeTable(data, tbody);
    }
    
    
}
TableView.define()
