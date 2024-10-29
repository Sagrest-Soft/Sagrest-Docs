---
sidebar_position: 10
---

# Amministrazione di sistema
![](/img/server/system.png)  
In questa pagina, è possibile visualizzare le informazioni di diagnostica e modificare lo stato della connessione con il server remoto di ordinazioni online.

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

## Gestione database
Per **esportare** il database, premere il pulsante `Esporta database` e verrà scaricato un file `.db` contenente l'intero database in formato SQLite3.  
Per **importare** un database, premere il pulsante `Importa database` e selezionare il file `.db` da importare. Il file verrà caricato e il database verrà sovrascritto con i dati contenuti nel file.  

:::danger
L'importazione del database **sovrascrive TUTTI i dati presenti** nel database attuale.  
Assicurarsi di aver effettuato un **BACKUP** dei dati prima di procedere con l'importazione.  
Assicurarsi che il file `.db` da importare sia stato esportato da una versione compatibile con quella attuale del gestionale.  
*Per ulteriori informazioni al riguardo, contattare il supporto tecnico.*
:::
