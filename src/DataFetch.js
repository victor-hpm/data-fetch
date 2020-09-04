import { html, css, LitElement } from 'lit-element';

export class DataFetch extends LitElement {
    static get styles() {
        return css `
      :host {
        display: block;
        padding: 25px;
        color: var(--data-fetch-text-color, #000);
      }
    `;
    }

    static get properties() {
        return {
            title: { type: String },
            counter: { type: Number },
            infoapi: { type: Array }
            // individual: { type: Array }
        };
    }

    constructor() {
        super();
        this.title = 'Hey there';
        this.counter = 5;
        this.infoapi = [];
        // this.individual = [];
    }

    // firstUpdated() {
    //     fetch('https://rickandmortyapi.com/api/character/')
    //         .then(response => response.json())
    //         .then(response => {
    //             this.infoapi = response.results;
    //             console.log('infoapi', this.infoapi);
    //             this.mapeo();
    //             console.log('individual', this.individual)
    //         })
    // }

    // mapeo() {
    //     this.infoapi.forEach((image, id, name) => {
    //         this.individual.push({
    //             image: image.image,
    //             index: id.id,
    //             name: name.name
    //         });
    //     });
    // }



    firstUpdated() {
        fetch('https://rickandmortyapi.com/api/character/')
            .then(response => response.json())
            .then(infoapi => {
                // console.log('infoapi character', infoapi);
                // console.log('infoapi character results', infoapi.results);
                this.mapeo(infoapi.results);
                console.log('infoapi card', this.infoapi)
            })
        this.dispatchEvent(new CustomEvent('info', { detail: this.infoapi }));
    }

    mapeo(infoapi) {
        infoapi.forEach(element => {
            const card = {
                image: element.image,
                id: element.id,
                name: element.name,
                gender: element.gender
            }
            this.infoapi = [...this.infoapi, card]
        });
    }


    render() {
        return html `
      <h2>${this.title} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
    }
}