# Multi filter plugin for SigmaJS


This is a plugin for SigmaJS, that provides client-side multifiltering. 

To install the dependancies, run from root folder:
```
npm run postinstall
```
To start the server: 
```
npm run start
```

The ui is now accessible at `http://localhost:3000/index.html

The data should be fed to the ui in the following format:

```
{
    {
        "nodes": [
        {
            "id": "n0",
                "label": "A node",
                "x": 0,
                "y": 0,
                "size": 3,
                "thisNodeBelongsToTheseCategories": ['cat1', 'cat2', 'cat3', 'cat4']
        },
        {
            "id": "n1",
            "label": "Another node",
            "x": 3,
            "y": 1,
            "size": 2,
            "thisNodeBelongsToTheseCategories": ['cat1', 'cat4']
        },
        {
            "id": "n2",
            "label": "And a last one",
            "x": 1,
            "y": 3,
            "size": 1,
            "thisNodeBelongsToTheseCategories": ['cat2', 'cat3', 'cat4']
        }
        ],
        "edges": [
        {
            "id": "e0",
            "source": "n0",
            "target": "n1"
        },
        {
            "id": "e1",
            "source": "n1",
            "target": "n2"
        },
        {
            "id": "e2",
            "source": "n2",
            "target": "n0"
        }
        ]
    }
}
```

A valid data sample is returned by the server at `http://localhost:3000/data'
