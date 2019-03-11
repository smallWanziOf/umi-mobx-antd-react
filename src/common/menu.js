/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
    return reg.test(path);
}

const menuData = [
    {
        name: '采购管理',
        icon: 'database',
        path: 'procurement',
        children: [
            {
                name: '采购计划单',
                path: 'planOrder',
            },{
                name: '采购单',
                path: 'orderList'
            }
        ],
    },
    {
        name: '供应商管理',
        icon: 'solution',
        path: 'supplierManage',
        children: [
            {
                name: '供应商名单',
                path: 'supplierList',
            }
        ],
    },
    {
        name: '商品管理',
        icon: 'appstore',
        path: 'productManage',
        children: [
            {
                name: '商品信息',
                path: 'productList',
            }
        ],
    }
];

function formatter(data, parentPath = '/', parentAuthority) {
    return data.map(item => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority,
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);
