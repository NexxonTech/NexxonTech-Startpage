# NexxonTech Startpage
Codice sorgente della startpage disponibile su http://start.nexxontech.it

## Cos'è?
NexxonTech Startpage è una pagina iniziale adatta a qualsiasi browser.
Scritta utilizzando Bootstrap in maniera 100% responsive, NexxonTech Startpage è in grado di funzionare su qualsiasi dispositivo, desktop o mobile che sia.

## Ospitami sul tuo server!
Per funzionare, NexxonTech Startpage necessita soltanto di un server web (Apache/Nginx) e di PHP.
Una volta clonato nella directory del server con il comando
```sh
git clone https://github.com/NexxonTech/NexxonTech-Startpage.git
```
sarà sufficiente modificare qualche parametro di `config.php` per vedere il sistema completamente funzionante.
- **$homeName**: Questa variabile determina il brand da mostrare in alto a sinistra nella pagina. Puoi utilizzare anche del codice HTML
- **$clientId**: Dato che Nexxontech Startpage utilizza la API di Unsplash è necessario inserire in questa variabile il proprio client id.
- **$cat**: L'id della categoria Unsplash da cui recuperare le immagini. Inserendo il numero 9039753 è possibile utilizzare il database curato direttamente da Riccardo Sacchetto.