<style scoped>
    .facolor-info {
        color: #2d8cf0;
    }

    .facolor-success {
        color: #19be6b;
    }

    .facolor-warning {
        color: #ff9900;
    }

    .facolor-error {
        color: #ed3f14;
    }

    .product {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        padding: 30px;
    }

    .spin-container {
        display: inline-block;
        width: 100%;
        height: 100%;
        position: relative;
    }

    .loaded-container {
        width: 100%;
        height: 100%;
    }

    .product-header {
        position: relative;
        min-height: 130px;
        display: flex;
        flex-direction: row;
    }

    .product-tab {
        margin-top: 25px;
        flex: 1;
    }

    .product-icon {
        width: 125px;
        height: 125px;
        border: 1px solid #eee;
        border-radius: 2px;
        padding: 30px;
        position: relative;
        overflow: hidden;
    }

    .product-icon .subscript {
        color: #fff;
        height: 20px;
        width: 80px;
        position: absolute;
        right: -25px;
        top: 5px;
        text-align: center;
        line-height: 20px;
        background-color: #2d8cf0;
        -moz-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .product-icon img {
        width: 100%;
        height: 100%;
    }

    .product-info {
        margin-left: 25px;
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .product-info h2 {
        font-size: 20px;
        line-height: 20px;
        padding: 10px 0;
        color: #555;
    }

    .product-info h2 strong {
        padding-right: 5px;
    }

    .product-info .tag {
        display: inline-block;
        font-size: 12px;
        line-height: 14px;
        vertical-align: top;
        border-radius: 2px;
        font-weight: 400;
        padding: 2px 6px;
        margin-right: 3px;
        color: #2d8cf0;
        border: 1px solid #2d8cf0;
    }

    .product-info .desc {
        line-height: 16px;
        height: 32px;
        overflow: hidden;
        padding: 4px 0 8px;
        color: #9ea7b4;
    }

    .product-info .arguments {
        flex: 1;
        display: flex;
        flex-direction: row;
    }

    .product-info .arguments .argument {
        flex: 1;
        align-self: center;
    }

    .product-info .arguments .border {
        border-right: 1px solid #ddd;
    }

    .product-info .arguments .argument p {
        height: 20px;
        line-height: 20px;
        color: #657180;
    }

    .product-info .arguments .price {
        flex: 2;
        align-self: center;
    }

    .product-info .arguments .price span {
        color: #f0767f;
        font-size: 14px;
        padding-left: 30px;
    }

    .product-tab .simpleline {
        line-height: 20px;
        padding: 12px 0;
        width: 100%;
        overflow: hidden;
        word-break: break-all;
        color: #777;
        border-bottom: 1px dashed #f2f2f2;
    }

    .product-tab .simpleTable {
        border-bottom: 0;
    }

    .product-tab .api_table {
        margin-top: 10px;
        width: 100%;
        font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
        font-size: 12px;
        border-right: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
        border-top: 1px solid #f2f2f2;
    }

    .product-tab .api_table tr.title {
        background: #fbfbfb;
    }

    .product-tab .api_table th {
        text-align: left;
        font-weight: 400;
        border-bottom: 1px solid #f2f2f2;
        color: #657180;
        height: 34px;
        line-height: 34px;
    }

    .product-tab .api_table td {
        line-height: 20px;
        padding: 5px 0;
        border-bottom: 1px solid #f2f2f2;
    }

    .product-tab .api_table .url, .simpleline .url {
        font-family: Georgia, "Times New Roman", Times, serif;
    }

    .product-tab .prediv pre {
        padding: 20px 0 20px 20px;
        margin: 10px 0;
        overflow: hidden;
        border: 1px solid #eee;
        background: #fbfbfb;
        border-radius: 4px;
        color: #657180;
        white-space: pre;
        line-height: 16px;
        display: block;
        font-family: monospace;
    }

    .product-tab .question {
        margin-top: 10px;
    }

    .api-test-modal.product-tab {
        margin-top: 0;
    }

    .api-test-modal h3 {
        margin: 10px 0;
    }

    .api-test-modal .api-test-btn {
        margin-top: 5px;
    }

    .api-test-modal .simpleTable > .ivu-input-wrapper,
    .api-test-modal .simpleTable > .ivu-select {
        margin-top: 10px;
    }

    .api-test-modal .left {
        text-align: left;
    }

    .pre-loading {
        position: relative;
    }

    .warning-tips {
        font-size: 12px;
        font-weight: normal;
        color: #ff8503;
    }
</style>
<template>
    <div class="product">
        <div class="spin-container" v-show="!loaded">
            <Spin fix></Spin>
        </div>
        <div class="loaded-container" v-show="loaded">
            <div class="product-header">
                <div class="product-icon">
                    <div class="subscript" v-if="product_info.privacy">隐私</div>
                    <img :src="product_info.icon">
                </div>
                <div class="product-info">
                    <h2>
                        <strong>{{product_info.product_name}}</strong>
                        <span class="tag">{{product_info.category_name}}</span>
                    </h2>
                    <p class="desc">{{product_info.brief_desc}}</p>
                    <div class="arguments">
                        <div class="argument">
                            <p><strong>数据ID：</strong><span>{{product_info.id}}</span></p>
                            <p><strong>接口状态：</strong><span
                                    :class="product_info.status_class">{{product_info.status}}</span></p>
                        </div>
                        <div class="argument border">
                            <p><strong>当前版本：</strong><span>{{product_info.version}}</span></p>
                            <p v-if="product_info.datasource">
                                <strong>数据源：</strong><span>{{product_info.datasource}}</span></p>
                        </div>
                        <div class="price">
                            <p><span>{{formatterPrice(product_info.price)}} GXC/条</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-tab">
                <Tabs size="small" value="1" :animated="false">
                    <TabPane label="对接说明" name="1">
                        <div class="simpleline"><strong>接口地址：</strong><span
                                class="url">{{product_info.current_url}}</span></div>
                        <div class="simpleline"><strong>请求格式：</strong><span class="url">json</span></div>
                        <div class="simpleline"><strong>请求方式：</strong><span class="url">get post</span></div>
                        <div class="simpleline"><strong>调用样例及调试工具：</strong>
                            <Button type="primary" icon="link" size="small" @click="openApiTest()">API测试工具</Button>
                            <Button type="primary" icon="link" size="small" @click="openDataSourceTest()"
                                    v-if="isSubscribed">数据源测试工具
                            </Button>
                        </div>
                        <div class="simpleline simpleTable">
                            <strong>请求参数说明：</strong>
                            <table class="api_table" border="0" cellspacing="0" cellpadding="0" v-if="currentSchema">
                                <tbody>
                                <tr class="title">
                                    <th width="20"></th>
                                    <th width="100">名称</th>
                                    <th width="80">类型</th>
                                    <th width="60">必填</th>
                                    <th>描述</th>
                                </tr>
                                <tr v-for="(item, key, index) in currentSchema.input" :key="index">
                                    <td>&nbsp;</td>
                                    <td class="url">{{key}}</td>
                                    <td class="url">{{item.type}}</td>
                                    <td class="url">{{item.required ? '是' : '否'}}</td>
                                    <td>{{item.desc}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="simpleline simpleTable">
                            <strong>返回参数说明：</strong>
                            <table class="api_table" border="0" cellspacing="0" cellpadding="0" v-if="currentSchema">
                                <tbody>
                                <tr class="title">
                                    <th width="20"></th>
                                    <th width="100">名称</th>
                                    <th width="80">类型</th>
                                    <th>描述</th>
                                </tr>
                                <tr v-for="(item, key, index) in currentSchema.output" :key="index">
                                    <td>&nbsp;</td>
                                    <td class="url">{{key}}</td>
                                    <td class="url">{{item.type}}</td>
                                    <td>{{item.desc}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </TabPane>
                    <TabPane label="状态码" name="2">
                        <div class="simpleline simpleTable">
                            <strong>业务状态码：</strong>
                            <table class="api_table" border="0" cellspacing="0" cellpadding="0" v-if="currentSchema">
                                <tbody>
                                <tr class="title">
                                    <th width="20"></th>
                                    <th width="200">状态码</th>
                                    <th>描述</th>
                                </tr>
                                <tr v-for="(item, key, index) in currentSchema.code" :key="index">
                                    <td>&nbsp;</td>
                                    <td class="url">{{key}}</td>
                                    <td>{{item}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="simpleline simpleTable">
                            <strong>系统状态码：</strong>
                            <table class="api_table" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                <tr class="title">
                                    <th width="20"></th>
                                    <th width="200">状态码</th>
                                    <th>说明</th>
                                </tr>
                                <tr v-for="(item, key, index) in system_code" :key="index">
                                    <td>&nbsp;</td>
                                    <td class="url">{{key}}</td>
                                    <td>{{item.desc}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </TabPane>
                    <TabPane label="示例代码" name="3">
                        <div class="simpleline simpleTable">
                            <strong>入参示例：</strong>
                            <div class="prediv">
                                <pre v-if="sampleInput">{{JSON.stringify(sampleInput, null, '  ')}}</pre>
                            </div>
                        </div>
                        <div class="simpleline simpleTable">
                            <strong>返回示例：</strong>
                            <div class="prediv">
                                <pre v-if="sampleOutput">{{JSON.stringify(sampleOutput, null, '  ')}}</pre>
                            </div>
                        </div>
                        <div class="simpleline simpleTable">
                            <strong>代码示例：</strong>
                            <Tabs size="small" value="cURL" :animated="false">
                                <TabPane label="cURL" name="cURL">
                                    <div class="prediv">
                                        <pre>{{product_info.curl_code}}</pre>
                                    </div>
                                </TabPane>
                                <TabPane label="Java" name="Java">
                                    <div class="prediv">
                                        <pre>{{product_info.java_code}}</pre>
                                    </div>
                                </TabPane>
                                <TabPane label="Node" name="Node">
                                    <div class="prediv">
                                        <pre>{{product_info.node_code}}</pre>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </TabPane>
                    <TabPane label="其他" name="4">
                        <div class="simpleline simpleTable">
                            <strong>其他相关内容：</strong>
                            <div class="question">
                                <p>如有不明白之处，请和您的公信宝专属商户经理联系。</p>
                                <p>如果您还没有专属商户经理，请访问公信宝官方网站联系我们 <a target="_blank"
                                                                  href="https://gxb.io">https://gxb.io</a></p>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>

        <Modal v-model="apiTestModal" width="80%" class="api-test-modal product-tab">
            <p slot="header">
                <span>API测试工具</span>
            </p>
            <Form :label-width="60" label-position="top">
                <div class="simpleline simpleTable">
                    <strong>接口名称：</strong>
                    <i-input v-model="product_info.product_name" readonly></i-input>
                </div>
                <div class="simpleline simpleTable">
                    <strong>接口地址：<span class="warning-tips">（*数据交易盒子请求地址可在设置接入点管理中修改）</span></strong>
                    <i-input v-model="product_info.current_url" readonly></i-input>
                </div>
                <div class="simpleline simpleTable">
                    <strong>请求方式：</strong>
                    <Select v-model="apiTestType">
                        <Option value="GET">GET</Option>
                        <Option value="POST">POST</Option>
                    </Select>
                </div>
                <div class="simpleline simpleTable">
                    <strong>请求参数：</strong>
                    <table class="api_table" border="0" cellspacing="0" cellpadding="0" v-if="currentSchema">
                        <tbody>
                        <tr class="title">
                            <th width="20"></th>
                            <th width="100">名称</th>
                            <th width="80">类型</th>
                            <th width="60">必填</th>
                            <th>描述</th>
                            <th>值</th>
                        </tr>
                        <tr v-for="(item, key, index) in currentSchema.input" :key="index">
                            <td>&nbsp;</td>
                            <td class="url">{{key}}</td>
                            <td class="url">{{item.type}}</td>
                            <td class="url">{{item.required ? '是' : '否'}}</td>
                            <td>{{item.desc}}</td>
                            <td>
                                <i-input v-model="apiTestParams[key]"></i-input>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="api-test-btn">
                    <Button type="primary" @click="sendApiTest()" :loading="loading">发送请求</Button>
                    <span class="warning-tips">（*为了准确性，所有请求均基于真实环境请求，请悉知）</span>
                </div>
            </Form>
            <div slot="footer" class="left">
                <div class="simpleline simpleTable" v-if="apiTestResponse">
                    <strong>返回内容：</strong>
                    <div class="prediv">
                        <pre>{{JSON.stringify(apiTestResponse, null, '  ')}}</pre>
                    </div>
                </div>
                <div class="simpleline simpleTable" v-if="apiTestResponse">
                    <strong>返回数据：</strong>
                    <div class="prediv">
                        <pre v-if="apiTestData">{{'共耗时:' + apiTestCostTime +'ms'}}<br/>{{JSON.stringify(apiTestData, null, '  ')}}</pre>
                        <pre v-if="apiTestTimeOut">请求超时，请稍后重试</pre>
                        <pre class="pre-loading" v-show="loading"><Spin fix></Spin></pre>
                    </div>
                </div>
            </div>
        </Modal>

        <Modal v-model="dataSourceTestModal" width="80%" class="api-test-modal product-tab" v-if="config.datasource">
            <p slot="header">
                <span>数据源测试工具</span>
            </p>
            <Form :label-width="60" label-position="top">
                <div class="simpleline simpleTable">
                    <strong>接口名称：</strong>
                    <i-input v-model="product_info.product_name" readonly></i-input>
                </div>
                <div class="simpleline simpleTable">
                    <strong>接口地址：<span class="warning-tips">（*数据源请求地址可在设置配置管理中修改）</span></strong>
                    <i-input v-model="config.datasource.service" readonly></i-input>
                </div>
                <div class="simpleline simpleTable">
                    <strong>请求方式：</strong>
                    <Select v-model="apiTestType">
                        <Option value="GET">GET</Option>
                        <Option value="POST">POST</Option>
                    </Select>
                </div>
                <div class="simpleline simpleTable">
                    <strong>请求参数：</strong>
                    <table class="api_table" border="0" cellspacing="0" cellpadding="0" v-if="currentSchema">
                        <tbody>
                        <tr class="title">
                            <th width="20"></th>
                            <th width="100">名称</th>
                            <th width="80">类型</th>
                            <th width="60">必填</th>
                            <th>描述</th>
                            <th>值</th>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td class="url">product id</td>
                            <td class="url">string</td>
                            <td class="url">是</td>
                            <td>产品ID</td>
                            <td>
                                <i-input v-model="dataSourceTestSender.product_id" readonly></i-input>
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td class="url">request id</td>
                            <td class="url">string</td>
                            <td class="url">是</td>
                            <td>请求ID</td>
                            <td>
                                <i-input v-model="dataSourceTestSender.request_id" readonly></i-input>
                            </td>
                        </tr>
                        <tr v-for="(item, key, index) in currentSchema.input" :key="index">
                            <td>&nbsp;</td>
                            <td class="url">{{key}}</td>
                            <td class="url">{{item.type}}</td>
                            <td class="url">{{item.required ? '是' : '否'}}</td>
                            <td>{{item.desc}}</td>
                            <td>
                                <i-input v-model="dataSourceTestSender.params[key]"></i-input>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="api-test-btn">
                    <Button type="primary" @click="sendDataSourceTest()" :loading="loading">发送请求</Button>
                    <span class="warning-tips">（*为了准确性，所有请求均基于真实环境请求，请悉知）</span>
                </div>
            </Form>
            <div slot="footer" class="left">
                <div class="simpleline simpleTable">
                    <strong>发送数据：</strong>
                    <div class="prediv">
                        <pre>{{JSON.stringify(dataSourceTestSender, null, '  ')}}</pre>
                    </div>
                </div>
                <div class="simpleline simpleTable" v-if="apiTestData">
                    <strong>返回数据：</strong>
                    <div class="prediv">
                        <pre v-if="apiTestData">{{'共耗时:' + apiTestCostTime +'ms'}}<br/>{{JSON.stringify(apiTestData, null, '  ')}}</pre>
                        <pre v-if="apiTestTimeOut">请求超时，请稍后重试</pre>
                        <pre class="pre-loading" v-show="loading"><Spin fix></Spin></pre>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import Handler from '../libs/handler';
    import qs from 'qs';

    export default {
        props: ['product'],
        data () {
            return {
                loading: false,
                loaded: false,
                product_info: {},
                currentSchema: null,
                sampleInput: {},
                sampleOutput: {code: 0, message: '', data: {}},
                api_server: '',
                isSubscribed: false,
                dataSourceTestModal: false,
                dataSourceTestSender: {
                    request_id: '',
                    product_id: '',
                    params: {}
                },
                apiTestModal: false,
                apiTestType: 'GET',
                apiTestParams: {},
                apiTestResponse: null,
                apiTestData: null,
                apiTestCostTime: 0,
                apiTestTimeOut: false,
                apiInterval: null,
                system_code: {
                    NOT_FOUND: {desc: '数据项不存在'},
                    INVALID_PARAMS: {desc: '参数错误'},
                    FORBIDDEN: {desc: '已下架'},
                    BALANCE_NOT_ENOUGH: {desc: '余额不足'},
                    DATASOURCE_OFFLINE: {desc: '数据源离线'},
                    UNKNOWN_ERROR: {desc: '未知错误'}
                }
            };
        },
        created () {
            this.$http.get('/api/get_ip_address').then((res) => {
                this.api_server = localStorage.getItem('__gxbBox__ApiServer') ? localStorage.getItem('__gxbBox__ApiServer') + ':' + this.config.common.port : 'http://' + res.data + ':' + this.config.common.port;
                if (this.product) {
                    this.formatterLeagueData(this.product);
                } else {
                    this.formatterFreeData(this.$route.query.id);
                }
            }).catch((err) => {
                Handler.error(err);
            });
        },
        beforeDestroy () {
            clearInterval(this.apiInterval);
        },
        watch: {
            product: function (val) {
                this.formatterLeagueData(val);
            }
        },
        computed: {
            ...mapGetters({
                config: 'config'
            })
        },
        methods: {
            formatterPrice (price) {
                return price / 100000;
            },
            formatterFreeData (product_id) {
                let product;
                let subscribed_list = this.config.datasource && this.config.datasource.subscribed_data_product || [];
                this.isSubscribed = false;
                for (let i = 0; i < subscribed_list.length; i++) {
                    if (product_id == subscribed_list[i]) {
                        this.isSubscribed = true;
                        break;
                    }
                }
                this.$http.get('/api/fetch_free_data_product_details/' + product_id).then((res) => {
                    product = res.data;
                    product.id = product_id;
                    switch (product.status) {
                        case 0:
                            product.status = '未发布';
                            product.status_class = 'facolor-warning';
                            break;
                        case 1:
                            product.status = '正常';
                            product.status_class = 'facolor-success';
                            break;
                        case 2:
                            product.status = '已禁用';
                            product.status_class = 'facolor-error';
                            break;
                    }
                    let self = this;
                    product.schema_contexts.forEach(function (schema) {
                        if (schema.version === product.version) {
                            self.currentSchema = schema;
                        }
                    });
                    if (this.currentSchema) {
                        for (let key in this.currentSchema.input) {
                            this.sampleInput[key] = this.getSampleVal(this.currentSchema.input[key]);
                        }

                        for (let key in this.currentSchema.output) {
                            this.sampleOutput.data[key] = this.getSampleVal(this.currentSchema.output[key]);
                        }
                    }
                    product.privacy = this.currentSchema.privacy;
                    product.current_url = this.api_server + '/rpc/' + product.id + '/' + product.version;
                    product.curl_code = this.genCURLCode(this.currentSchema, product.current_url);
                    product.java_code = this.genJavaCode(this.currentSchema, product.current_url);
                    product.node_code = this.genNodeCode(this.currentSchema, product.current_url);
                    return this.$http.get('/api/fetch_data_market_categories_info/' + product.category_id);
                }).then((res) => {
                    product.category_name = res.data.category_name;
                    this.product_info = product;
                    this.loaded = true;
                }).catch((err) => {
                    Handler.error(err);
                    if (err.response.data.data.code === 10) {
                        this.$router.push('/404');
                    }
                });
            },
            formatterLeagueData (product_info) {
                let product = product_info;
                let subscribed_list = this.config.datasource.subscribed_data_product || [];
                this.isSubscribed = false;
                for (let i = 0; i < subscribed_list.length; i++) {
                    if (product.id == subscribed_list[i]) {
                        this.isSubscribed = true;
                        break;
                    }
                }
                switch (product.status) {
                    case 0:
                        product.status = '未发布';
                        product.status_class = 'facolor-warning';
                        break;
                    case 1:
                        product.status = '正常';
                        product.status_class = 'facolor-success';
                        break;
                    case 2:
                        product.status = '已禁用';
                        product.status_class = 'facolor-error';
                        break;
                }
                product.price = product.refer_price;
                this.currentSchema = JSON.parse(product.schema_contexts[0].schema_context);
                product.privacy = this.currentSchema.privacy;
                product.version = product.schema_contexts[0].version;
                product.current_url = this.api_server + '/rpc/league/' + this.$route.query.id + '/' + product.id + '/' + product.version;
                product.curl_code = this.genCURLCode(this.currentSchema, product.current_url);
                product.java_code = this.genJavaCode(this.currentSchema, product.current_url);
                product.node_code = this.genNodeCode(this.currentSchema, product.current_url);
                this.$http.get('/api/fetch_data_market_categories_info/' + product.category_id).then((res) => {
                    product.category_name = res.data.category_name;
                    this.product_info = product;
                    this.loaded = true;
                }).catch((err) => {
                    Handler.error(err);
                });
            },
            getSampleVal (def) {
                let resultObj = {};
                if (typeof def.sample !== 'undefined') {
                    return def.sample;
                }
                switch (def.type) {
                    case 'string':
                        return '';
                    case 'integer':
                        return 0;
                    case 'boolean':
                        return true;
                    case 'number':
                        return 0.0;
                    case 'object':
                        if (!def.fields) {
                            console.log('异常的Object返回类型定义');
                            return null;
                        }
                        for (var key in def.fields) {
                            resultObj[key] = this.getSampleVal(def.fields[key]);
                        }
                        return resultObj;
                    case 'array':
                        if (!def.columns) {
                            console.log('异常的数组返回类型定义');
                            return [];
                        }
                        return def.columns.map(function (col) {
                            return this.getSampleVal(col);
                        });
                    case 'enum':
                        if (!def.enums || def.enums.length === 0) {
                            console.log('异常的枚举返回类型定义');
                            return '';
                        }
                        return def.enums[0];
                    default:
                        return null;
                }
            },
            genCURLCode (currentSchema, url) {
                let params = {};
                if (currentSchema) {
                    for (let key in currentSchema.input) {
                        params[key] = this.getSampleVal(currentSchema.input[key]);
                    }
                    return [
                        'curl -X POST \\',
                        url + ' \\',
                        '-H \'content-type: application/json\' \\',
                        '-d \'' + JSON.stringify(params, null, '  ') + '\''
                    ].join('\n');
                } else {
                    return '//schema context未定义';
                }
            },
            genJavaCode (currentSchema, url) {
                let params = {};
                if (currentSchema) {
                    for (let key in currentSchema.input) {
                        params[key] = this.getSampleVal(currentSchema.input[key]);
                    }
                    return [
                        'OkHttpClient client = new OkHttpClient();',
                        '',
                        'MediaType mediaType = MediaType.parse("application/json");',
                        'RequestBody body = RequestBody.create(mediaType, ' + JSON.stringify(JSON.stringify(params)) + ');',
                        'Request request = new Request.Builder()',
                        '  .url("' + url + '")',
                        '  .post(body)',
                        '  .addHeader("content-type", "application/json")',
                        '  .build();',
                        '',
                        'Response response = client.newCall(request).execute();'
                    ].join('\n');
                } else {
                    return '//schema context未定义';
                }
            },
            genNodeCode (currentSchema, url) {
                let params = {};
                if (currentSchema) {
                    for (let key in currentSchema.input) {
                        params[key] = this.getSampleVal(currentSchema.input[key]);
                    }
                    let options = {
                        method: 'POST',
                        url: url,
                        header: {'content-type': 'application/json'},
                        body: params
                    };
                    return [
                        'var request = require("request");',
                        'var options = ' + JSON.stringify(options, null, ' ') + ';',
                        '',
                        'request(options, function (error, response, body) {',
                        '  if (error) throw new Error(error);',
                        '  ',
                        '  console.log(body);',
                        '});'
                    ].join('\n');
                } else {
                    return '//schema context未定义';
                }
            },
            openApiTest () {
                this.apiTestModal = true;
            },
            sendApiTest () {
                let beginTime = new Date();
                let timeOut = this.product_info.privacy ? this.config.merchant.privacy_request_timeout : this.config.merchant.default_timeout;
                debugger; //eslint-disable-line
                this.apiTestResponse = null;
                this.apiTestData = null;
                this.apiTestTimeOut = false;
                this.loading = true;
                this.$http({
                    method: this.apiTestType,
                    url: this.product_info.current_url,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    params: this.apiTestType === 'GET' ? this.apiTestParams : '',
                    data: this.apiTestType === 'POST' ? qs.stringify(this.apiTestParams) : ''
                }).then((res) => {
                    this.apiTestResponse = res.data;
                    if (this.apiTestResponse.data.request_id) {
                        let self = this;
                        this.apiInterval = setInterval(function () {
                            self.$http({
                                method: 'GET',
                                url: self.api_server + '/api/request/' + self.apiTestResponse.data.request_id + '/data'
                            }).then((res) => {
                                let endTime = new Date();
                                let apiTestCostTime = endTime - beginTime;
                                if (apiTestCostTime > timeOut) {
                                    clearInterval(self.apiInterval);
                                    self.apiTestTimeOut = true;
                                    self.loading = false;
                                } else {
                                    if (res.data.length !== 0) {
                                        clearInterval(self.apiInterval);
                                        self.apiTestCostTime = apiTestCostTime;
                                        self.apiTestData = res.data;
                                        self.loading = false;
                                    }
                                }
                            }).catch((err) => {
                                this.$Message.error('请求失败:' + Handler.error(err));
                                this.loading = false;
                            });
                        }, 500);
                    }
                }).catch((err) => {
                    this.$Message.error('请求失败:' + Handler.error(err));
                    this.loading = false;
                });
            },
            openDataSourceTest () {
                this.dataSourceTestSender.request_id = Math.random().toString(36).substr(2);
                this.dataSourceTestSender.product_id = this.product_info.id;
                this.dataSourceTestModal = true;
            },
            sendDataSourceTest () {
                let beginTime = new Date();
                this.loading = true;
                this.$http({
                    method: this.apiTestType,
                    url: this.config.datasource.service,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    params: this.apiTestType === 'GET' ? this.dataSourceTestSender : '',
                    data: this.apiTestType === 'POST' ? qs.stringify(this.dataSourceTestSender) : ''
                }).then((res) => {
                    let endTime = new Date();
                    this.apiTestCostTime = endTime - beginTime;
                    this.apiTestData = res.data;
                    this.loading = false;
                }).catch((err) => {
                    this.$Message.error('请求失败:' + Handler.error(err));
                    this.loading = false;
                });
            }
        }
    };
</script>
