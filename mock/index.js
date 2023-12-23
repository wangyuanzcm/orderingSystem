import { users, menus, powers, roles } from './app-data';

// ID序列
let id_sequence = 1000;

/**
 * 工具 - decode
 * **/
const decode = function (str) {
    if (!str) {
        return str;
    }
    try {
        return decodeURIComponent(str);
    } catch (e) {
        return str;
    }
};

/**
 * 方法
 * **/
// 登录
const onLogin = function (p) {
    const u = users.find(function (item) {
        return item.username === p.username;
    });
    if (!u) {
        return { status: 204, data: null, message: "该用户不存在" };
    } else if (u.password !== p.password) {
        return { status: 204, data: null, message: "密码错误" };
    }
    return { status: 200, data: u, message: "登录成功" };
};
// 获取所有菜单
const getMenus = function (p) {
    return { status: 200, data: menus, message: "success" };
};
// 获取菜单（根据ID）
const getMenusById = function (p) {
    // const p = JSON.parse(request.body);
    let res = [];
    if (p.id instanceof Array) {
        res = menus.filter(function (item) {
            return p.id.includes(item.id);
        });
    } else {
        const t = menus.find(function (item) {
            return item.id === p.id;
        });
        res.push(t);
    }
    return { status: 200, data: res, message: "success" };
};

// 添加新菜单
const addMenu = function (p) {
    // const p = JSON.parse(request.body);
    p.id = ++id_sequence;
    menus.push(p);
    return { status: 200, data: menus, message: "添加成功" };
};
// 修改菜单
const upMenu = function (p) {
    // const p = JSON.parse(request.body);
    const oldIndex = menus.findIndex(function (item) {
        return item.id === p.id;
    });
    if (oldIndex !== -1) {
        const news = Object.assign({}, menus[oldIndex], p);
        menus.splice(oldIndex, 1, news);
        return { status: 200, data: menus, message: "success" };
    } else {
        return { status: 204, data: null, message: "未找到该条数据" };
    }
};
// 删除菜单
const delMenu = function (p) {
    // const p = JSON.parse(request.body);
    const oldIndex = menus.findIndex(function (item) {
        return item.id === p.id;
    });

    if (oldIndex !== -1) {
        const haveChild = menus.findIndex(function (item) {
            return item.parent === menus[oldIndex].id;
        });
        if (haveChild === -1) {
            menus.splice(oldIndex, 1);
            return { status: 200, data: menus, message: "success" };
        } else {
            return { status: 204, data: null, message: "该菜单下有子菜单，无法删除" };
        }
    } else {
        return { status: 204, data: null, message: "未找到该条数据" };
    }
};
// 根据菜单ID查询其下权限
const getPowerByMenuId = function (p) {
    // const p = JSON.parse(request.body);
    const menuId = Number(p.menuId);

    if (menuId) {
        return {
            status: 200,
            data: powers
                .filter(function (item) {
                    return item.menu === menuId;
                })
                .sort(function (a, b) {
                    return a.sorts - b.sorts;
                }),
            message: "success",
        };
    } else {
        return { status: 200, data: [], message: "success" };
    }
};
// 根据权限ID查询对应的权限
const getPowerById = function (p) {
    // const p = JSON.parse(request.body);
    let res = [];
    if (p.id instanceof Array) {
        res = powers.filter(function (item) {
            return p.id.includes(item.id);
        });
    } else {
        const t = powers.find(function (item) {
            return item.id === p.id;
        });
        res.push(t);
    }
    return { status: 200, data: res, message: "success" };
};
// 添加权限
const addPower = function (p) {
    // const p = JSON.parse(request.body);
    p.id = ++id_sequence;
    powers.push(p);
    return { status: 200, data: { id: p.id }, message: "success" };
};
// 修改权限
const upPower = function (p) {
    // const p = JSON.parse(request.body);

    const oldIndex = powers.findIndex(function (item) {
        return item.id === p.id;
    });
    if (oldIndex !== -1) {
        const news = Object.assign({}, powers[oldIndex], p);
        powers.splice(oldIndex, 1, news);
        return { status: 200, data: { id: p.id }, message: "success" };
    } else {
        return { status: 204, data: null, message: "未找到该条数据" };
    }
};
// 删除权限
const delPower = function (p) {
    const oldIndex = powers.findIndex(function (item) {
        return item.id === p.id;
    });

    if (oldIndex !== -1) {
        powers.splice(oldIndex, 1);
        return { status: 200, data: null, message: "success" };
    } else {
        return { status: 204, data: null, message: "未找到该条数据" };
    }
};
// 查询角色（分页,条件筛选）
const getRoles = function (p) {
    const map = roles.filter(function (item) {
        let yeah = true;
        const title = decode(p.title);
        const conditions = Number(p.conditions);
        if (title && !item.title.includes(title)) {
            yeah = false;
        }
        if (conditions && item.conditions !== conditions) {
            yeah = false;
        }
        return yeah;
    });
    const r = map.sort(function (a, b) {
        return a.sorts - b.sorts;
    });
    const res = r.slice((p.pageNum - 1) * p.pageSize, p.pageNum * p.pageSize);
    return {
        status: 200,
        data: { list: res, total: map.length },
        message: "success",
    };
};
// 查询角色（所有）
const getAllRoles = function (p) {
    return { status: 200, data: roles, message: "success" };
};
// 查询角色（通过角色ID）
const getRoleById = function (p) {
    // const p = JSON.parse(request.body);
    let res = [];
    if (p.id instanceof Array) {
        res = roles.filter(function (item) {
            return p.id.includes(item.id);
        });
    } else {
        const t = roles.find(function (item) {
            return item.id === p.id;
        });
        res.push(t);
    }
    return { status: 200, data: res, message: "success" };
};
// 添加角色
const addRole = function (p) {
    // const p = JSON.parse(request.body);
    p.id = ++id_sequence;
    if (!p.menuAndPowers) {
        p.menuAndPowers = [];
    }
    roles.push(p);
    return { status: 200, data: null, message: "success" };
};
// 修改角色
const upRole = function (p) {
    // const p = JSON.parse(request.body);
    const oldIndex = roles.findIndex(function (item) {
        return item.id === p.id;
    });
    if (oldIndex !== -1) {
        const news = Object.assign({}, roles[oldIndex], p);
        roles.splice(oldIndex, 1, news);
        return { status: 200, data: null, message: "success" };
    } else {
        return { status: 204, data: null, message: "未找到该条数据" };
    }
};
// 删除角色
const delRole = function (p) {
    // const p = JSON.parse(request.body);
    const oldIndex = roles.findIndex(function (item) {
        return item.id === p.id;
    });
    if (oldIndex !== -1) {
        roles.splice(oldIndex, 1);
        return { status: 200, data: null, message: "success" };
    } else {
        return { status: 204, data: null, message: "未找到该条数据" };
    }
};
// 根据角色ID查询该角色所拥有的菜单和权限详细信息
const findAllPowerByRoleId = function (p) {
    // const p = JSON.parse(request.body);
    const t = roles.find(function (item) {
        return item.id === p.id;
    });
    if (t) {
        const res = t.powers.map(function (item, index) {
            const _menu = menus.find(function (v) {
                return v.id === item.menuId;
            });
            const _powers = item.powers.map(function (v) {
                return powers.find(function (p) {
                    return p.id === v;
                });
            });
            _menu.powers = _powers.filter(function (item) {
                return item.conditions === 1;
            });
            return _menu;
        });
        return { status: 200, data: res, message: "success" };
    } else {
        return { status: 204, data: null, message: "未找到该角色" };
    }
};
// 获取所有的菜单及权限数据 - 为了构建PowerTree组件
const getAllMenusAndPowers = function (p) {
    const res = menus.map(function (item) {
        const _menu = item;
        const _powers = powers.filter(function (v) {
            return v.menu === item.id && v.conditions === 1;
        });
        _menu.powers = _powers;
        return _menu;
    });
    return { status: 200, data: res, message: "success" };
};
// 给指定角色分配菜单和权限
const setPowersByRoleId = function (p) {
    // const p = JSON.parse(request.body);
    const oldIndex = roles.findIndex(function (item) {
        return item.id === p.id;
    });
    if (oldIndex !== -1) {
        const pow = p.menus.map(function (item) {
            return { menuId: item, powers: [] };
        });
        // 将每一个权限id归类到对应的菜单里
        p.powers.forEach(function (ppItem) {
            // 通过权限id查询该权限对象
            const thePowerData = powers.find(function (pItem) {
                return pItem.id === ppItem;
            });
            if (thePowerData) {
                const theMenuId = thePowerData.menu;
                if (theMenuId) {
                    const thePow = pow.find(function (powItem) {
                        return powItem.menuId === theMenuId;
                    });
                    if (thePow) {
                        thePow.powers.push(ppItem);
                    }
                }
            }
        });

        roles[oldIndex].menuAndPowers = pow;
        return { status: 200, data: null, message: "success" };
    } else {
        return { status: 204, data: null, message: "未找到该条数据" };
    }
};

// 给指定角色分配菜单和权限
const setPowersByRoleIds = function (ps) {
    ps.forEach(function (p) {
        const oldIndex = roles.findIndex(function (item) {
            return item.id === p.id;
        });
        if (oldIndex !== -1) {
            const pow = p.menus.map(function (item) {
                return { menuId: item, powers: [] };
            });
            // 将每一个权限id归类到对应的菜单里
            p.powers.forEach(function (ppItem) {
                // 通过权限id查询该权限对象
                const thePowerData = powers.find(function (pItem) {
                    return pItem.id === ppItem;
                });
                if (thePowerData) {
                    const theMenuId = thePowerData.menu;
                    if (theMenuId) {
                        const thePow = pow.find(function (powItem) {
                            return powItem.menuId === theMenuId;
                        });
                        if (thePow) {
                            thePow.powers.push(ppItem);
                        }
                    }
                }
            });
            roles[oldIndex].menuAndPowers = pow;
        }
    });
    return { status: 200, data: null, message: "success" };
};

// 条件分页查询用户列表
const getUserList = function (p) {
    const map = users.filter(function (item) {
        let yeah = true;
        const username = decode(p.username);
        const conditions = Number(p.conditions);
        if (username && !item.username.includes(username)) {
            yeah = false;
        }
        if (conditions && item.conditions != conditions) {
            yeah = false;
        }
        return yeah;
    });
    const pageNum = Number(p.pageNum); // 从第1页开始
    const pageSize = Number(p.pageSize);
    const res = map.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    return {
        status: 200,
        data: { list: res, total: map.length },
        message: "success",
    };
};
// 添加用户
const addUser = function (p) {
    // const p = JSON.parse(request.body);
    p.id = ++id_sequence;
    users.push(p);
    return { status: 200, data: null, message: "success" };
};
// 修改用户
const upUser = function (p) {
    // const p = JSON.parse(request.body);
    const oldIndex = users.findIndex(function (item) {
        return item.id === p.id;
    });
    if (oldIndex !== -1) {
        const news = Object.assign({}, users[oldIndex], p);
        users.splice(oldIndex, 1, news);
        return { status: 200, data: null, message: "success" };
    } else {
        return { status: 204, data: null, message: "未找到该条数据" };
    }
};
// 删除用户
const delUser = function (p) {
    // const p = JSON.parse(request.body);
    const oldIndex = users.findIndex(function (item) {
        return item.id === p.id;
    });
    if (oldIndex !== -1) {
        users.splice(oldIndex, 1);
        return { status: 200, data: null, message: "success" };
    } else {
        return { status: 204, data: null, message: "未找到该条数据" };
    }
};

export default function (obj) {
    const url = obj.url;
    const body = obj.body;
    let params = typeof body === "string" ? JSON.parse(body) : body;
    let path = url;

    // 是get请求 解析参数
    if (url.includes("?")) {
        path = url.split("?")[0];
        const s = url.split("?")[1].split("&"); // ['a=1','b=2']
        params = {};

        for (let i = 0; i < s.length; i++) {
            if (s[i]) {
                const ss = s[i].split("=");
                params[ss[0]] = ss[1];
            }
        }
    }
    if (path.includes("http")) {
        path = path.replace(
            globalThis.location.protocol + "//" + globalThis.location.host,
            ""
        );
    }
    console.info("请求接口：", path, params);
    switch (path) {
        case "/api/login":
            return onLogin(params);
        case "/api/getmenus":
            return getMenus(params);
        case "/api/getMenusById":
            return getMenusById(params);
        case "/api/addmenu":
            return addMenu(params);
        case "/api/upmenu":
            return upMenu(params);
        case "/api/delmenu":
            return delMenu(params);
        case "/api/getpowerbymenuid":
            return getPowerByMenuId(params);
        case "/api/getPowerById":
            return getPowerById(params);
        case "/api/addpower":
            return addPower(params);
        case "/api/uppower":
            return upPower(params);
        case "/api/delpower":
            return delPower(params);
        case "/api/getroles":
            return getRoles(params);
        case "/api/getAllRoles":
            return getAllRoles(params);
        case "/api/getRoleById":
            return getRoleById(params);
        case "/api/addrole":
            return addRole(params);
        case "/api/uprole":
            return upRole(params);
        case "/api/delrole":
            return delRole(params);
        case "/api/findAllPowerByRoleId":
            return findAllPowerByRoleId(params);
        case "/api/getAllMenusAndPowers":
            return getAllMenusAndPowers(params);
        case "/api/setPowersByRoleId":
            return setPowersByRoleId(params);
        case "/api/setPowersByRoleIds":
            return setPowersByRoleIds(params);
        case "/api/getUserList":
            return getUserList(params);
        case "/api/addUser":
            return addUser(params);
        case "/api/upUser":
            return upUser(params);
        case "/api/delUser":
            return delUser(params);
        default:
            return { status: 404, data: null, message: "api not found" };
    }
}
