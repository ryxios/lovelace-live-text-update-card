# lovelace-live-text-update-card
A text card for Home Assistant that will call a service as you type.

(This is mainly a proof of concept and may break with Home Assistant updates and some things may not work properly but I will try to add features and iron out the bugs)

Inspired by and uses code from [lovelace-text-input-row](https://github.com/gadgetchnnel/lovelace-text-input-row) by [@gadgetchnnel](https://github.com/gadgetchnnel) and is built for use with [esphome-blekeyboard](https://github.com/dmamontov/esphome-blekeyboard) by [@dmamontov](https://github.com/dmamontov)

## Card Config Options
| Name | Requirement | Description | Default |
|--|--|--|--|
| type | Required | `custom:live-text-update` |
| service | Required | Service root. Ex: `esphome`
| domain | Required | Service domain. Ex: `blekeyboard`
| placeholder | Optional | Text to show when box is empty. Ex: `Search` | `Search`



