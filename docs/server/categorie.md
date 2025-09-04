---
sidebar_position: 1
---

# Categorie
![](/img/server/categories.png)
In questa sezione è possibile gestire le categorie dei prodotti e dei pacchetti.
Le categorie sono utilizzate per organizzare i prodotti in modo logico e facilitare la ricerca e la selezione da parte degli operatori di cassa.

## Creare una nuova categoria
![](/img/server/categories_add.png)  
Per creare una nuova categoria, premere il pulsante `Aggiungi categoria` e compilare il form con i dati richiesti:
- **Nome**: inserire il nome della categoria
- **Colore**: selezionare il colore della categoria. Per applicare questo colore, attivare l'opzione `Imposta colore alla categoria`. Questo colore verrà utilizzato per evidenziare i prodotti appartenenti a questa categoria nell'interfaccia di cassa.  
Se non viene selezionato alcun colore o si disattiva la spunta, la categoria verrà visualizzata con il colore predefinito.

:::warning
Il nome delle categorie deve essere **univoco**. Non è possibile creare due categorie con lo stesso nome.
:::

:::info
Se la categoria mostra una barra colorata accanto al nome, significa che è selezionata come "consigliata".  
Esempio:  
![](/img/server/categories_suggested.png)  
Se in un [menu](/docs/server/menu) sono presenti prodotti appartenenti a categorie consigliate, il software ricorderà all'utente di selezionare almeno un prodotto da queste categorie prima di completare l'ordine (sia che questo venga effettuato in cassa sia tramite l'ordine online).  
Questa funzione è utile per ricordare all'utente di includere elementi essenziali nell'ordine, ad esempio per conteggiare nel costo totale il coperto o l'eventuale asporto.
:::

:::warning
Le categorie *"consigliate"* **NON** sono obbligatorie. L'utente (sia colui che effettua l'ordine online sia l'operatore di cassa) può decidere di non selezionare alcun prodotto da queste categorie e completare comunque l'ordine (ignorando l'avviso mostrato a schermo).
:::

## Riordinare le categorie
Utilizzando l'apposito pulsante di trascinamento _(tre linee orizzontali)_ è possibile modificare l'ordine di visualizzazione delle categorie nell'interfaccia di cassa.  
Trascinare la categoria desiderata nella posizione voluta e rilasciare il pulsante del mouse per confermare la nuova posizione.
![](/img/server/categories_reorder.gif)

## Modificare una categoria
Per modificare una categoria, premere il pulsante di modifica _(matita stilizzata)_ nella riga corrispondente alla categoria che si intende modificare.  
Compilare il form con i dati richiesti e premere il pulsante `Modifica Categoria` per confermare le modifiche.

## Eliminare una categoria
Per eliminare una categoria, premere il pulsante di eliminazione _(cestino stilizzato)_ nella riga corrispondente alla categoria che si intende eliminare.

:::danger
Per eliminare una categoria, **non devono esserci prodotti o pacchetti associati ad essa**.  
Se si tenta di eliminare una categoria con elementi ancora associati, verrà visualizzato un messaggio di errore e la categoria non verrà eliminata.  
Prima di eliminare una categoria, è necessario spostare i prodotti o i pacchetti associati in un'altra categoria o eliminarli.
:::
