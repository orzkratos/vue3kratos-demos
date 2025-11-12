import {GrpcWebFetchTransport} from '@protobuf-ts/grpcweb-transport'
import {RpcpingClient} from "./rpc/rpcping/rpcping.client";
import {StringValue} from "./rpc/google/protobuf/wrappers";

console.log("=".repeat(50))
console.log('🚀 RpcPing Service Demo')
console.log("=".repeat(50))

// Create transport instance
// 创建传输实例
const demoTransport = new GrpcWebFetchTransport({
    baseUrl: "http://127.0.0.1:18000",
    meta: {
        Authorization: 'TOKEN-888',
    },
});

const rpcpingClient = new RpcpingClient(demoTransport)

// Demo Ping interface
// 演示 Ping 接口
async function demoPing() {
    console.log("\n🏓 【Ping Interface Demo】")
    console.log("-".repeat(30))

    // Create StringValue request
    // 创建 StringValue 请求
    const request = StringValue.create({
        value: "Hello from Vue3 Kratos!"
    })

    try {
        const response = await rpcpingClient.ping(request, {})
        console.log('✅ Ping success:')
        console.log(`   Request: value = "${request.value}"`)
        console.log(`   Response: value = "${response.data.value}"`)
        return response.data.value
    } catch (err) {
        console.error('❌ Ping failed:', err)
        throw err
    }
}

// Demo multiple Ping calls
// 演示多次 Ping 调用
async function demoMultiplePings() {
    const messages = [
        "Ping 1: Vue3 integration test",
        "Ping 2: HTTP via gRPC works!",
        "Ping 3: Kratos backend rocks",
        "Ping 4: TypeScript client success",
        "Ping 5: Final test complete"
    ]

    console.log("\n🔄 【Multiple Ping Calls Demo】")
    console.log("-".repeat(30))

    for (let i = 0; i < messages.length; i++) {
        try {
            const request = StringValue.create({
                value: messages[i]
            })

            const response = await rpcpingClient.ping(request, {})
            console.log(`✅ Ping ${i + 1}/${messages.length}:`)
            console.log(`   Request: ${messages[i]}`)
            console.log(`   Response: ${response.data.value}`)

            // Add small delay for observation
            // 添加小延迟以便观察
            await new Promise(resolve => setTimeout(resolve, 500))

        } catch (err) {
            console.error(`❌ Ping ${i + 1}/${messages.length} failed:`, err)
        }
    }
}

// Run complete Ping demo
// 执行完整的 Ping 演示
async function runPingDemo() {
    try {
        // 1. Single Ping test
        // 1. 单次 Ping 测试
        await demoPing()

        // 2. Multiple Ping tests
        // 2. 多次 Ping 测试
        await demoMultiplePings()

        console.log("\n" + "=".repeat(50))
        console.log('🎉 RpcPing demo completed with success!')
        console.log("=".repeat(50))

    } catch (err) {
        console.error('\n❌ Error during Ping demo:', err)
        console.log("=".repeat(50))
    }
}

// Start demo
// 启动演示
runPingDemo()