import {GrpcWebFetchTransport} from '@protobuf-ts/grpcweb-transport'

// Import all clients
// 导入所有客户端
import {GreeterClient} from "./rpc/helloworld/v1/greeter.client";
import {RpcdemoClient} from "./rpc/rpcdemo/rpcdemo.client";
import {RpcpingClient} from "./rpc/rpcping/rpcping.client";

// Import all message types
// 导入所有消息类型
import {HelloRequest} from "./rpc/helloworld/v1/greeter";
import {
    CreateRpcDemoRequest,
    DeleteRpcDemoRequest,
    SelectRpcDemoRequest,
    UpdateRpcDemoRequest
} from "./rpc/rpcdemo/rpcdemo";
import {StringValue} from "./rpc/google/protobuf/wrappers";

console.log("=".repeat(50))
console.log('🚀 Vue3 Kratos Complete Service Integration Demo')
console.log("=".repeat(50))

// Create shared transport instance
// 创建共享的传输实例
const demoTransport = new GrpcWebFetchTransport({
    baseUrl: "http://127.0.0.1:18000",
    meta: {
        Authorization: 'TOKEN-888',
    },
});

// Create all client instances
// 创建所有客户端实例
const greeterClient = new GreeterClient(demoTransport)
const rpcdemoClient = new RpcdemoClient(demoTransport)
const rpcpingClient = new RpcpingClient(demoTransport)

// 1. Greeter Service Demo
// 1. Greeter 服务演示
async function demoGreeterService() {
    console.log("\n📢 【Greeter Service Demo】")
    console.log("-".repeat(30))

    const request = HelloRequest.create({
        name: "Vue3 Kratos Integration"
    })

    try {
        const response = await greeterClient.sayHello(request, {})
        console.log('✅ Greeter call success:')
        console.log(`   Request: name = "${request.name}"`)
        console.log(`   Response: message = "${response.data.message}"`)
        return true
    } catch (err) {
        console.error('❌ Greeter call failed:', err)
        return false
    }
}

// 2. RpcPing Service Demo
// 2. RpcPing 服务演示
async function demoRpcPingService() {
    console.log("\n🏓 【RpcPing Service Demo】")
    console.log("-".repeat(30))

    const request = StringValue.create({
        value: "Complete Integration Ping Test"
    })

    try {
        const response = await rpcpingClient.ping(request, {})
        console.log('✅ Ping call success:')
        console.log(`   Request: value = "${request.value}"`)
        console.log(`   Response: value = "${response.data.value}"`)
        return true
    } catch (err) {
        console.error('❌ Ping call failed:', err)
        return false
    }
}

// 3. RpcDemo CRUD Service Demo
// 3. RpcDemo CRUD 服务演示
async function demoRpcDemoService() {
    console.log("\n📋 【RpcDemo CRUD Service Demo】")
    console.log("-".repeat(30))

    let isSuccess = true

    try {
        // Create operation
        // 创建操作
        console.log('🔨 Executing Create operation...')
        const createRequest = CreateRpcDemoRequest.create({
            code: "ALL_DEMO_001",
            name: "Complete Integration Demo",
            type: "integration"
        })
        const createResponse = await rpcdemoClient.createRpcDemo(createRequest, {})
        console.log(`✅ Create success, code: ${createResponse.data.code}`)

        // Update operation
        // 更新操作
        console.log('📝 Executing Update operation...')
        const updateRequest = UpdateRpcDemoRequest.create({
            code: createResponse.data.code,
            name: "Complete Integration Demo (Updated)"
        })
        const updateResponse = await rpcdemoClient.updateRpcDemo(updateRequest, {})
        console.log(`✅ Update success, updated data:`, updateResponse.data)

        // Select operation
        // 查询操作
        console.log('🔍 Executing Select operation...')
        const selectRequest = SelectRpcDemoRequest.create({
            type: "integration"
        })
        const selectResponse = await rpcdemoClient.selectRpcDemo(selectRequest, {})
        console.log(`✅ Select success, found ${selectResponse.data.demos.length} records:`)
        selectResponse.data.demos.forEach((item, index) => {
            console.log(`   ${index + 1}. code:${item.code}, name:${item.name}, type:${item.type}`)
        })

        // Delete operation
        // 删除操作
        console.log('🗑️  Executing Delete operation...')
        const deleteRequest = DeleteRpcDemoRequest.create({
            code: createResponse.data.code
        })
        const deleteResponse = await rpcdemoClient.deleteRpcDemo(deleteRequest, {})
        console.log(`✅ Delete success, deleted code: ${deleteResponse.data.code}`)

    } catch (err) {
        console.error('❌ RpcDemo CRUD operations failed:', err)
        isSuccess = false
    }

    return isSuccess
}

// Statistics and report function
// 统计和报告函数
function printSummary(results: { service: string, success: boolean }[]) {
    console.log("\n" + "=".repeat(50))
    console.log('📊 Demo Results Summary')
    console.log("=".repeat(50))

    const successCount = results.filter(r => r.success).length
    const totalCount = results.length

    results.forEach(result => {
        const status = result.success ? '✅ Success' : '❌ Failed'
        console.log(`${status} ${result.service}`)
    })

    console.log("-".repeat(30))
    console.log(`📈 Overall Success Rate: ${successCount}/${totalCount} (${((successCount / totalCount) * 100).toFixed(1)}%)`)

    if (successCount === totalCount) {
        console.log('🎉 Congratulations! All service demos completed with success!')
        console.log('🚀 Vue3 Kratos integration works as expected!')
    } else {
        console.log('⚠️  Some service demos failed, check service status')
    }
}

// Main demo flow
// 主演示流程
async function runCompleteDemo() {
    const results: { service: string, success: boolean }[] = []

    console.log('🔄 Starting complete service integration demo...\n')

    // Execute all demos in sequence
    // 按顺序执行所有演示
    results.push({
        service: 'Greeter Service',
        success: await demoGreeterService()
    })

    results.push({
        service: 'RpcPing Service',
        success: await demoRpcPingService()
    })

    results.push({
        service: 'RpcDemo CRUD Service',
        success: await demoRpcDemoService()
    })

    // Print summary report
    // 打印汇总报告
    printSummary(results)

    console.log("\n" + "=".repeat(50))
    console.log('🏁 Vue3 Kratos Complete Service Integration Demo Ended')
    console.log("=".repeat(50))
}

// Start complete demo
// 启动完整演示
runCompleteDemo().catch(err => {
    console.error('Unhandled error during demo:', err)
})