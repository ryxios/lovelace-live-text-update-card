class LiveTextUpdate extends Polymer.Element {

  set hass(hass) {
    this._hass = hass;
    const domain = this._config.domain
    const service = this._config.service
  }

  ready() {
    super.ready();
    //this.$.textinput.addEventListener('click', ev => ev.stopPropagation());
    this.$.textinput.addEventListener('keyup', keyCode => keyCode);
  }

  setConfig(config) {
    if (!config.service) {
      throw new Error('You need to define a service');
    }
    if (!config.domain) {
      throw new Error('You need to define a domain');
    }
    this._config = config;
  }

  callService() {
    const newValue = globalThis.$.keyValue;
    const serviceData = {
      delay_ms: 0,
      is_combination: false,
      message: newValue,
    };
    this._hass.callService(this._config.domain, this._config.service, serviceData);
  }

  keyPress(keyEvent) {
    globalThis.$.currentKey = keyEvent.key
    var preventCharacterRepeat = keyEvent.key

      if (keyEvent.key == "Backspace") {
        globalThis.$.keyValue = "KEY_BACKSPACE"
        this.callService()
      }

      else if (keyEvent.key == "Enter") {
        globalThis.$.keyValue = "KEY_RETURN"
        this.callService()
      }

      else if (keyEvent.key == "Shift") {
        void 0
      }
  }

  textInput() {
    /*var clearButton = this.$.clearButton
    clearButton.style.display = "block"*/
    var preventCharacterRepeat = globalThis.$.currentKey
    const newValue = this.$.textinput.value;
    var lastCharacter = newValue.slice(-1);
  
      if (newValue.length == 0 || preventCharacterRepeat == "Backspace") {
            //clearButton.style.display = "none"
      }
  
      else if (newValue.length != 0 || preventCharacterRepeat != "Backspace") {
        globalThis.$.keyValue = lastCharacter
        this.callService()
      }
  }

  clearText(){
    this.$.textinput.value = ""
    /*var clearButton = this.$.clearButton
    clearButton.style.display = "none"*/
  };

  static get template() {
    return Polymer.html`
      <paper-input
          label="[[label]]"
          value="[[value]]"
          minlength="[[minlength]]"
          maxlength="[[maxlength]]"
          autoValidate="[[pattern]]"
          pattern="[[pattern]]"
          type="[[mode]]"
          on-keydown="keyPress"
          on-input="textInput"
          id="textinput"
          placeholder=""
          <div prefix>$</div>
          <ha-icon-button id="clearButton" slot="suffix" on-click="clearText">
          <ha-icon icon="mdi:close"></ha-icon>
          </ha-icon-button>
        ></paper-input>
    `;
  }

  
}

customElements.define('live-text-update', LiveTextUpdate);
