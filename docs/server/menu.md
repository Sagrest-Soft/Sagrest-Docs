---
sidebar_position: 4
---

# Menù
![](/img/server/menus.png)
In questa sezione è possibile gestire i menù registrati all'interno del gestionale.

## Creare un nuovo menù
![](/img/server/menus_add.png)  
Per creare uno nuovo menù, premere il pulsante `Aggiungi menù` e compilare il form con i dati richiesti:
- **Nome**: inserire il nome del menù
- **Data**: selezionare la data nella quale il menù sarà utilizzato. Questo valore non è vincolante per l'utilizzo del menù, ma può essere utile per tenere traccia delle vendite in relazione ai giorni dell'evento. Si può inserire una data nel formato `gg/mm/aaaa` oppure selezionarla dal calendario `(premendo sull'icona del calendario)`.

:::warning
Il nome dei menù deve essere **univoco**. Non è possibile creare due menù con lo stesso nome.
:::

:::warning
Se è presente un menù con nome "**TEST**", questo non sarà conteggiato nel report generale di tutti i menù.  
Per ulteriori informazioni, consultare la sezione [Report](report.md).
:::

Una volta premuto il pulsante di conferma, sarà possibile vedere una nuova riga nella tabella dei menù.  
A questo punto, per poter aggiungere i prodotti al menù, premere il pulsante di modifica _(matita stilizzata)_ nella riga corrispondente al menù appena creato oppure premere sul nome del menù. A questo punto si verrà reindirizzati alla pagina di gestione del menù, simile a quella indicata di seguito:  
![](/img/server/menu_details.png)  


## Aggiunta di prodotti al menù
Per aggiungere un prodotto o un pacchetto al menù, seguire le seguenti istruzioni:
1. Raggiungere la pagina di gestione del menù [(vedi sezione dedicata)](#raggiungere-la-pagina-di-gestione-del-men%C3%B9)
2. Se si vuole aggiungere un prodotto o un pacchetto, premere il pulsante `Aggiungi singolo elemento` e compilare il modulo con i dati richiesti. **La quantità non è necessaria**.
3. Se si vuole aggiungere contemporaneamente più prodotti o pacchetti, premere la lista a discesa sotto al titolo `Elementi`, selezionare il prodotto o il pacchetto desiderato e premere il pulsante `Aggiungi`.
![](/img/server/menu_details_add_bulk.png)

## Modifica delle rimanenze di un prodotto o un pacchetto
Per modificare le rimanenze di un prodotto o un pacchetto all'interno di un menù, raggiungere la pagina di gestione del menù [(vedi sezione dedicata)](#raggiungere-la-pagina-di-gestione-del-men%C3%B9) e inserire un valore nel campo corrispondende, nella colonna "Rimanenti" della tabella, e premere il tasto `Modifica`.  
Per impostare le rimanenze a **illimitate**, inserire il valore `-1` oppure svuotare il campo di inserimento e premere il tasto `Modifica`.  

![](/img/server/menu_details_row.png)

:::info
Per <u>impedire l'ordine online di un prodotto o un pacchetto</u>, abilitare il check "**Nascosto online**" per quell'elemento.
:::

## Raggiungere la pagina di gestione del menù
Per modificare un menù, le rimanenze e gli elementi che contiene, premere il pulsante di modifica _(matita stilizzata)_ nella riga corrispondente al menù che si intende modificare.  

## Eliminare un menù
Per eliminare un menù, premere il pulsante di eliminazione _(cestino stilizzato)_ nella riga corrispondente al menù che si intende eliminare.

:::danger
Per eliminare un menù, **non devono esserci ordini all'interno di esso**.
Se si tenta di eliminare un menù con ordini ancora associati, verrà visualizzato un messaggio di errore e il menù non verrà eliminato.
Prima di eliminare un menù, è necessario eliminare gli ordini che contiene.
:::
