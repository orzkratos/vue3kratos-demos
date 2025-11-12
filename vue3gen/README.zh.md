# Vue3Gen - Vue3 客户端代码生成

自动化 Vue3 TypeScript 客户端代码生成，整合 proto → gRPC TS → HTTP TS 完整工作流。

## 英文文档

[ENGLISH README](README.md)

## 功能特性

- **自动化生成**: 从 proto 文件自动生成 TypeScript gRPC 客户端
- **客户端转换**: 将 gRPC 客户端转换成 HTTP 客户端，支持网页环境
- **工作流集成**: 自动执行完整生成、同步、转换、清理流程
- **提前检查**: 执行前检查 Makefile 目标存在，提前发现配置问题

## 工作流程

```
Proto Files (demo1kratos/api/)
    ↓
Generate TypeScript gRPC Clients (make web_api_grpc_ts)
    ↓
Sync to Vue3 Project (vue3kratos-demo1x/src/rpc/)
    ↓
Convert to HTTP Clients (vue3kratos)
    ↓
Cleanup Temp Files (make web_api_cleanup)
```

## 快速使用

### 1. 构建

```bash
# 构建可执行文件
go build -o vue3gen main.go

# 通过 go 运行
go run main.go
```

### 2. 运行生成

```bash
# 执行代码生成
./vue3gen
```

自动执行步骤：
1. 定位 demo1kratos 项目路径
2. 检查 Makefile 包含必需的目标
3. 生成 TypeScript gRPC 客户端
4. 同步文件到 vue3kratos-demo1x 项目
5. 转换 gRPC 客户端为 HTTP 客户端
6. 清理临时文件

## 依赖要求

### 项目结构
```
vue3kratos-demos/
├── demo1kratos/         # Kratos 后端项目
│   ├── api/            # Proto 文件
│   ├── Makefile        # 包含 web_api_grpc_ts 和 web_api_cleanup 目标
│   └── bin/            # 生成文件输出 DIR
├── vue3kratos-demo1x/            # Vue3 前端项目
│   └── src/rpc/        # 客户端代码输出 DIR
└── vue3gen/            # 代码生成
    └── main.go
```

### Makefile 目标
demo1kratos 项目的 Makefile 必须包含：
- `web_api_grpc_ts`: 生成 TypeScript gRPC 客户端
- `web_api_cleanup`: 清理临时文件

### Go 依赖
- [vue3kratos](https://github.com/orzkratos/vue3kratos) - gRPC 到 HTTP 转换
- [yyle88 工具包](https://github.com/yyle88) - 路径处理和检查

## 核心依赖

```go
github.com/orzkratos/vue3kratos  // gRPC → HTTP 转换核心
github.com/yyle88/runpath        // 智能路径解析
github.com/yyle88/osexec         // 命令执行
github.com/yyle88/zaplog         // 日志输出
```

## 执行日志示例

```
=== Vue3 Client Code Gen Start ===
Located demo1kratos project: /path/to/demo1kratos
✅ Makefile targets verified
Generating TypeScript gRPC clients to: /path/to/bin/web_api_grpc_ts.out
Cleaning previous output...
✅ TypeScript gRPC clients generated
Syncing files to vue3kratos-demo1x project: /path/to/vue3kratos-demo1x/src/rpc
✅ Sync complete
Converting gRPC clients to HTTP clients...
✅ Conversion done
Cleaning up temp files...
✅ Cleanup done
=== TASKS FINISHED SUCCESS! ===
```

## 主要特点

1. **路径自动查找**: 使用 runpath 自动定位项目 DIR，无需硬编码路径
2. **提前检查**: 执行前检查 Makefile 目标，避免运行到一半才失败
3. **详细日志**: 每个步骤都有详细的日志输出，便于跟踪进度
4. **快速中止**: 使用 must/rese 模式，确保异常立即暴露

## 注意事项

- **项目专用**: 硬编码路径，仅适配演示项目结构
- **不具备通用性**: 逻辑针对 demo1kratos 和 vue3kratos-demo1x 路径定制，无法复用
- **作为参考**: 改造代码逻辑到自己的 main.go 或 test 文件中使用
- 自动清理之前的生成输出
- 必须先构建 demo1kratos 的 Makefile 目标
- 生成的代码会覆盖 vue3kratos-demo1x/src/rpc 目录内容
- 建议在 proto 文件变化时运行

## 相关项目

- [vue3kratos](https://github.com/orzkratos/vue3kratos) - Vue3 + Kratos 集成
- [demo1kratos](https://github.com/orzkratos/vue3kratos-demos/tree/main/demo1kratos) - Kratos 后端演示项目
- [vue3kratos-demo1x](https://github.com/orzkratos/vue3kratos-demos/tree/main/vue3kratos-demo1x) - Vue3 前端演示项目

---

**说明**: 演示专用代码，硬编码路径，不作为通用方案。欢迎改造逻辑到自己的项目中使用。
