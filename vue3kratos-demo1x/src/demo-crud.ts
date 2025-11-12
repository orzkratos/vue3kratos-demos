import {GrpcWebFetchTransport} from '@protobuf-ts/grpcweb-transport'
import {RpcdemoClient} from "./rpc/rpcdemo/rpcdemo.client";
import {
    CreateRpcDemoRequest,
    DeleteRpcDemoRequest,
    SelectRpcDemoRequest,
    UpdateRpcDemoRequest
} from "./rpc/rpcdemo/rpcdemo";

console.log("=".repeat(50))
console.log('🚀 RpcDemo CRUD Service Demo')
console.log("=".repeat(50))

// Create shared transport instance
// 创建共享的传输实例
const demoTransport = new GrpcWebFetchTransport({
    baseUrl: "http://127.0.0.1:18000",
    meta: {
        Authorization: 'TOKEN-888',
    },
});

const rpcdemoClient = new RpcdemoClient(demoTransport)

// Demo CreateRpcDemo interface
// 演示 CreateRpcDemo 接口
async function demoCreateRpcDemo() {
    console.log("\n🔨 【CreateRpcDemo Interface Demo】")
    console.log("-".repeat(30))

    const request = CreateRpcDemoRequest.create({
        code: "DEMO001",
        name: "Vue3 Kratos Demo",
        type: "frontend"
    })

    try {
        const response = await rpcdemoClient.createRpcDemo(request, {})
        console.log('✅ Create success:')
        console.log(`   Created code: ${response.data.code}`)
        return response.data.code
    } catch (err) {
        console.error('❌ Create failed:', err)
        throw err
    }
}

// Demo UpdateRpcDemo interface
// 演示 UpdateRpcDemo 接口
async function demoUpdateRpcDemo(code: string) {
    console.log("\n📝 【UpdateRpcDemo Interface Demo】")
    console.log("-".repeat(30))

    const request = UpdateRpcDemoRequest.create({
        code: code,
        name: "Updated Vue3 Kratos Demo"
    })

    try {
        const response = await rpcdemoClient.updateRpcDemo(request, {})
        console.log('✅ Update success:')
        console.log(`   Updated data:`, response.data)
        return response.data
    } catch (err) {
        console.error('❌ Update failed:', err)
        throw err
    }
}

// Demo SelectRpcDemo interface
// 演示 SelectRpcDemo 接口
async function demoSelectRpcDemo() {
    console.log("\n🔍 【SelectRpcDemo Interface Demo】")
    console.log("-".repeat(30))

    const request = SelectRpcDemoRequest.create({
        type: "frontend"
    })

    try {
        const response = await rpcdemoClient.selectRpcDemo(request, {})
        console.log(`✅ Select success, found ${response.data.demos.length} demos:`)
        response.data.demos.forEach((item, index) => {
            console.log(`   Demo ${index + 1}:`, item)
        })
        return response.data.demos
    } catch (err) {
        console.error('❌ Select failed:', err)
        throw err
    }
}

// Demo DeleteRpcDemo interface
// 演示 DeleteRpcDemo 接口
async function demoDeleteRpcDemo(code: string) {
    console.log("\n🗑️  【DeleteRpcDemo Interface Demo】")
    console.log("-".repeat(30))

    const request = DeleteRpcDemoRequest.create({
        code: code
    })

    try {
        const response = await rpcdemoClient.deleteRpcDemo(request, {})
        console.log('✅ Delete success:')
        console.log(`   Deleted code: ${response.data.code}`)
        return response.data.code
    } catch (err) {
        console.error('❌ Delete failed:', err)
        throw err
    }
}

// Run complete CRUD demo flow
// 执行完整的 CRUD 演示流程
async function runCrudDemo() {
    try {
        // 1. Create
        // 1. 创建
        const createdCode = await demoCreateRpcDemo()

        // 2. Update
        // 2. 更新
        await demoUpdateRpcDemo(createdCode)

        // 3. Select
        // 3. 查询
        await demoSelectRpcDemo()

        // 4. Delete
        // 4. 删除
        await demoDeleteRpcDemo(createdCode)

        console.log("\n" + "=".repeat(50))
        console.log('🎉 RpcDemo CRUD demo completed with success!')
        console.log("=".repeat(50))

    } catch (err) {
        console.error('\n❌ Error during CRUD demo:', err)
        console.log("=".repeat(50))
    }
}

// Start demo
// 启动演示
runCrudDemo()