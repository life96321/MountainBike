// 判断是否为用户和客服的路径以及跳转
export function getRedirectPath({type, avatar}) {
    let url = (type === 'server') ? '/server' : '/rider'
    if (!avatar) {
        url += 'info'
    }
    return url
}

export function getChatId(userId, targetId) {
    return [userId, targetId].sort().join('_')
}