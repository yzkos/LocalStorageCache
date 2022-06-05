# local-storage-cache

npm:

```shell
npm i local-storage-cache
```

yarn:

```shell
yarn add local-storage-cache
```

usage：

```javascript
import localStorageCache from 'local-storage-cache';

//set string 60s
localStorageCache.set('key1', '11', 60);

//set object 60s
localStorageCache.set('key2', {key: 'val'}, 60);

//get
localStorageCache.get('key1');

//del
localStorageCache.del('key1');
```

simple usage:

```javascript
import {cache} from 'local-storage-cache';

//set
cache('key1', 'val', 60);
cache('key2', {key: 'val'}, 60);

//get
cache('key1');

```
