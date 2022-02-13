const LitElement = customElements.get('home-assistant-main')
  ? Object.getPrototypeOf(customElements.get('home-assistant-main'))
  : Object.getPrototypeOf(customElements.get('hui-view'));
const html = LitElement.prototype.html;

class PollenPrognoseCard  extends LitElement {

  setConfig(config) {
    if (!config.allergens) {
      throw new Error('Please define allergens (list)');
    }
    if (!config.region_desc) {
      throw new Error('Please define region_desc');
    }
    if (!config.region_id) {
      throw new Error('Please define region_id');
    }
    if (config.threshold && (typeof(config.threshold) != 'number')) {
      throw new Error('Threshold must be a number')
    }
    this.config = config;
  }

  render(){
    if(this.sensors.length < 1) {
      console.log("No sensor data not rendering card.")
      return;
    }
    return html
    `
    ${this._renderMinimalStyle()}
    ${this._renderMinimalCard()}

    `
  }

  _renderMinimalCard(){
    return html
    `
    <ha-card>
      ${this.config.title == null || this.config.title == true ?
      html`
      <div class="header">
        <div class="name">
        ${this.header}
        </div>
      </div>`
      : ""
    }
      <div class="flex-container">
        ${this.sensors.map(sensor => html`
        <div class="sensor">
          <p>${sensor.allergen}</p>
          <img src="/local/pollen_img/${sensor.allergen.toLowerCase()}_${!sensor.forecast.state ? 0 : sensor.forecast.state}.svg"/>
          ${this.config.forecast == true
          ? html`<img class="forecast" src="/local/pollen_img/${sensor.allergen.toLowerCase()}_${!sensor.forecast.attributes.state_tomorrow ? 0 : sensor.forecast.attributes.state_tomorrow}.svg"/>`
          : ""}
          ${this.config.show_state == true || this.config.show_state == null
            ? html`<p>${sensor.forecast.state == "unknown" ? sensor.forecast.state : sensor.forecast.attributes.state_today_desc}</p>`
            : ""}
        </div>
      `)}
      </div>
    </ha-card>
    `
  }

  _renderMinimalStyle() {
    return html
    `
    <style>
    ha-card {
      padding: 16px;
    }
    .header {
      padding: 0;
      @apply --paper-font-headline;
      line-height: 40px;
      color: var(--primary-text-color);
      padding: 4px 0 12px;
    }
    td {
      padding: 3px;
      text-align: center;
    }
    .flex-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      text-align: center;
      justify-content: space-evenly;
      align-items: center;
    }
    .sensor {
      margin: 10px;
      flex: 1 1 0;
      flex-direction: column;
      justify-content: space-evenly;
      display: flex;
      align-self: flex-start;
    }
    @supports not (-ms-flex: 1) {
      .flex-container {
        height: auto; /* 2 */
        // min-height: 24em; /* 2 */
      }
    }
    img {
      max-height: 50px;
    }
    .forecast {
      max-height: 25px;
    }
    .sensor {
      display: block;
      min-width: 16.66%;
      flex: 1;
    }
    </style>`
  }

  
  _tryParseInt(str,defaultValue) {
    var retValue = defaultValue;
    if(str !== null) {
        if(str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
  }
  set hass(hass) {
    
    this._hass = hass;
    var sensors = [];

    if (this.config.title == null || this.config.title == true) {
      var header_region = this.config.region_desc
      this.header = `Pollenprognose ${header_region.charAt(0).toUpperCase() + header_region.slice(1)}`;
    }

    const region_id = this.config.region_id;

    const allergens = this.config.allergens;
    for (var i = 0; i < allergens.length; i++) {
      var dict = {};
      dict.allergen = (allergens[i].charAt(0).toUpperCase() + allergens[i].slice(1));
      var allergen = allergens[i].replace(' / ', '_').toLowerCase();

      dict.forecast = hass.states[`sensor.pollenflug_${allergen}_${region_id}`]
      if (dict.forecast.state == "unknown") {
        if (dict.forecast === undefined) continue;
        // var log_text = `A sensor for "${dict.allergen}" is returning unknown, you should probably check your config for that sensor in the custom component.`;
        // console.log(log_text)
      }

      sensors.push(dict)
    }

    this.sensors = sensors;
    this.requestUpdate();
  }

  // @TODO: This requires more intelligent logic
  getCardSize() {
    return 1;
  }
}

class HAPC extends PollenPrognoseCard {} ;
customElements.define('pollenprognose-card', PollenPrognoseCard);
