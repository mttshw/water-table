export class TableDataLoadedEvent extends Event {
    constructor(dataLength) {
        super('table-data-loaded-event', {bubbles: true, composed: true});
        this.dataLength = dataLength;
    }
}
export class UpdatePaginationEvent extends Event {
    constructor(page) {
        super('update-pagination-event', {bubbles: true, composed: true});
        this.page = page;
    }
}

