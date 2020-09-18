# NexxonTech Startpage
Source code of the startpage available on http://start.nexxontech.it

## What's this?
NexxonTech Startpage is a home page suitable for any browser.
Written using Bootstrap and React.JS in a 100% responsive way, NexxonTech Startpage is able to work on any device, desktop or mobile.

## Host me on your server!
To operate, NexxonTech Startpage only needs a web server (like Apache/Nginx).
Once cloned into the server directory with the command
```Sh
git clone https://github.com/NexxonTech/NexxonTech-Startpage.git
```
and built using
```Sh
npm install
npm run build
```
the Start Page can be found in the ```build``` directory and served to your users with a little customization of the .htaccess file:
```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

## Help us to translate and enbetter the application
### Edit the code
If you want to make some changes to the application code you just have to fork thi repository, clone it on you device and edit the files. Than, you can open a Pull Request and we'll evaluate it.
### Translate the application in you language
If you want to translate NexxonTech Startpage you have to follow the same steps of the "Edit code" section, with a difference: you specifically have to copy an existent language file that you can find in ```src/locale/*.locale.js``` in another one with a name written like ```[ISO 639-1 code of the language].locale.js```.
Than, you have to translate the sentences that you can find in it, commit the file and open a Pull Request. It'll be our priority to revision your translation and to include it in the selectable ones.
