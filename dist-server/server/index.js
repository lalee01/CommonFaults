function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
import regeneratorRuntime from "regenerator-runtime";
function _templateObject() {
    var data = _taggedTemplateLiteral([
        "\n    type Post {\n        id: Int\n        title: String\n        model:String\n        description: String\n        postid:String\n        manufacturer:String\n        author:String\n        ytLink:String\n        date:String\n    }\n\n    type login {\n      token:String\n      username: String \n      password: String\n      id: Int\n    }\n\n    type Registrate {\n      username:String\n      password:String\n      rePassword:String\n    }\n\n    type EditPost {\n      title : String\n      description : String\n      postid : String\n    }\n\n    type Query {\n        posts(manufacturer:String , model:String ): [Post]\n        getModels(manufacturer:String): [Post]\n        login(username:String , password:String):[login]\n        post(postid:String):[Post]\n    }\n\n    type Mutation {\n        addPost(title:String , manufacturer:String , model:String , description:String , author:String , ytLink:String ): [Post]\n        addModel(manufacturer:String , model:String): [Post]\n        editPost(title:String , description:String , postid:String):[EditPost]\n        deletePost(postid:String):[Post]\n        reg(username:String,password:String,rePassword:String):[Registrate]\n    }\n  "
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import Knex from "knex";
import "dotenv/config";
import { uid } from "uid";
import cors from "cors";
import bcrypt from "bcrypt";
import { renderPostgresConfig } from "./knexConfig.js";
var saltRounds = 10;
var url = process.env.URL_SERVER;
var corsOptions = {
    origin: url,
    credentials: true
};
var knex = Knex(renderPostgresConfig.local);
var typeDefs = gql(_templateObject());
var resolvers = {
    Query: {
        posts: function() {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_, args) {
                return regeneratorRuntime.wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            _ctx.next = 2;
                            return knex("post").select().modify(function(queryBuilder) {
                                if (args.manufacturer) {
                                    queryBuilder.where("post.manufacturer", args.manufacturer);
                                }
                                if (args.model) {
                                    queryBuilder.where("post.model", args.model);
                                }
                            });
                        case 2:
                            return _ctx.abrupt("return", _ctx.sent);
                        case 3:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee);
            }));
            return function(_, args) {
                return _ref.apply(this, arguments);
            };
        }(),
        post: function() {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_, args) {
                return regeneratorRuntime.wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            _ctx.next = 2;
                            return knex("post").select().where("postid", args.postid);
                        case 2:
                            return _ctx.abrupt("return", _ctx.sent);
                        case 3:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee);
            }));
            return function(_, args) {
                return _ref.apply(this, arguments);
            };
        }(),
        getModels: function() {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_, args) {
                return regeneratorRuntime.wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            _ctx.next = 2;
                            return knex("models").select().where("manufacturer", args.manufacturer).orderBy("model", "asc");
                        case 2:
                            _ctx.next = 4;
                            return _ctx.sent;
                        case 4:
                            return _ctx.abrupt("return", _ctx.sent);
                        case 5:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee);
            }));
            return function(_, args) {
                return _ref.apply(this, arguments);
            };
        }(),
        login: function() {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_, args) {
                var postInfo, userInfo, stringToHash, hash;
                return regeneratorRuntime.wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            postInfo = [
                                {
                                    username: "",
                                    id: 0,
                                    token: ""
                                }
                            ];
                            _ctx.next = 3;
                            return knex("users").select().modify(function(queryBuilder) {
                                return queryBuilder.where("username", args.username);
                            });
                        case 3:
                            userInfo = _ctx.sent;
                            console.log(userInfo);
                            stringToHash = userInfo[0].username + userInfo[0].id;
                            if (bcrypt.compareSync(args.password, userInfo[0].password)) {
                                hash = bcrypt.hashSync(stringToHash, saltRounds);
                                postInfo[0].username = userInfo[0].username;
                                postInfo[0].id = userInfo[0].id;
                                postInfo[0].token = hash;
                            }
                            return _ctx.abrupt("return", postInfo);
                        case 8:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee);
            }));
            return function(_, args) {
                return _ref.apply(this, arguments);
            };
        }()
    },
    Mutation: {
        addPost: function() {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_, args) {
                return regeneratorRuntime.wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            console.log(args);
                            _ctx.next = 3;
                            return knex("post").insert(_objectSpreadProps(_objectSpread({}, args), {
                                postid: uid(15)
                            }));
                        case 3:
                            return _ctx.abrupt("return", _ctx.sent);
                        case 4:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee);
            }));
            return function(_, args) {
                return _ref.apply(this, arguments);
            };
        }(),
        addModel: function() {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_, args) {
                return regeneratorRuntime.wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            _ctx.next = 2;
                            return knex("models").insert(args);
                        case 2:
                            return _ctx.abrupt("return", _ctx.sent);
                        case 3:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee);
            }));
            return function(_, args) {
                return _ref.apply(this, arguments);
            };
        }(),
        editPost: function() {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_, args) {
                return regeneratorRuntime.wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            _ctx.next = 2;
                            return knex("post").where("postid", args.postid).update(args);
                        case 2:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee);
            }));
            return function(_, args) {
                return _ref.apply(this, arguments);
            };
        }(),
        deletePost: function() {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_, args) {
                return regeneratorRuntime.wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            _ctx.next = 2;
                            return knex("post").where("postid", args.postid).del();
                        case 2:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee);
            }));
            return function(_, args) {
                return _ref.apply(this, arguments);
            };
        }(),
        reg: function() {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_, args) {
                var hash, regData;
                return regeneratorRuntime.wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            hash = bcrypt.hashSync(args.password, saltRounds);
                            regData = {
                                username: args.username,
                                password: hash
                            };
                            console.log(args);
                            _ctx.next = 5;
                            return knex("users").insert(regData);
                        case 5:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee);
            }));
            return function(_, args) {
                return _ref.apply(this, arguments);
            };
        }()
    }
};
var server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});
server.start().then(function() {
    var PORT = 3000;
    var app = express();
    server.applyMiddleware({
        app: app
    });
    app.use(cors(corsOptions));
    app.listen(PORT, function() {
        console.log("Server running on port ".concat(PORT));
    });
});
