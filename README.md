# local-storage-cache

#### npm:

```shell
npm install simple-lscache
```

#### yarn:

```shell
yarn add simple-lscache
```

#### usage：

```javascript
import lscache from 'simple-lscache';

//set string 60s
lscache.set('key1', '11', 60);

//set object 60s
lscache.set('key2', {key: 'val'}, 60);

//get
lscache.get('key1');

//del
lscache.del('key1');
```

#### simple usage:

```javascript
import {cache} from 'simple-lscache';

//set
cache('key1', 'val', 60);
cache('key2', {key: 'val'}, 60);

//get
cache('key1');

```
