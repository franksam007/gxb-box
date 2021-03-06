import express from 'express';
import io from 'socket.io';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import fs from 'fs';
import ConnectService from './services/ConnectService';
import gui_config from '../config';

require('debug')('gxb-box:server');
let app = express();
let devMiddleware = null;
let hotMiddleware = null;
let autoOpenBrowser = gui_config.dev.autoOpenBrowser;

app.use(require('connect-history-api-fallback')({
    index: '/',
    rewrites: [
        {
            from: '/^abc$/',
            to: '/'
        },
        {
            from: '/api/*',
            to: function (options) {
                return options.parsedUrl.href;
            }
        }
    ]
}));

if (app.get('env') === 'development') {
    let webpackConfig = require('../build/webpack.dev.conf');
    let compiler = require('webpack')(webpackConfig);

    devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true
    });
    hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: console.log,
        heartbeat: 2000
    });
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({action: 'reload'});
            cb();
        });
    });
    app.use(logger('dev'));
    app.use(devMiddleware);
    app.use(hotMiddleware);

    let staticPath = path.posix.join(gui_config.dev.assetsPublicPath, gui_config.dev.assetsSubDirectory);
    app.use(staticPath, express.static('./static'));
} else {
    app.use(logger('combined'));
    app.use(express.static('./gui'));
}

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '20mb'
}));

const connectedCheck = function (req, res, next) {
    let witnesses = req.query.env === 'production' ? gui_config.build.witnesses : gui_config.dev.witnesses;
    ConnectService.connect(witnesses, false, function (connected) {
        if (connected) {
            next();
        } else {
            res.status(500).send({message: '正在初始化数据,请稍后再试'});
        }
    });
};

app.use('/api', connectedCheck, require('./routes/api'));

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});

/**
 * 启动web服务
 */
let serverStarted = false;
let port = parseInt(process.env.port || '3031');
let startServer = function () {
    if (serverStarted) {
        return;
    }
    serverStarted = true;
    app.set('port', port);
    let server = http.createServer(app);
    let websocket = io(server);
    websocket.on('connection', function (socket) {
        socket.on('message', function (type, data) {
            websocket.emit('message', type, data);
        });
        socket.on('system', function (data) {
            websocket.emit('message', data);
        });
    });
    server.listen(port);
    server.on('error', onError);
    server.on('listening', () => {
        devMiddleware && devMiddleware.waitUntilValid(() => {
            let uri = `http://localhost:${port}`;
            let opn = require('opn');
            if (app.get('env') === 'development' && autoOpenBrowser) {
                opn(uri);
            }
        });
        ConnectService.get_ip_address().then((local_ip) => {
            console.log('公信宝数据盒子配置系统已启动');
            console.log('> 请使用浏览器访问：' + 'http://' + local_ip + ':' + port);
        });
    });
};

const mkdir = function (dirpath, dirname) {
    if (typeof dirname === 'undefined') {
        if (fs.existsSync(dirpath)) {
            return;
        } else {
            mkdir(dirpath, path.dirname(dirpath));
        }
    } else {
        if (dirname !== path.dirname(dirpath)) {
            mkdir(dirpath);
            return;
        }
        if (fs.existsSync(dirname)) {
            fs.mkdirSync(dirpath);
        } else {
            mkdir(dirname, path.dirname(dirname));
            fs.mkdirSync(dirpath);
        }
    }
};

/**
 * 初始化连接
 */
let initConnection = function () {
    console.log('检查配置文件...');
    // 检查配置文件
    mkdir(path.resolve(process.cwd(), './dist/config'));
    let config_path = path.resolve(process.cwd(), './dist/config/config.json');
    fs.exists(config_path, function (exists) {
        if (exists) {
            startServer();
        } else {
            try {
                let _config = {};
                fs.writeFileSync(config_path, JSON.stringify(_config));
                startServer();
            } catch (ex) {
                console.error('获取配置信息失败,请检查:\n 请确认配置文件以及读写权限 \n', ex);
            }
        }
    });
};

/**
 * 首次连接
 */
initConnection();

/**
 * Event listener for HTTP server "error" event.
 */
function onError (error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

process.stdin.resume();

function exitHandler (reason, err) {
    if (err) console.log(err.stack);
    console.log('程序退出:', reason);
    process.exit();
}

// do something when app is closing
process.on('exit', exitHandler.bind(null, 'exit'));

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, 'SIGINT'));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, 'uncaughtException'));
