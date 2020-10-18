# NexxonTech Startpage

![GitHub](https://img.shields.io/github/license/nexxontech/nexxontech-startpage?style=flat-square)
[![BMAC](https://img.shields.io/badge/Donate-Buy%20Me%20A%20Coffee-orange.svg?style=flat-square)](https://www.buymeacoffee.com/Occhioverde03)

Source code of the StartPage available on http://start.nexxontech.it

## What's this?

NexxonTech StartPage is a home page suitable for any browser.

Written using Bootstrap and React.JS in a 100% responsive way, NexxonTech StartPage is able to work on any device, desktop or mobile.

## Host me on your server!

### Download and build

To operate, NexxonTech StartPage only needs a web server (like Apache/Nginx).
Once cloned into the server directory with the command

```Sh
git clone https://github.com/NexxonTech/NexxonTech-Startpage.git
```

and built using

```Sh
npm install
npm run build
```

the StartPage can be found in the `build` directory and served to your users with a little customization of the .htaccess file:

```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

### Change default settings

Every default setting is picked from `src/config/default.js`.

If you want to present the StartPage to your users with different bookmarks or settings then those set by us, you can edit that file prior to running `npm run build`.

## Help us to translate and improve the application

### Edit the code

If you want to make some changes to the application code you just have to fork this repository, clone it on you device and edit the files. Then, you can open a Pull Request and we'll evaluate it.

### Translate the application in your language

If you want to translate NexxonTech StartPage you have to follow the same steps of the "Edit code" section, with a difference: you specifically have to copy an existent language file that you can find in `src/locale/*.locale.js` in another one with a name written like `[ISO 639-1 code of the language].locale.js`.

Then, you have to translate the sentences that you can find in it, commit the file and open a Pull Request. It'll be our priority to revise your translation and to include it in the selectable ones.
