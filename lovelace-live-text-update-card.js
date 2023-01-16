class LiveTextUpdate extends Polymer.Element {

  set hass(hass) {
    this._hass = hass;
    const service = this._config.service
    const entity = this._config.entity
    const placeholder = this._config.placeholder
    const placeholder_enabled = this._config.placeholder_enabled
    const clear_button_enabled = this._config.clear_button_enabled
    
  }

  ready() {
    super.ready();
    this.computeServiceData()
    this.$.textinput.addEventListener('keyup', keyCode => keyCode);

    var placeholder_enabled = this._config.placeholder_enabled
    var placeholder = this._config.placeholder
    var clear_button_enabled = this._config.clear_button_enabled
    var clearButton = this.$.clearButton

    if (placeholder == undefined) {
        if (placeholder_enabled == true) {
          this.$.textinput.placeholder = "Search"
        }
        else if (placeholder_enabled == undefined){
          this.$.textinput.placeholder = "Search"
        }
        else if (placeholder_enabled == false) {
          this.$.textinput.placeholder = ""
        }
    }

    else if (placeholder != undefined && placeholder_enabled == true){
        this.$.textinput.placeholder = this._config.placeholder
    }

    if (clear_button_enabled == true || clear_button_enabled == undefined){
      clearButton.style.visibility = "hidden"
    }

    else if (clear_button_enabled == false) {
      clearButton.style.display = "none"
    }

  }

  setConfig(config) {
      if (!config.service) {
        throw new Error('You need to define a service');
      }

      if (!config.entity) {
        throw new Error('You need to define a entity');
      }

      /*if (config.service.indexOf('.') == -1) {
        throw new Error('You need to define a service');
      }*/

      if (config.placeholder_enabled == undefined && config.placeholder != undefined) {
        throw new Error('You need to enable placeholder');
      }

      if (config.placeholder_enabled != true && config.placeholder_enabled != false && config.placeholder_enabled != undefined) {
        throw new Error('"placeholder_enabled" must be a Boolean')
      }

      if (config.clear_button_enabled != true && config.clear_button_enabled != false && config.clear_button_enabled != undefined) {
        throw new Error('"clear_button_enabled" must be a Boolean')
      }


    this._config = config;
  }

  computeServiceData() {
    var fullServiceString = this._config.service
    const serviceArray = fullServiceString.split(".")
    this.$.service_root = serviceArray[0]
    this.$.domain = serviceArray[1]
  }

  callService() {
    var service_root = this.$.service_root
    var domain = this.$.domain
    const newValue = this.$.keyValue;
    const serviceData = {
      "entity_id": this._config.entity,
      "media_content_type": "send_text",
      "media_content_id": newValue
    }};

    this._hass.callService(service_root, domain, serviceData);
  }

  showClearButton() {
    var clear_button_enabled = this._config.clear_button_enabled
    var clearButton = this.$.clearButton

    if (clear_button_enabled == true || clear_button_enabled == undefined) {
      clearButton.style.visibility = "visible" 
    }

    else if (clear_button_enabled == false) {    
    }
  }

  hideClearButton() {
    var clear_button_enabled = this._config.clear_button_enabled
    var clearButton = this.$.clearButton

    if (clear_button_enabled == true || clear_button_enabled == undefined) {
      clearButton.style.visibility = "hidden" 
    }

    else if (clear_button_enabled == false) {
    }
  }

  clearText() {
    var clear_button_enabled = this._config.clear_button_enabled

    if (clear_button_enabled == false) {
      this.$.textinput.value = ""
    }

    else if (clear_button_enabled == true || clear_button_enabled == undefined) {
      this.hideClearButton()
      this.$.textinput.value = ""
    }
  };

  keyPress(keyEvent) {
    this.$.currentKey = keyEvent.key
    var preventCharacterRepeat = keyEvent.key

      if (keyEvent.key == "Backspace") {
        this.$.keyValue = "KEY_BACKSPACE"
        this.callService()
      }

      else if (keyEvent.key == "Enter") {
        this.$.keyValue = "KEY_RETURN"
        this.callService()
        this.clearText()
      }

      else if (keyEvent.key == "Shift") {
        void 0
      }
  }

  textInput() {
    this.showClearButton()
    var preventCharacterRepeat = this.$.currentKey
    const newValue = this.$.textinput.value;
    var lastCharacter = newValue.slice(-1);

    if (newValue.length == 0 && preventCharacterRepeat == "Backspace") {
      this.hideClearButton()
    }
    
    else if (newValue.length != 0 && preventCharacterRepeat != "Backspace") {
      this.$.keyValue = lastCharacter
      this.callService()
    }
}

  

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
          placeholder=""
          on-keydown="keyPress"
          on-input="textInput"
          id="textinput"
          <div prefix>$</div>
          <ha-icon-button id="clearButton" slot="suffix" on-click="clearText">
          <ha-icon icon="mdi:close"></ha-icon>
          </ha-icon-button>
        ></paper-input>
    `;
  }

  
}

customElements.define('live-text-update', LiveTextUpdate);
