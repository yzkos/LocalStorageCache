const lscache = {};
/**
 * 设置数据缓存
 * @param key 缓存key
 * @param val 缓存val
 * @param time 缓存时间（秒） time === 0 则默认没有过期时间
 */
lscache.set = (key, val, time = 0) => {
    let timestamp = (new Date()).valueOf();
    let item;
    if (time === 0) {
        item = val;
    } else {
        item = {
            data: val,
            expiration_time: timestamp + time * 1000
        };
    }
    if (localStorage != undefined) {
        localStorage.setItem(key, JSON.stringify(item));
    } else if (uni.getStorageSync != undefined) {
        uni.setStorageSync(key, item);
    } else if (wx.setStorageSync != undefined) {
        wx.setStorageSync(key, item);
    }
    return true;
};

/**
 * 获取缓存
 * @param key 缓存key
 */
lscache.get = key => {
    let timestamp = (new Date()).valueOf();
    try {
        let val;
        if (localStorage != undefined) {
            val = JSON.parse(localStorage.getItem(key));
        } else if (uni.getStorageSync != undefined) {
            val = uni.getStorageSync(key);
        } else if (wx.getStorageSync != undefined) {
            val = wx.getStorageSync(key);
        }
        if (val.expiration_time === undefined) {
            //没有过期时间
            return val;
        } else if (val.expiration_time >= timestamp) {
            //数据没有过期
            return val.data;
        } else {
            //已过期，清除之前缓存
            del(key);
            return null;
        }
    }
    catch (e) {
        return null;
    }
};

/**
 * 删除缓存
 * @param key 缓存key
 */
lscache.del = key => {
    if (localStorage != undefined) {
        localStorage.removeItem(key);
    } else if (uni.removeStorageSync != undefined) {
        uni.removeStorageSync(key);
    } else if (wx.removeStorageSync != undefined) {
        wx.removeStorageSync(key);
    }
};

export default lscache;

/**
 * 简单调用函数
 * @param key 缓存key
 * @param val 缓存val
 * @param time 缓存时间 默认 1 小时
 */
export const cache = (key, val = '', time = 3600) => {
    if (val === '') {
        return lscache.get(key);
    } else {
        return lscache.set(key, val, time);
    }
};
