# NexxonTech Startpage
Source code of the startpage available on http://start.nexxontech.it

## What's this?
NexxonTech Startpage is a home page suitable for any browser.
Written using Bootstrap in a 100% responsive way, NexxonTech Startpage is able to work on any device, desktop or mobile.

## Host me on your server!
To operate, NexxonTech Startpage only needs a web server (Apache/Nginx) and PHP.
Once cloned into the server directory with the command
```Sh
git clone https://github.com/NexxonTech/NexxonTech-Startpage.git
```
simply modify some `config.template` parameters and save it as `config.php` to see the system fully functional.
- **$homeName**: This variable determines the brand to be shown at the top left of the page. You can also use HTML code
- **$dafaultLang**: Default startpage language
- **$clientId**: Since Nexxontech Startpage uses the Unsplash API, you need to insert your client id in this variable.
- **$cat**: The ID of the Unsplash category from which to retrieve images. By entering the number 9039753 it is possible to use the database directly maintained by Riccardo Sacchetto.
- **$fallbackAuthor**: The name of the author of the fallback image (The image that is shown in case the Unsplash API is not available)
- **$fallbackAuthorUrl**: The URL of the Unsplash profile (like https://unsplash.com/@occhioverde03) of the author of the fallback image (The image that is shown in case the API of Unsplash is not available)
- **$defaultFavs**: Bookmarks to show to new users; this variable is an array structured like "[Favorite name]" => "[URL without http:// or https://]"