const styles = new CSSStyleSheet()
styles.replaceSync(`
    
`);

document.adoptedStyleSheets = [styles];

const template = document.createElement("template");
template.innerHTML = `
    <div part="item-card"> 
        <p part="item-id">
            <label>ID:</label>
            <span></span>
        </p>
        <div part="item-details">
            <p part="item-latlng">
                <label part="item-label">Location</label>
                <span part="item-lat"></span>,
                <span part="item-lng"></span>
            </p>
            <p part="item-direction">
                <label part="item-label">Direction</label>
                <span></span>
            </p>
            <p part="item-date">
                <label part="item-label">Transmitted at</label>
                <span></span>
            </p>
            <p part="item-sensor">
                <label part="item-label">Sensor ID</label>
                <span></span>
            </p>
        </div>
        <div part="sensor-data">
            <p part="item-alarm">
                <label part="item-label">Alarm</label>
                <span></span>
            </p>
            <p part="item-battery">
                <label part="item-label">Battery</label>
                <span></span>
            </p>
            <p part="item-height">
                <label part="item-label">Height</label>
                <span></span>
            </p>
            <p part="item-oxygen">
                <label part="item-label">Oxygen</label>
                <span></span>
            </p>
            <p part="item-speed">
                <label part="item-label">Speed</label>
                <span></span>
            </p>
            <p part="item-state">
                <label part="item-label">State</label>
                <span></span>
            </p>
            <p part="item-temperature">
                <label part="item-label">Temp.</label>
                <span></span>
            </p>
        </div>
    </div>
`;

export class ItemCard extends HTMLElement {
    static define(tagName = "wt-item-card") {
        customElements.define(tagName, this)
    }

    constructor(item) {
        super();
        this.item = item;
    }

    shadowRoot = this.attachShadow({ mode: "open" });

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles];
        this.shadowRoot.replaceChildren(template.content.cloneNode(true));

        this.shadowRoot.querySelector('[part=item-id] span').textContent = this.item.id;
        this.shadowRoot.querySelector('[part=item-lat]').textContent = this.item.latitude;
        this.shadowRoot.querySelector('[part=item-lng]').textContent = this.item.longitude;
        this.shadowRoot.querySelector('[part=item-direction] span').textContent = this.item.direction;
        this.shadowRoot.querySelector('[part=item-date] span').textContent = this.item.transmittedAt.toLocaleString("en-UK", {});
        this.shadowRoot.querySelector('[part=item-sensor] span').textContent = this.item.sensorId;
        this.shadowRoot.querySelector('[part=item-alarm] span').textContent = this.item.alarm;
        this.shadowRoot.querySelector('[part=item-battery] span').textContent = this.item.battery;
        this.shadowRoot.querySelector('[part=item-height] span').textContent = this.item.height;
        this.shadowRoot.querySelector('[part=item-oxygen] span').textContent = this.item.oxygen;
        this.shadowRoot.querySelector('[part=item-speed] span').textContent = this.item.speed;
        this.shadowRoot.querySelector('[part=item-state] span').textContent = this.item.state;
        this.shadowRoot.querySelector('[part=item-temperature] span').textContent = this.item.temperature;
    }
}

ItemCard.define()