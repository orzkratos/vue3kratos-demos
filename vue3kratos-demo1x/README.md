# Vue3 Kratos Demo Project

This project demonstrates the complete [vue3kratos](https://github.com/orzkratos/vue3kratos) toolchain, showcasing seamless integration between Vue 3 frontend and Kratos backend services.

## CHINESE README

[中文说明](README.zh.md)

## 🌟 Project Features

- **gRPC via HTTP**: Transparent conversion of gRPC calls to HTTP requests
- **Type Safe**: Complete TypeScript type support with compile-time checking
- **Auto Generation**: Automatic client code generation from proto files
- **Web Compatible**: Solves gRPC web environment issues

## 📋 Available Demos

### Core Demo Scripts

| Script Command | Demo Content | HTTP Methods | Interface Description |
|---------------|--------------|-------------|---------------------|
| `npm run demo:wise` | **Complete APIs Demo** | ALL | 🌟 **Recommended: Comprehensive demo of services** |
| `npm run demo:epic` | Epic Service | GET | Basic greeting service, simplest demo |
| `npm run demo:ping` | RpcPing Service | GET | Ping/Pong test service |
| `npm run demo:crud` | RpcDemo CRUD | POST/PUT/GET/DELETE | Complete CRUD operations demo |
| `npm run demo:boom` | RpcBoom Error Test | GET | Error handling and enum mapping demo |

### Alias Scripts

| Alias | Equivalent Command | Description |
|-------|-------------------|-------------|
| `npm run demo:wise` | `npm run demo:wise` | Comprehensive demo |
| `npm run demo:epic` | `npm run demo:epic` | Epic service demo |
| `npm run demo:ping` | `npm run demo:ping` | Ping service demo |
| `npm run demo:crud` | `npm run demo:crud` | CRUD operations demo |
| `npm run demo:boom` | `npm run demo:boom` | Error test demo |

## 🚀 Quick Start

### 1. Prerequisites

Ensure dependencies are set up:
```bash
npm install
```

### 2. Start Backend Services

```bash
# Navigate to backend service DIR
cd ../demo1kratos

# Start services
make run
# alternative
go run cmd/demo1kratos/main.go
```

Services start on these ports:
- **HTTP Service**: `http://127.0.0.1:18000`
- **gRPC Service**: `http://127.0.0.1:19000`

### 3. Run Demos

```bash
# 🌟 Recommended: Run complete demo
npm run demo:wise

# Run specific demos
npm run demo:epic        # Epic service
npm run demo:ping        # RpcPing service
npm run demo:crud        # RpcDemo CRUD
npm run demo:boom        # RpcBoom error test
```

## 📋 Demo Details

### Demo1: Wise Service (`demo-wise.ts`)
- Calls to service interfaces in sequence
- Detailed execution status feedback
- Complete success rate statistics report
- Best comprehensive function check solution

### Demo2: Epic Service (`demo-epic.ts`)
- **Interface**: `SayHello`
- **Method**: GET `/api/greeter/meet/{name}`
- **Function**: Basic greeting service
- **Feature**: Simplest gRPC-via-HTTP case

### Demo3: RpcPing Service (`demo-ping.ts`)
- **Interface**: `Ping`
- **Method**: GET `/api/service/ping`
- **Function**: Ping/Pong testing
- **Feature**: Uses `google.protobuf.StringValue` type

### Demo4: RpcDemo CRUD (`demo-crud.ts`)
- Calls to service interfaces in sequence
- Detailed execution status feedback
- Complete success rate statistics report
- Best comprehensive function check solution

### Demo5: RpcBoom Error Test (`demo-boom.ts`)
- **Interface**: `BoomUnknown`, `BoomNotFound`, `BoomVague`, `BoomTxError`, `BoomDbError`
- **Method**: GET `/api/boom/*`
- **Function**: Error handling and metadata parsing
- **Feature**: Demonstrates TypeScript error type mapping with ErrorReason enum

## 🛠 Technical Architecture

### Core Technology Stack
- **Frontend Framework**: Vue 3 + TypeScript
- **RPC Communication**: gRPC-Web + HTTP Adapter
- **Protocol Definition**: Protocol Buffers
- **Package Management**: npm + ES Modules
- **Type System**: Complete TypeScript type safe

### Main Components
- **[@protobuf-ts/plugin](https://npmjs.com/package/@protobuf-ts/plugin)**: TypeScript gRPC code generation
- **[@yyle88/grpt](https://npmjs.com/package/@yyle88/grpt)**: gRPC-to-HTTP adapter
- **vue3kratos CLI**: Automated code transformation

## ⚙️ Configuration

### Server Configuration
Modify backend service address (if needed):
```typescript
const demoTransport = new GrpcWebFetchTransport({
    baseUrl: "http://127.0.0.1:18000",  // Backend service address
    meta: {
        Authorization: 'TOKEN-888',      // Authentication token
    },
});
```

### Project Configuration Requirements
- **package.json**: Must set `"type": "module"`
- **tsconfig.json**: Recommend setting `"target": "ES2023"` for BigInt support

## 🔧 Development Guide

### Adding New Demos
1. Create new `.ts` file in `src/` DIR
2. Import client and message types
3. Write demo logic and check exceptions
4. Add command in `package.json` scripts

### Custom Client Usage
```typescript
import { RpcpingClient } from "./rpc/rpcping/rpcping.client";
import { StringValue } from "./rpc/google/protobuf/wrappers";

const client = new RpcpingClient(demoTransport);
const request = StringValue.create({ value: "Hello from Vue3 Kratos!" });

try {
    const response = await client.ping(request, {});
    console.log('Success:', response.data.value);
} catch (err) {
    console.error('FAILED:', err);
}
```

## 📝 Important Notes

### Dependencies
- **Backend Service**: Must start demo1kratos backend service first
- **Network Connection**: Ensure frontend-backend network works
- **Port Usage**: Uses ports 18000/19000 as default
- **Proto Consistency**: Ensure frontend-backend proto definitions match

### Best Practices
- Recommend using `npm run demo:wise` to check complete functions
- Run specific demos first when debugging in development
- Adjust service addresses and authentication configs for production
- Check package version updates when needed

## 🎯 Learning Value

Through this demo project, you can learn:

1. **Complete workflow of vue3kratos toolchain**
2. **Concept and practice of gRPC to HTTP conversion**
3. **Deep integration of TypeScript with Proto Buffers**
4. **Best architecture pattern of modern frontend with backend**
5. **Type-safe API calling pattern**

## 🔧 Legacy Support

This project also supports alternative approaches as demo:

### Using copyrpc main Function
Execute via the `copyrpc` main function to get desired code.

### Using grpcrewrite Command
Transform generated client code using JavaScript commands:

```bash
# Path case
npm run grpcrewrite -- src/rpc/v1/greeter/greeter.client.ts

# Absolute path (recommended in production)
npm run grpcrewrite -- /absolute/path/to/client.ts
```

The generated code matches `copyrpc` output.

### Configuration Notes
- Requires `"type": "module"` in package.json as JavaScript modules
- Requires `"target": "ES2023"` in tsconfig.json with BigInt support

## 🔗 Related Links

- [vue3kratos Main Project](https://github.com/orzkratos/vue3kratos)
- [Kratos Framework](https://go-kratos.dev/)
- [@protobuf-ts/plugin](https://npmjs.com/package/@protobuf-ts/plugin)
- [@yyle88/grpt](https://npmjs.com/package/@yyle88/grpt)

---

💡 **Tip**: We recommend starting with `npm run demo:wise` to experience the complete function demonstration!