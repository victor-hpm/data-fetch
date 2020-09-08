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
            infoapi: { type: Array },
            data: { type: Array }
        };
    }

    constructor() {
        super();
        this.infoapi = [];
        this.data = [];
    }

    firstUpdated() {
        fetch('https://rickandmortyapi.com/api/character/')
            .then(response => response.json())
            .then(response => {
                this.infoapi = response.results;
                // console.log('infoapi', this.infoapi);
                this.mapeo();
                // console.log('data', this.data);
            });
        this.dispatchEvent(new CustomEvent('info', { detail: this.data }));
    }

    mapeo() {
        this.infoapi.forEach((cartoon) => {
            this.data.push({
                image: cartoon.image,
                index: cartoon.id,
                name: cartoon.name,
                gender: cartoon.gender,
                location: cartoon.location.name
            });
        });
    }



    // firstUpdated() {
    //     fetch('https://rickandmortyapi.com/api/character/')
    //         .then(response => response.json())
    //         .then(infoapi => {
    //             // console.log('infoapi character', infoapi);
    //             // console.log('infoapi character results', infoapi.results);
    //             this.mapeo(infoapi.results);
    //             // console.log('infoapi card', this.infoapi);
    //         })
    //     this.dispatchEvent(new CustomEvent('info', { detail: this.infoapi }));
    // }

    // mapeo(infoapi) {
    //     infoapi.forEach(element => {
    //         const card = {
    //             image: element.image,
    //             id: element.id,
    //             name: element.name,
    //             gender: element.gender
    //         }
    //         this.infoapi = [...this.infoapi, card]
    //     });
    // }

    render() {
        return html ``;
    }
}