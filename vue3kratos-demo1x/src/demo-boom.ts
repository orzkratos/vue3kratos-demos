import {GrpcWebFetchTransport} from '@protobuf-ts/grpcweb-transport'
import {RpcboomClient} from "./rpc/rpcboom/rpcboom.client";
import {Empty} from "./rpc/google/protobuf/empty";
import {AxiosError} from "axios";
import {ErrorReason} from "./rpc/helloworld/v1/error_reason";

console.log("=".repeat(50))
console.log('💥 Rpcboom Service Demo - Error Testing')
console.log("=".repeat(50))

// Create transport instance
// 创建传输实例
const demoTransport = new GrpcWebFetchTransport({
    baseUrl: "http://127.0.0.1:18000",
    meta: {
        Authorization: 'TOKEN-888',
    },
});

const rpcboomClient = new RpcboomClient(demoTransport)

// Test BoomUnknown (500)
// 测试 BoomUnknown (500)
async function testBoomUnknown() {
    console.log("\n💥 【BoomUnknown Test】")
    console.log("-".repeat(30))

    const request = Empty.create({})

    try {
        await rpcboomClient.boomUnknown(request, {})
        console.log('❌ Expected error but got success')
        return false
    } catch (err: unknown) {
        parseCause(err as AxiosError)
        return true
    }
}

// Test BoomNotFound (404)
// 测试 BoomNotFound (404)
async function testBoomNotFound() {
    console.log("\n💥 【BoomNotFound Test】")
    console.log("-".repeat(30))

    const request = Empty.create({})

    try {
        await rpcboomClient.boomNotFound(request, {})
        console.log('❌ Expected error but got success')
        return false
    } catch (err: unknown) {
        parseCause(err as AxiosError)
        return true
    }
}

// Test BoomVague (500)
// 测试 BoomVague (500)
async function testBoomVague() {
    console.log("\n💥 【BoomVague Test】")
    console.log("-".repeat(30))

    const request = Empty.create({})

    try {
        await rpcboomClient.boomVague(request, {})
        console.log('❌ Expected error but got success')
        return false
    } catch (err: unknown) {
        parseCause(err as AxiosError)
        return true
    }
}

// Test BoomTxError (500)
// 测试 BoomTxError (500)
async function testBoomTxError() {
    console.log("\n💥 【BoomTxError Test】")
    console.log("-".repeat(30))

    const request = Empty.create({})

    try {
        await rpcboomClient.boomTxError(request, {})
        console.log('❌ Expected error but got success')
        return false
    } catch (err: unknown) {
        parseCause(err as AxiosError)
        return true
    }
}

// Test BoomDbError (500)
// 测试 BoomDbError (500)
async function testBoomDbError() {
    console.log("\n💥 【BoomDbError Test】")
    console.log("-".repeat(30))

    const request = Empty.create({})

    try {
        await rpcboomClient.boomDbError(request, {})
        console.log('❌ Expected error but got success')
        return false
    } catch (err: unknown) {
        parseCause(err as AxiosError)
        return true
    }
}

// Parse and display error details
// 解析并显示错误详情
function parseCause(err: AxiosError) {
    console.log('✅ Got expected error:')
    console.log(`   HTTP Status: ${err.response?.status || 'N/A'}`)
    console.log(`   Error Code: ${err.code || 'N/A'}`)
    console.log(`   Error Message: ${err.message || 'N/A'}`)
    if (err.response?.data) {
        const data = err.response.data as any
        console.log(`   Reason: ${data.reason || 'N/A'}`)
        console.log(`   Kratos Code: ${data.code || 'N/A'}`)
        console.log(`   Kratos Message: ${data.message || 'N/A'}`)
        if (data.metadata) {
            console.log(`   Metadata: ${JSON.stringify(data.metadata)}`)
            // Parse enum code from metadata and map to enum name
            // 从 metadata 解析枚举码并映射到枚举名称
            const enumCode = parseInt(data.metadata.numeric_reason_code_enum)
            if (isNaN(enumCode)) {
                // No numeric enum code in metadata, use reason as fallback
                // metadata 中没有数字枚举码，使用 reason 作为备选
                console.log(`   Enum Name: ${data.reason} (N/A)`)
            } else {
                switch (enumCode) {
                    case ErrorReason.UNKNOWN:
                        console.log(`   Enum Name: UNKNOWN (${enumCode})`)
                        break
                    case ErrorReason.USER_NOT_FOUND:
                        console.log(`   Enum Name: USER_NOT_FOUND (${enumCode})`)
                        break
                    case ErrorReason.GREETER_UNSPECIFIED:
                        console.log(`   Enum Name: GREETER_UNSPECIFIED (${enumCode})`)
                        break
                    case ErrorReason.TX_ERROR:
                        console.log(`   Enum Name: TX_ERROR (${enumCode})`)
                        break
                    case ErrorReason.DB_ERROR:
                        console.log(`   Enum Name: DB_ERROR (${enumCode})`)
                        break
                    default:
                        console.log(`   Enum Name: ${data.reason} (${enumCode})`)
                        break
                }
            }
        }
    }
}

// Run complete Boom error testing demo
// 执行完整的 Boom 错误测试演示
async function runBoomDemo() {
    await testBoomUnknown()
    await testBoomNotFound()
    await testBoomVague()
    await testBoomTxError()
    await testBoomDbError()

    console.log("\n" + "=".repeat(50))
    console.log('🎉 Boom tests completed!')
    console.log("=".repeat(50))
}

// Start demo
// 启动演示
runBoomDemo()
