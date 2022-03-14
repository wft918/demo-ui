
/**
 *  深拷贝
 *  引用数据类型
 */
export function deepClone(source) {
  if(typeof source !== 'object') return source
  const targetObj = source.constructor === Array ? [] : {}
  for(let key in source) {
    if(source.hasOwnProperty(key)) {
      if(source[key] && typeof source[key] === 'object') {
        targetObj[key] = deepClone(source[key])
      } else {
        targetObj[key] = source[key]
      }
    }
  }
  return targetObj
}

export function clearLoginInfo() {
  localStorage.removeItem('_demo_token')
  localStorage.removeItem('_user_name')
}