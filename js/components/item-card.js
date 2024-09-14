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
                <span part="item-icon"><svg viewBox="0 0 48 48"><path d="M40.62,28.34l-.87-.7A2,2,0,0,1,39,26.08V18A15,15,0,0,0,26.91,3.29a3,3,0,0,0-5.81,0A15,15,0,0,0,9,18v8.08a2,2,0,0,1-.75,1.56l-.87.7a9,9,0,0,0-3.38,7V37a4,4,0,0,0,4,4h8.26a8,8,0,0,0,15.47,0H40a4,4,0,0,0,4-4V35.36A9,9,0,0,0,40.62,28.34ZM24,43a4,4,0,0,1-3.44-2h6.89A4,4,0,0,1,24,43Zm16-6H8V35.36a5,5,0,0,1,1.88-3.9l.87-.7A6,6,0,0,0,13,26.08V18a11,11,0,0,1,22,0v8.08a6,6,0,0,0,2.25,4.69l.87.7A5,5,0,0,1,40,35.36Z"/></svg></span>
                <label part="item-label">Alarm</label>
                <span part="item-content"></span>
            </p>
            <p part="item-battery">
                <span part="item-icon"><svg viewBox="0 0 512 512"><path d="M469.9,192H433v-54c0-5.5-4.3-10-9.9-10H42.1c-5.6,0-10.1,4.5-10.1,10v236c0,5.5,4.5,10,10.1,10h381.1c5.5,0,9.9-4.5,9.9-10  v-54h36.9c5.6,0,10.1-4.5,10.1-10V202C480,196.5,475.5,192,469.9,192z M448,288h-14.8H401v32v32h-49l-32-192h81v32v32h32.2H448V288z  "/></svg></span>
                <label part="item-label">
                Battery</label>
                <span part="item-content"></span>
            </p>
            <p part="item-height">
                <span part="item-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M16 7V2.6C16 2.26863 15.7314 2 15.4 2H8.6C8.26863 2 8 2.26863 8 2.6V21.4C8 21.7314 8.26863 22 8.6 22H15.4C15.7314 22 16 21.7314 16 21.4V17M16 7H13M16 7V12M16 12H13M16 12V17M16 17H13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                <label part="item-label">Height</label>
                <span part="item-content"></span>
            </p>
            <p part="item-oxygen">
                <span part="item-icon"><svg fill="none" viewBox="0 0 24 24"><path d="M15.59 13.01C12.35 13.01 9.70996 10.37 9.70996 7.13C9.70996 3.89 12.35 1.25 15.59 1.25C18.83 1.25 21.47 3.89 21.47 7.13C21.47 10.37 18.83 13.01 15.59 13.01ZM15.59 2.75C13.18 2.75 11.21 4.71 11.21 7.13C11.21 9.55 13.17 11.51 15.59 11.51C18.01 11.51 19.97 9.55 19.97 7.13C19.97 4.71 18 2.75 15.59 2.75Z" fill="black"/><path d="M6.36026 20.19C4.25026 20.19 2.53027 18.47 2.53027 16.36C2.53027 14.25 4.25026 12.53 6.36026 12.53C8.47026 12.53 10.1903 14.25 10.1903 16.36C10.1903 18.47 8.47026 20.19 6.36026 20.19ZM6.36026 14.03C5.08026 14.03 4.03027 15.07 4.03027 16.36C4.03027 17.64 5.07026 18.69 6.36026 18.69C7.64026 18.69 8.69028 17.65 8.69028 16.36C8.69028 15.08 7.64026 14.03 6.36026 14.03Z" fill="black"/><path d="M16.6201 22.75C14.7901 22.75 13.3101 21.26 13.3101 19.44C13.3101 17.61 14.8001 16.13 16.6201 16.13C18.4401 16.13 19.9301 17.62 19.9301 19.44C19.9301 21.26 18.4401 22.75 16.6201 22.75ZM16.6201 17.62C15.6201 17.62 14.8101 18.43 14.8101 19.43C14.8101 20.43 15.6201 21.24 16.6201 21.24C17.6201 21.24 18.4301 20.43 18.4301 19.43C18.4301 18.44 17.6201 17.62 16.6201 17.62Z" fill="black"/></svg></span>
                <label part="item-label">Oxygen</label>
                <span part="item-content"></span>
            </p>
            <p part="item-speed">
                <span part="item-icon"><svg fill="none" viewBox="0 0 20 20"><path d="M2.03232 10.8235C3.30375 7.4536 6.11499 5.00001 10 5C10 5 10 5 10 5C10.9903 5 11.9108 5.15942 12.7539 5.4528C12.6897 5.51683 12.6305 5.5875 12.5775 5.66454L12.1362 6.30501C11.6203 6.15035 11.0742 6.05182 10.5 6.01562V8.5C10.5 8.77614 10.2761 9 10 9C9.72386 9 9.5 8.77614 9.5 8.5V6.01562C7.26102 6.15679 5.44841 7.2458 4.19563 8.91472C4.23196 8.93019 4.26703 8.95025 4.30003 8.975L5.80003 10.1C6.02094 10.2657 6.06571 10.5791 5.90003 10.8C5.73434 11.0209 5.42094 11.0657 5.20003 10.9L3.70003 9.775C3.68303 9.76225 3.66707 9.74862 3.65216 9.73422C3.38855 10.1854 3.15982 10.6679 2.96795 11.1765C2.87047 11.4349 2.582 11.5653 2.32363 11.4678C2.06527 11.3703 1.93485 11.0819 2.03232 10.8235ZM15.2274 7.01399C15.2418 6.9731 15.2544 6.93196 15.265 6.89068C16.4641 7.90487 17.3805 9.26636 17.9679 10.8235C18.0654 11.0819 17.935 11.3703 17.6766 11.4678C17.4183 11.5653 17.1298 11.4349 17.0323 11.1765C16.8404 10.6679 16.6117 10.1853 16.348 9.7341C16.3331 9.74854 16.3171 9.76221 16.3 9.775L14.8 10.9C14.5791 11.0657 14.2657 11.0209 14.1 10.8C13.9343 10.5791 13.9791 10.2657 14.2 10.1L15.7 8.975C15.7331 8.95022 15.7682 8.93015 15.8046 8.91467C15.5325 8.5523 15.2341 8.21726 14.9106 7.91334L15.2274 7.01399ZM14.0228 6.06969C14.2463 6.18305 14.3514 6.44438 14.2685 6.68091L11.6305 14.2119C11.5067 14.5653 11.324 14.8951 11.0901 15.1874C9.9994 16.5509 7.8528 15.3598 8.39971 13.7191C8.49783 13.4247 8.63686 13.1453 8.81259 12.8894L13.3845 6.23255C13.5264 6.02596 13.7993 5.95633 14.0228 6.06969Z" fill="black" /></svg></span>
                <label part="item-label">Speed</label>
                <span part="item-content"></span>
            </p>
            <p part="item-state">
                <span part="item-icon"><svg viewBox="0 0 24 24"><g><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8H8.001L8 20H6V8H2l5-5 5 5zm10 8l-5 5-5-5h4V4h2v12h4z"/></g></svg></span>
                <label part="item-label">State</label>
                <span part="item-content"></span>
            </p>
            <p part="item-temperature">
                <span part="item-icon"><svg viewBox="0 0 256 256"><rect fill="none" height="256" width="256"/><path d="M168,143.3V48a40,40,0,0,0-80,0v95.3A59.4,59.4,0,0,0,68,188a60,60,0,0,0,120,0A59.4,59.4,0,0,0,168,143.3ZM128,24a24.1,24.1,0,0,1,24,24V80H104V48A24.1,24.1,0,0,1,128,24Z"/></svg></span>
                <label part="item-label">Temp.</label>
                <span part="item-content"></span>
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
        this.shadowRoot.querySelector('[part=item-alarm] [part=item-content]').textContent = this.item.alarm;
        this.shadowRoot.querySelector('[part=item-battery] [part=item-content]').innerHTML = this.splitUnit(this.item.battery);
        this.shadowRoot.querySelector('[part=item-height] [part=item-content]').innerHTML = this.splitUnit(this.item.height);
        this.shadowRoot.querySelector('[part=item-oxygen] [part=item-content]').innerHTML = this.splitUnit(this.item.oxygen);
        this.shadowRoot.querySelector('[part=item-speed] [part=item-content]').innerHTML = this.splitUnit(this.item.speed);
        this.shadowRoot.querySelector('[part=item-state] [part=item-content]').textContent = this.item.state;
        this.shadowRoot.querySelector('[part=item-temperature] [part=item-content]').innerHTML = this.splitUnit(this.item.temperature);
    }

    splitUnit(input) {
        const number = input.match(/\d+([\.]\d+)?/g);
        const unit = input.split(number)[1];
        
        const unitHtml = `<span part="content">${number}</span><span part="unit">${unit}</span>`;
        return unitHtml;
    }
}

ItemCard.define()