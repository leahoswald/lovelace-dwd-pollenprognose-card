# pollenprognose-card
A Lovelace custom card for [custom component DWD Pollenflug](https://github.com/mampfes/hacs_dwd_pollenflug) in Home Assistant based on the great work of @isabellaalstrom [pollenprognos-card](https://github.com/isabellaalstrom/lovelace-pollenprognos-card) and @TekniskSupport.

<b>You need to manually move the folder `pollen_img` directly inside your `www` folder for the images to appear.</b>

## Installation

For installation instructions [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

## Example usage
Pick the allergens you want to display.

For ui-mode:
```yaml
type: custom:pollenprognose-card
region_desc: Oberrhein und unteres Neckartal
region_id: 111
allergens:
  - Birke
  - Erle
  - Hasel
  - Esche
  - Graeser
  - Roggen
  - Beifuss
  - Ambrosia
```

For yaml-mode:
```yaml
- type: custom:pollenprognose-card
  region_desc: Oberrhein und unteres Neckartal
  region_id: 111
  allergens:
    - Birke
    - Erle
    - Hasel
    - Esche
    - Graeser
    - Roggen
    - Beifuss
    - Ambrosia
```

Usage in a view:
```yaml
title: My awesome Lovelace!
resources:
  - url: /local/pollenprognose-card.js
    type: module
views:
  title: My view
  cards:
- type: custom:pollenprognose-card
  region_desc: Oberrhein und unteres Neckartal
  region_id: 111
  allergens:
    - Birke
    - Erle
    - Hasel
    - Esche
    - Graeser
    - Roggen
    - Beifuss
    - Ambrosia
```

## Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:home-assistant-pollen-card`
| region_desc | string | **Required** | Name of the region, is only used for display in header.
| region_id | string | **Required** | The region id as [defined by DWD](https://opendata.dwd.de/climate_environment/health/alerts/Beschreibung_pollen_s31fg.pdf) (same as in DWD Pollenflug component).
| allergens | list | **Required** | List of allergens for which you have sensors
| title | boolean | **Optional** | Set to `false` to remove the heading from the card
| show_state | boolean | **Optional** | Set to `false` if you don't want to show the state text under the images.
| forecast | boolean | **Optional** | Set to `true` to see the forecast for tomorrow indicated with an additional smaller leaf.

### Example of the card with all allergens presented
![2021-04-23 14_24_23-Admin - Home Assistant](https://user-images.githubusercontent.com/22006797/115870566-b4e91080-a43f-11eb-843e-1f5efbcc2a84.png)


