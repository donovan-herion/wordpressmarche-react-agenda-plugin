# React Category Plugin

This plugin provides a filter for the agenda page that runs on a single page.

## Installation

Clone this repo into the mu-plugins folder of your wordpress configuration.

```bash
git clone git@github.com:donovan-herion/wordpressmarche-react-agenda-plugin.git
```

Install all required packages by running the following command

```bash
npm install
```

call the plugin in the load.php file so that it runs on the wordpress site by default.

```bash
require_once WPMU_PLUGIN_DIR . '/react-agenda-plugin/react-agenda-plugin.php';
```

## Usage

```php
get_header();

echo do_shortcode('[react_agenda_plugin]');

get_footer();
```
