/**
 * 设置数据缓存
 * @param key 缓存key
 * @param val 缓存val
 * @param time 缓存时间（秒） 默认 1 小时；如果 time === 0 则默认没有过期时间
 */
const setCache = (key, val = "", time = 60 * 60) => {
    let timestamp = (new Date()).valueOf();
    if (time === 0) {
        uni.setStorageSync(key, val);
    } else {
        uni.setStorageSync(key, {
            data: val,
            expiration_time: timestamp + time * 1000
        });
    }

    return true;
}

/**
 * 获取缓存
 * @param key 缓存key
 */
const getCache = key => {
    let timestamp = (new Date()).valueOf();
    try {
        let val = uni.getStorageSync(key);
        if (val.expiration_time === undefined) {
            //没有过期时间
            return val;
        } else if (val.expiration_time >= timestamp) {
            //数据没有过期
            return val.data;
        } else {
            //已过期，清除之前缓存
            uni.removeStorageSync(key);
            return null;
        }
    } catch (e) {
        return null;
    }
}

/**
 * 数据缓存函数
 * @param key 缓存key
 * @param val 缓存val
 * @param time 缓存时间 默认 1 小时
 */
const cache = (key, val = "", time = 3600) => {
    if (val === "") {
        return getCache(key);
    } else {
        return setCache(key, val, time)
    }
}

export default cache
