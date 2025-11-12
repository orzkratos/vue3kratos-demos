import {GrpcWebFetchTransport} from '@protobuf-ts/grpcweb-transport'
import {GreeterClient} from "./rpc/helloworld/v1/greeter.client";
import {HelloRequest} from "./rpc/helloworld/v1/greeter";

console.log("=".repeat(50))
console.log('🚀 Epic Service Demo - Greeter SayHello')
console.log("=".repeat(50))

// Create transport instance
// 创建传输实例
const demoTransport = new GrpcWebFetchTransport({
    baseUrl: "http://127.0.0.1:18000",
    meta: {
        Authorization: 'TOKEN-888',
    },
});

const greeterClient = new GreeterClient(demoTransport)

// Demo SayHello interface
// 演示 SayHello 接口
async function demoSayHello() {
    console.log("\n📢 【Greeter SayHello Demo】")
    console.log("-".repeat(30))

    const request = HelloRequest.create({
        name: "kratos"
    })

    try {
        const response = await greeterClient.sayHello(request, {})
        console.log('✅ Request success:')
        console.log(`   Request: name = "${request.name}"`)
        console.log(`   Response: message = "${response.data.message}"`)
        return true
    } catch (err) {
        console.error('❌ Request failed:', err)
        return false
    }
}

// Run demo
// 执行演示
demoSayHello()
    .then((success) => {
        console.log("\n" + "=".repeat(50))
        if (success) {
            console.log('🎉 Epic Service demo completed with success!')
        } else {
            console.log('⚠️  Epic Service demo failed')
        }
        console.log("=".repeat(50))
    })
    .catch(err => {
        console.error('Unhandled issue:', err)
    })
