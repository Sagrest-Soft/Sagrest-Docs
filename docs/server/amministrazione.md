---
sidebar_position: 10
---

# Amministrazione di sistema
![](/img/server/system.png)  
In questa pagina, è possibile visualizzare le informazioni di diagnostica e modificare lo stato della connessione con il server remoto di ordinazioni online.

## Gestione client connessi
Se i client di cassa sono accesi e collegati alla rete locale, in questa sezione verranno mostrati in un'apposita lista.
![](/img/server/system_clients_connected.png)  
Premendo l'apposito pulsante `Disconnetti`, è possibile disconnettere forzatamente un client di cassa dalla rete locale.  
![](/img/server/system_disconnect_client.png)
:::tip
Se è necessario svolgere modifiche veloci ai prodotti, alle categorie o utilizzare altre funzionalità che vengono disabilitate quando le casse sono connesse al server, è possibile disconnettere forzatamente tutti i client di cassa per poter svolgere le modifiche necessarie.
:::

## Gestione ordini online
Dalla sezione in alto a sinistra, è possibile visualizzare lo stato della connessione con il server remoto di ordinazioni online.  
![](/img/server/system_online_status.png)  

### Connessione al server
Attraverso i pulsanti presenti, è possibile effettuare le seguenti operazioni:
- **Connetti**: connette il gestionale al server remoto di ordinazioni online, se era stato precedentemente disconnesso ed il suo utilizzo è stato richiesto per l'evento.
- **Disconnetti**: se connesso, disconnette il gestionale dal server remoto di ordinazioni online. Questo verrà <u>riconnesso automaticamente</u> al prossimo avvio del programma.
- **Disabilita**: disabilita l'utilizzo del server remoto di ordinazioni online per l'evento corrente.  
Questo non si riconnetterà automaticamente, fino alla riattivazione (*tramite tasto "Connetti"*), e verrà mostrata un avviso nella pagina di ordinazione online per indicare l'impossibilità di effettuare ordini online.

:::warning
Durante i momenti di chiusura della casse, per gli eventi di più giorni, è consigliabile utilizzare la funzione "Disabilita" per mostrare in maniera chiara che non è possibile effettuare ordini online, nel caso qualcuno tentasse di accedere al servizio di prenotazione online.
:::

:::info
Il server remoto di ordinazioni online è utilizzato per ricevere ordini online da parte dei clienti.  
Per ulteriori informazioni, visitare la pagina [Ordinazioni online](/docs/online/introduzione).
:::

### Menù selezionato
Utilizzando il selettore di menù, è possibile selezionare il menù attualmente in uso, mostrato all'utente per l'ordinazione online.  
![](/img/server/system_online_menu.png)

:::info
Per rendere impossibile l'ordinazione di un particolare prodotto o pacchetto dal menù online, [modificare l'apposita impostazione nei dettagli del menù, come indicato in questa sezione della documentazione](/docs/server/menu#modifica-delle-rimanenze-di-un-prodotto-o-un-pacchetto).
:::

### Messaggi personalizzati nella pagina di ordinazione online
È possibile aggiungere dei banner personalizzati che verranno mostrati nella pagina di ordinazione online, per comunicare informazioni importanti ai clienti, quali orari di apertura, chiusura temporanea del servizio, avvisi vari, luogo di ritiro dei prodotti, etc.
Sarà possibile inserire messaggi di testo libero, che è possibile arricchire con immagini, link, liste, tabelle e molto altro.  
Questi messaggi potranno essere posizionati in alto, subito sotto il titolo della pagina, oppure in basso, prima della barra per il completamento dell'ordinazione.

Per poter personalizzare questi messaggi, è necessario recarsi nella sezione [`Opzioni`](/docs/server/opzioni) e premere il tasto `Modifica` corrispondente al campo che si vuole modificare, come da esempio riportato in seguito:  
![](/img/server/custom_message_bars_option.png)  
A questo punto, si aprirà un editor di testo avanzato, che permetterà di inserire il messaggio desiderato, con la formattazione voluta.  
![](/img/server/option_richtext_editor_modal.png)  
Nel seguente video, è possibile vedere un esempio di modifica del messaggio nella barra superiore:

import PeertubeVideo from '@site/src/components/PeertubeVideo';

<PeertubeVideo 
  videoId="socq2KRKsmA9kvzkDSmUAv" 
  title="Sagrest - Messaggi personalizzati interfaccia online"
  fallbackVideoPath="/video/server/custom_message_bars.mp4"
/>

## Gestione database
Per **esportare** il database, premere il pulsante `Esporta database` e verrà scaricato un file `.db` contenente l'intero database in formato SQLite3.  
Per **importare** un database, premere il pulsante `Importa database` e selezionare il file `.db` da importare. Il file verrà caricato e il database verrà sovrascritto con i dati contenuti nel file.  

:::danger
L'importazione del database **sovrascrive TUTTI i dati presenti** nel database attuale.  
Assicurarsi di aver effettuato un **BACKUP** dei dati prima di procedere con l'importazione.  
Assicurarsi che il file `.db` da importare sia stato esportato da una versione compatibile con quella attuale del gestionale.  
*Per ulteriori informazioni al riguardo, contattare il supporto tecnico.*
:::
