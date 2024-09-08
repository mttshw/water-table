import { TableDataLoadedEvent } from "../events.js";

const styles = new CSSStyleSheet()
styles.replaceSync(`
    table {
        border: 1px solid #000;
        table-layout:fixed;
    }
    th {
        border-bottom: 1px solid #000;
    }
    td {
        overflow: hidden; 
        text-overflow: ellipsis; 
        word-wrap: break-word;
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
`;

export class TableView extends HTMLElement {
    static define(tagName = "wt-table-view") {
      customElements.define(tagName, this)
    }

    shadowRoot = this.attachShadow({ mode: "open" });

    tableHeadings = [];

    tableData = [];

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles];
        this.shadowRoot.replaceChildren(template.content.cloneNode(true));

        const tbody = this.shadowRoot.querySelector('tbody');
        const perPage = document.querySelector('wt-pagination').getAttribute('per-page');

        fetch('../../river_sensor_data.json').then((response)=>{
            return response.json();
        }).then(data=>{

            this.tableData = data;
            document.dispatchEvent(new TableDataLoadedEvent(data.length));

            data = data.slice(0, perPage);
            this.makeTable(data, tbody);
        });

        document.addEventListener('update-pagination-event', (e) => {
            tbody.innerHTML = '';

            console.log( e.page*perPage , (e.page+1)*perPage );
            const data = this.tableData.slice(e.page*perPage, (e.page+1)*perPage);
            this.makeTable(data, tbody);
        });

    }

    makeTable(data, tbody) {
        data.forEach(row => {
            const tr = document.createElement('tr');


            for (let item in row) {
                if( item == 'payload' ) {
                    const decode = atob(row[item]);
                    const payloadObject = JSON.parse(decode);

                    for( let payloadItem in payloadObject) {
                        this.checkTableHeadings(payloadItem);
                        const value = payloadObject[payloadItem];
                        if( typeof value == 'object' ) {
                            let text = '';
                            for( let valueKey in value) {
                                text += value[valueKey];
                            }
                            this.addCell(text, tr);
                        } else {
                            this.addCell(payloadObject[payloadItem], tr);
                        }
                    }
                } else if ( item == 'transmittedAt') {
                    const date = new Date(row[item].iso);;

                    this.checkTableHeadings(item);
                    this.addCell(date, tr);


                } else {

                    this.checkTableHeadings(item);
                    this.addCell(row[item], tr);
                    
                }
            }

            tbody.append(tr);

        });
    }

    addCell(item, tr) {
        const td = document.createElement('td');
        td.textContent = item;
        tr.append(td);
    }

    checkTableHeadings(heading) {
        if(!this.tableHeadings.includes(heading)) {
            this.tableHeadings.push(heading);
            const th = document.createElement('th');
            th.textContent = this.formatHeading(heading);

            this.shadowRoot.querySelector('[part="tableHeadings"]').append(th);
        }
    }

    formatHeading(heading) {
        const result = heading.replace(/([A-Z])/g, " $1");
        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return(finalResult);
    }
}
TableView.define()
