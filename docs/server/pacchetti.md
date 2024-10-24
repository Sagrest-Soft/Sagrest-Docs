---
sidebar_position: 3
---

# Pacchetti
![](/img/server/bundles.png)
In questa sezione è possibile gestire i pacchetti, ovvero insiemi di prodotti venduti insieme a un prezzo scontato rispetto alla somma dei singoli prodotti.  

In una serata di una sagra a tema panino, ad esempio, è possibile creare un pacchetto `Panino + Bibita` che include un panino e una bibita a un prezzo inferiore rispetto all'acquisto dei due prodotti separatamente.  
*![](/img/server/bundles_example.svg)*  
Continuando con questo esempio, possiamo definire un **pacchetto** come un insieme di **prodotti** venduti insieme a un prezzo scontato, e gli **elementi di un pacchetto** come i gruppi di prodotti che compongono il pacchetto (es. primi, secondi, dolci).  
Non è obbligatorio che tutti gli elementi di un pacchetto siano selezionabili: è possibile rendere obbligatoria la selezione di alcuni elementi e lasciare libera scelta per altri (es. per i dolci o i contorni).

## Creare un nuovo pacchetto
![](/img/server/bundles_add.png)  
Per creare uno nuovo pacchetto, premere il pulsante `Aggiungi pacchetto` e compilare il form con i dati richiesti:
- **Nome**: inserire il nome del pacchetto
- **Categoria**: selezionare la categoria a cui appartiene il pacchetto. Se non esiste una categoria adatta, è possibile crearne una nuova premendo il pulsante con il simbolo del `+`.
- **Costo del pacchetto**: è possibile selezionare 2 diverse modalità per il calcolo del prezzo del pacchetto:
  - **Prezzo fisso**: inserire nel campo successivo il prezzo fisso del pacchetto. Il cliente pagherà sempre questo prezzo, indipendentemente dal prezzo dei prodotti inclusi nel pacchetto.
  - **Somma prezzi prodotti selezionati**: il prezzo del pacchetto sarà uguale alla somma dei prezzi dei prodotti inclusi nel pacchetto, con applicato uno sconto **opzionale** che si può selezionare nei campi successivi. (lo sconto può essere espresso *in **percentuale** o in **valore***) 

:::warning
Il nome dei pacchetti deve essere **univoco**. Non è possibile creare due pacchetti con lo stesso nome.
:::

:::info
Se il prezzo fisso di un pacchetto è intero, non è necessario inserire i decimali.
:::

A questo punto, una volta premuto il pulsante di conferma, sarà possibile vedere una nuova riga nella tabella dei pacchetti.  
Per poter aggiungere i prodotti al pacchetto, premere il pulsante di modifica _(matita stilizzata)_ nella riga corrispondente al pacchetto appena creato. Si dovrebbe aprire un banner simile a quello di aggiunta, ma con una nuova sezione per l'aggiunta degli elementi:  
![](/img/server/bundles_elements_empty.png)  
Per aggiungere un nuovo elemento, premere il pulsante `Aggiungi elemento` e compilare il form con i dati richiesti:  
![](/img/server/bundles_add_element.png)  
Dopo aver inserito tutti gli elementi, premere il pulsante `Salva pacchetto` per confermare le creazione del pacchetto.  

### Esempio
Di seguito, un video che mostra la creazione di un pacchetto con 3 elementi:
<video width="100%" controls>
  <source src="/video/server/bundles_add.mp4" type="video/mp4" />
  Il tuo browser non supporta la riproduzione di video. Prova a scaricare il video [qui](/video/server/bundles_add.mp4).
</video>

## Modificare un pacchetto
Per modificare un pacchetto, premere il pulsante di modifica _(matita stilizzata)_ nella riga corrispondente al pacchetto che si intende modificare.  
Compilare il form con i dati richiesti e premere il pulsante `Modifica Pacchetto` per confermare le modifiche.

## Eliminare un pacchetto
Per eliminare un pacchetto, premere il pulsante di eliminazione _(cestino stilizzato)_ nella riga corrispondente al pacchetto che si intende eliminare.

:::danger
Per eliminare un pacchetto, **non devono esserci ordini che lo contengano**.  
Se si tenta di eliminare un pacchetto con ordini ancora associati, verrà visualizzato un messaggio di errore e il pacchetto non verrà eliminato.  
Prima di eliminare un pacchetto, è necessario eliminare gli ordini che lo contengono.
:::
