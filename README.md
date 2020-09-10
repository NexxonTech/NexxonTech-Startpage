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
the startpage can be served to your users with a little customization of the .htaccess file:
```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```
