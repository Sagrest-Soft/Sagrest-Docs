---
sidebar_position: 3
---

# Pacchetti
![](/img/server/bundles.png)
In questa sezione è possibile creare e gestire i “pacchetti”.
Un **pacchetto** può essere definito come un raggruppamento (insieme) di prodotti il cui prezzo complessivo di vendita
risulta scontato e inferiore rispetto alla somma dei prezzi dei singoli prodotti costituenti il suddetto pacchetto.
Un pacchetto permette di personalizzare la scelta e la combinazione dei prodotti che lo costituiscono.  
Tipicamente, un pacchetto è costituito da prodotti appartenenti a categorie diverse (es. primi, secondi, panini, dolci, bibite, etc):
all'interno di ciascuna di tali categorie possono essere presenti varie proposte di prodotti tra cui scegliere.

Si veda il seguente esempio: *Pacchetto “Panino + Bibita”*.  
*![](/img/server/bundles_example.svg)*  

- Il pacchetto “Panino + Bibita”, che include un panino e una bibita, sarà venduto ad un prezzo inferiore rispetto alla somma
dei prezzi di panino e bibita acquistati singolarmente
- *STEP 1*: la categoria/elemento “Panino” consente la scelta tra due tipologie di panino: per esempio
  -	Pane e strinù
  - Panino con porchetta  
  <ins>N.B. è obbligatorio effettuare una scelta tra i due elementi panino proposti per poter procedere</ins>
- *STEP 2*: la categoria/elemento “Bibita” consente la scelta tra quattro tipologie di bibite: esempio
  - Acqua naturale 0,5L
  - Acqua frizzante 0,5L
  - The limone
  - The pesca  
  <ins>N.B. è obbligatorio effettuare una scelta tra i quattro elementi bibita proposti per poter procedere e chiudere il confezionamento del pacchetto</ins>
- Dopo aver scelto i due prodotti costituenti il pacchetto, questo viene aggiunto all'ordine

Oltre ai prodotti da scegliere obbligatoriamente, un pacchetto può presentare elementi la cui scelta sarà **opzionale**:
in tal caso, l'utente può decidere se includere o meno tali elementi nel pacchetto (es. _dolci_, vedi figura sottostante).  
*![](/img/server/bundles_example_optional.svg)*  

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

import PeertubeVideo from '@site/src/components/PeertubeVideo';

<PeertubeVideo 
  videoId="wkya4AbrojqhCiMWwFkBEg" 
  title="Sagrest - Aggiunta pacchetti"
  fallbackVideoPath="/video/server/bundles_add.mp4"
/>

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
