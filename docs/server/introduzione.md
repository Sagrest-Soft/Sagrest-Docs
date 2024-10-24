---
sidebar_position: 0
---

# Introduzione al server locale
Questa soluzione di gestione delle ordinazioni funziona grazie ad un server centrale e indipendente, installato nella rete locale, che coordina tutti i client (le casse) e comunica con il **[server remoto](../online/introduzione)** per la funzione di ordini online.

Il dispositivo sul quale questo server è installato (contrassegnato dall'adesivo `server`) dovrà essere sempre acceso e collegato alla rete per permettere il funzionamento di Sagrest.

È all'intero di questa componente che si possono configurare le informazioni della sagra, gestire i prodotti e i menù e visualizzare i report. Per accedere alla pagina di configurazione, visitare la pagina [https://sagrest.local](https://sagrest.local/).

## Interfaccia
![](/img/server/interface.png)
L'interfaccia di Sagrest è stata progettata per essere intuitiva e facile da usare. Attraverso di essa, gli operatori possono gestire tutte le funzionalità del sistema in modo efficiente. L'interfaccia principale offre accesso rapido alle sezioni più utilizzate, come la gestione dei prodotti, la configurazione dei menù e la visualizzazione dei report.  
Ogni sezione è organizzata in modo logico, con menu e sottomenu che guidano l'utente attraverso le varie operazioni. Inoltre, l'interfaccia è responsive, il che significa che può essere utilizzata comodamente sia su dispositivi desktop che su dispositivi mobili.

Nelle prossime sezioni della documentazione, verranno mostrate le funzioni principali del programma, e le principali impostazioni di configurazione del programma.

## Accesso
Per poter accedere alle varie pagine di configurazione, è necessario inserire le credenziali di accesso.  
Queste credenziali sono state fornite dall'installatore del programma e possono essere modificate in qualsiasi momento.

![](/img/server/login.png)  
Per effettuare il login, selezionare l'utente nel campo `Username` e inserire il codice di accesso dell'utente nel campo `PIN`.
Infine, premere il pulsante `Login` per confermare l'accesso.

:::info
Per modificare le credenziali di accesso, registrare nuovi utenti o modificarne i permessi, consultare la sezione [Utenti](utenti.md).
:::

:::danger
Le credenziali di accesso sono personali e riservate, non condividerle con persone non autorizzate.  
Chiunque abbia accesso al server con credenziali di amministratore può modificare le impostazioni del programma ed eliminare i dati della sagra, compresi gli ordini e la contabilità.
:::
