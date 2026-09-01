function fields(extra) {
  return { name: { type: 'string', required: true, title: '名称' }, ...extra };
}

function iotPlugin({ name, title, description, capabilities, models = [], category = 'industrial-iot', dependencies = ['access-control', 'model-engine'] }) {
  return {
    name, title, description, category, version: '0.3.0', license: 'free',
    dependencies, capabilities,
    install(core) { for (const model of models) core.registerModel(model); },
    async enable(core) { await core.events.emit('iot.capability.ready', { plugin: name, capabilities }); }
  };
}

export const deviceProtocolPlugin = iotPlugin({
  name: 'device-protocol-gateway', title: 'MQTT / Modbus 设备接入', description: 'MQTT、Modbus TCP/RTU、HTTP 协议接入与厂商报文适配',
  capabilities: ['iot.mqtt.ingest','iot.modbus.tcp','iot.modbus.rtu','iot.http.ingest','iot.protocol.adapter'],
  models: [{ name: 'iot_terminal', title: '物联网终端', fields: fields({
    terminalNo:{type:'string',required:true,title:'终端编号'}, imei:{type:'string',title:'IMEI'}, simNo:{type:'string',title:'SIM卡'},
    protocol:{type:'string',required:true,title:'协议'}, vendor:{type:'string',title:'厂商'}, equipmentId:{type:'string',title:'绑定设备'},
    tokenHash:{type:'string',title:'接入令牌摘要'}, enabled:{type:'boolean',required:true,title:'启用状态'}
  })}]
});

export const deviceConnectionPlugin = iotPlugin({
  name:'device-connection-manager',title:'设备连接与心跳',description:'连接会话、心跳、在线状态、离线判定和设备影子',
  capabilities:['iot.connection','iot.heartbeat','iot.online-status','iot.device-shadow'],
  models:[{name:'device_connection',title:'设备连接',fields:fields({
    terminalId:{type:'string',required:true,title:'终端'}, sessionId:{type:'string',title:'会话'},
    status:{type:'string',required:true,title:'连接状态'}, lastSeenAt:{type:'datetime',title:'最后心跳'},
    remoteAddress:{type:'string',title:'远端地址'}, shadow:{type:'json',title:'设备影子'}
  })}]
});

export const timeSeriesPlugin = iotPlugin({
  name:'time-series-telemetry',title:'时序遥测',description:'高并发测点写入、标准化、质量标记、聚合和保留策略',
  capabilities:['iot.telemetry.write','iot.telemetry.batch','iot.telemetry.normalize','iot.telemetry.quality','iot.timeseries.aggregate'],
  models:[{name:'telemetry_point',title:'遥测点',fields:fields({
    terminalId:{type:'string',required:true,title:'终端'}, equipmentId:{type:'string',title:'设备'}, metric:{type:'string',required:true,title:'测点'},
    value:{type:'number',required:true,title:'数值'}, unit:{type:'string',title:'单位'}, timestamp:{type:'datetime',required:true,title:'采集时间'},
    quality:{type:'json',title:'质量'}, tags:{type:'json',title:'标签'}
  })}]
});

export const iotStreamingPlugin = iotPlugin({
  name:'iot-streaming-bus',title:'物联网消息与实时流',description:'消息队列、主题路由、流处理、背压和失败重试',
  capabilities:['iot.message.publish','iot.message.subscribe','iot.topic.route','iot.stream.process','iot.dead-letter'],
  models:[{name:'iot_message',title:'设备消息',fields:fields({
    topic:{type:'string',required:true,title:'主题'}, terminalId:{type:'string',title:'终端'}, payload:{type:'json',required:true,title:'载荷'},
    qos:{type:'integer',title:'QoS'}, status:{type:'string',required:true,title:'状态'}, receivedAt:{type:'datetime',required:true,title:'接收时间'}
  })}]
});

export const deviceAlertPlugin = iotPlugin({
  name:'device-alert-engine',title:'设备告警联动',description:'规则计算、告警去重、升级、确认和工作流联动',
  capabilities:['iot.rule.evaluate','iot.alert.create','iot.alert.deduplicate','iot.alert.escalate','iot.alert.workflow'],
  models:[{name:'device_alert',title:'设备告警',fields:fields({
    equipmentId:{type:'string',required:true,title:'设备'}, ruleKey:{type:'string',required:true,title:'规则'}, severity:{type:'string',required:true,title:'级别'},
    status:{type:'string',required:true,title:'状态'}, message:{type:'text',required:true,title:'告警内容'}, firstSeenAt:{type:'datetime',required:true,title:'首次发生'},
    lastSeenAt:{type:'datetime',required:true,title:'最后发生'}, context:{type:'json',title:'上下文'}
  })}]
});

export const edgeGatewayPlugin = iotPlugin({
  name:'edge-gateway-command',title:'边缘网关与指令',description:'边缘网关、报文解析、断点续传、设备指令和执行回执',
  capabilities:['iot.edge.register','iot.edge.parse','iot.edge.store-forward','iot.command.send','iot.command.ack'],
  models:[
    {name:'edge_gateway',title:'边缘网关',fields:fields({gatewayNo:{type:'string',required:true,title:'网关编号'},protocols:{type:'json',title:'协议'},status:{type:'string',required:true,title:'状态'},lastSeenAt:{type:'datetime',title:'最后在线'},config:{type:'json',title:'配置'}})},
    {name:'device_command',title:'设备指令',fields:fields({terminalId:{type:'string',required:true,title:'终端'},command:{type:'string',required:true,title:'指令'},parameters:{type:'json',title:'参数'},status:{type:'string',required:true,title:'状态'},requestedAt:{type:'datetime',required:true,title:'请求时间'},acknowledgedAt:{type:'datetime',title:'回执时间'}})}
  ]
});

export const constructionEquipmentPlugin = iotPlugin({
  name:'construction-equipment-app',title:'施工设备管理示例',description:'由榫卯插件组合的公司—项目施工设备全生命周期应用',
  category:'example-app',
  dependencies:['access-control','model-engine','workflow','file-manager','notification','dashboard-charts','multi-view','device-protocol-gateway','device-connection-manager','time-series-telemetry','device-alert-engine','edge-gateway-command'],
  capabilities:['equipment.ledger','equipment.maintenance','equipment.inventory','equipment.dispatch','equipment.map','equipment.analytics','equipment.mobile'],
  models:[
    {name:'construction_project',title:'施工项目',fields:fields({companyId:{type:'string',required:true,title:'公司'},code:{type:'string',required:true,title:'项目编码'},status:{type:'string',required:true,title:'状态'},location:{type:'json',title:'位置'}})},
    {name:'equipment',title:'设备台账',fields:fields({projectId:{type:'string',required:true,title:'项目'},equipNo:{type:'string',required:true,title:'设备编号'},category:{type:'string',required:true,title:'类别'},model:{type:'string',title:'型号'},source:{type:'string',required:true,title:'来源'},status:{type:'string',required:true,title:'状态'},isSpecial:{type:'boolean',title:'特种设备'},terminalId:{type:'string',title:'终端'}})},
    {name:'maintenance_order',title:'维保工单',fields:fields({projectId:{type:'string',required:true,title:'项目'},equipmentId:{type:'string',required:true,title:'设备'},type:{type:'string',required:true,title:'类型'},status:{type:'string',required:true,title:'状态'},scheduledAt:{type:'datetime',title:'计划时间'},cost:{type:'number',title:'费用'}})},
    {name:'inventory_part',title:'配件库存',fields:fields({projectId:{type:'string',required:true,title:'项目'},partNo:{type:'string',required:true,title:'配件编号'},quantity:{type:'number',required:true,title:'库存'},safetyStock:{type:'number',title:'安全库存'},location:{type:'string',title:'库位'}})},
    {name:'dispatch_order',title:'设备调度',fields:fields({projectId:{type:'string',required:true,title:'项目'},equipmentId:{type:'string',required:true,title:'设备'},fromZone:{type:'string',title:'出发区域'},toZone:{type:'string',required:true,title:'目标区域'},planStart:{type:'datetime',required:true,title:'开始时间'},planEnd:{type:'datetime',required:true,title:'结束时间'},status:{type:'string',required:true,title:'状态'}})}
  ]
});

export const iotSuitePlugins=[deviceProtocolPlugin,deviceConnectionPlugin,timeSeriesPlugin,iotStreamingPlugin,deviceAlertPlugin,edgeGatewayPlugin,constructionEquipmentPlugin];
