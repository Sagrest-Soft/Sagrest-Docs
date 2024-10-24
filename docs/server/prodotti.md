# Prodotti
![](/img/server/products.png)
In questa sezione è possibile gestire i prodotti registrati all'interno del gestionale.

## Creare un nuovo prodotto
![](/img/server/products_add.png)  
Per creare uno nuovo prodotto, premere il pulsante `Aggiungi prodotto` e compilare il form con i dati richiesti:
- **Nome**: inserire il nome del prodotto
- **Prezzo**: inserire il prezzo del prodotto
- **Categoria**: selezionare la categoria a cui appartiene il prodotto. Se non esiste una categoria adatta, è possibile crearne una nuova premendo il pulsante con il simbolo del `+`.

:::warning
Il nome dei prodotti deve essere **univoco**. Non è possibile creare due prodotti con lo stesso nome.
:::

:::info
Se il prezzo di un prodotto è intero, non è necessario inserire i decimali.
:::

## Modificare un prodotto
Per modificare un prodotto, premere il pulsante di modifica _(matita stilizzata)_ nella riga corrispondente al prodotto che si intende modificare.  
Compilare il form con i dati richiesti e premere il pulsante `Modifica Prodotto` per confermare le modifiche.

## Eliminare un prodotto
Per eliminare un prodotto, premere il pulsante di eliminazione _(cestino stilizzato)_ nella riga corrispondente al prodotto che si intende eliminare.

:::danger
Per eliminare un prodotto, **non devono esserci ordini che lo contengano**.  
Se si tenta di eliminare un prodotto con ordini ancora associati, verrà visualizzato un messaggio di errore e il prodotto non verrà eliminato.  
Prima di eliminare un prodotto, è necessario eliminare gli ordini che lo contengono.
:::
