import { LitElement, PropertyValues, css, html } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import { convertJSONToDTCG, convertZIPToDTCG } from 'style-dictionary/utils';
import { downloadJSON, downloadZIP } from './downloadFile.js';

export class DtcgConvert extends LitElement {
  declare label: string;
  declare childCount: number;
  fileInputRef = createRef();

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `,
    ];
  }

  static get properties() {
    return {
      label: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.label = 'Convert tokens to DTCG';
  }

  errMessage(count: number) {
    return `Only 1 assigned slot element allowed, found ${count}. Try wrapping them in a single parent element.`;
  }

  defaultButtonTemplate() {
    return html`
      <sl-button @click=${this.triggerUpload} variant="primary">${this.label}</sl-button>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.childCount = this.childNodes.length;
    if (this.childCount > 1) {
      throw new Error(this.errMessage(this.childCount));
    }
  }

  async onSlotChange(ev: Event) {
    const assignedNodes = (ev.target as HTMLSlotElement).assignedNodes();
    if (assignedNodes.length === 1) {
      const slottable = assignedNodes[0];
      if (!(slottable instanceof HTMLElement)) {
        throw new Error(
          'Assigned slot element must be instance of HTMLElement, a Text Node is not allowed.',
        );
      }
      slottable.addEventListener('click', this.triggerUpload.bind(this));
    } else {
      throw new Error(this.errMessage(assignedNodes.length));
    }
  }

  render() {
    return html`
      <slot @slotchange=${this.onSlotChange}></slot>
      ${this.childCount === 0
        ? html`<sl-button @click=${this.triggerUpload} variant="primary">${this.label}</sl-button>`
        : ''}
      <input
        ${ref(this.fileInputRef)}
        @change=${this.upload}
        id="upload-tokens-input"
        type="file"
        accept="application/*, text/*"
        aria-hidden="true"
        hidden
      />
    `;
  }

  triggerUpload() {
    const fileInput = this.fileInputRef.value;
    if (fileInput) {
      fileInput.dispatchEvent(new MouseEvent('click'));
    }
  }

  async upload(ev: Event) {
    if (ev.target instanceof HTMLInputElement) {
      const file = ev.target.files?.[0];
      if (file) {
        const today = new Date(Date.now());
        const filename = `dtcg-tokens_${today.getFullYear()}-${today.getMonth()}-${(
          '0' + today.getDate()
        ).slice(-2)}`;

        if (file.type.includes('zip')) {
          const zipBlob = await convertZIPToDTCG(file);
          await downloadZIP(zipBlob, `${filename}.zip`);
        } else if (file.type.includes('json')) {
          const jsonBlob = await convertJSONToDTCG(file);
          await downloadJSON(jsonBlob, `${filename}.json`);
        } else {
          throw new Error('Only ZIP and JSON type uploads are supported.');
        }
      }
    }
  }
}
