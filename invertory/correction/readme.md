## Query

Vous bénéficiez de toute la syntaxe de MongoDB pour effectuer des requêtes. Par exemple si l'on souhaite récupérer uniquement les produits dont la quantité est supérieure ou égale à 100 on écrira :

```js
const companiesHighStock = await ProductModel.find({ qty: { $gte: 100 } });
```

Rappels de syntaxe MongoDB.

```js
// plus grand que
$gt, $gte;

// Plus petit que
$lt, $lte;

// collection inventory  quantité < 20
db.inventory.find({ quantity: { $lt: 20 } });
```

D'autres filtres :

```js
// différent de
$ne
"number" : {"$ne" : 10}

// fait partie de ...
$in, $nin
"notes" : {"$in" : [10, 12, 15, 18] }
"notes" : {"$nin" : [10, 12, 15, 18] }

// Ou
$or
"$or" : [
  { "notes" : { "$gt" : 10 } },
  { "notes" : { "$lt" : 5  } }
]
// and
$and
"$and" : [
  { "notes" : { "$gt" : 10 } },
  { "notes" : { "$lt" : 5  } }
]

// négation
$not
"notes" : {"$not" : {"$lt" : 10} }

// existe
$exists
"notes" : {"$exists" : true}

// tous les documents qui possède(nt) la propriété level
db.inventory.find( { level : { $exists: true } } )

// tous les documents qui ne possède(nt) pas la propriété level
db.inventory.find( { level : { $exists: false } } )

// test sur la taille d'une liste
$size
"notes" : {"$size" : 4}

// element match

/*
{
    "content" : [
        { "name" : <string>, year: <number>, by: <string> }
        ...
    ]
}
*/

{ "content": { $elemMatch: { "name": "Turing Award", "year": { $gt: 1980 } } } }

// recherche avec une Regex simple
$regex
{ "name": /^A/  }

```

Vous pouvez également ordonner les résultats en fonction d'un champ du document avec 1 et -1 pour respectivement croissant et décroissant.

```js
await ProductModel.find({ qty: { $gte: 20 } }).sort({ qty: -1 }); // Par ordre de quantité décroissant
```

## Mise à jour

Les méthodes de modification vous permettent facilement de mettre à jour les documents :

Exemples :

1. Update unique : ne modifie que le 1er document trouvé qui correspond à la requête

```js
await ProductModel.updateOne({ society: "Alex" }, { $set: { qty: 1000 } });
```

2. Update multiple : modifie TOUS les documents trouvés qui correspondent à la requête

```js
await ProductModel.updateMany({ qty: 100 }, { $set: { qty: 200 } });
```

## Suppression

Les modèles Mongoose disposent également des méthodes de suppression :

```js
ProductModel.deleteOne({ name: "Alex" }); // Supprime le 1er document trouvé

ProductModel.deleteMany({ name: "Alex" }); // Supprime TOUS les documents trouvés
```

---

## 02 Exercice shop

Récupérez le fichier `Product.js`, et vérifiez que les données sont toujours présentes dans la base `shop`.

Mettez en place une petite API pour interroger ces données. Cette application retournera uniquement du JSON. Vous installerez un serveur Node.js Express avec ce que vous avez déjà vu en cours.

Voici les endpoints API que l'on souhaiterait mettre en place :

- / => Sur l'adresse principale on peut afficher la statistique des contenus : combien de document en tout (JSON)

- /all => Tous les noms des entreprises avec leurs quantitées respectives

- /delete/Alex => Supprimez un document donné en fonction du nom de sa société.

- /show/Alice => Affichez les informations d'une société en fonction de son nom.

Vous utiliserez également les mots-clé `async/await` pour manipuler les promesses Mongoose.
