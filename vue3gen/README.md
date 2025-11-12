# Vue3Gen - Vue3 Client Code Generation

Auto Vue3 TypeScript client code generation that integrates the complete proto → gRPC TS → HTTP TS workflow.

## CHINESE README

[中文说明](README.zh.md)

## Features

- **Auto Generation**: Auto generate TypeScript gRPC clients from proto files
- **Client Conversion**: Convert gRPC clients to HTTP clients with web support
- **Workflow Integration**: Auto execute complete generate, sync, convert, cleanup flow
- **Pre-validation**: Check Makefile targets exist before execution to catch config issues upfront

## Workflow

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

## Quick Start

### 1. Build

```bash
# Build executable
go build -o vue3gen main.go

# Run via go
go run main.go
```

### 2. Run Generation

```bash
# Execute code generation
./vue3gen
```

Auto execute steps:
1. Locate demo1kratos project path
2. Check Makefile contains required targets
3. Generate TypeScript gRPC clients
4. Sync files to vue3kratos-demo1x project
5. Convert gRPC clients to HTTP clients
6. Cleanup temp files

## Requirements

### Project Structure
```
vue3kratos-demos/
├── demo1kratos/         # Kratos backend project
│   ├── api/            # Proto files
│   ├── Makefile        # Contains web_api_grpc_ts and web_api_cleanup targets
│   └── bin/            # Generated files output DIR
├── vue3kratos-demo1x/            # Vue3 frontend project
│   └── src/rpc/        # Client code output DIR
└── vue3gen/            # Code gen
    └── main.go
```

### Makefile Targets
demo1kratos project Makefile must contain:
- `web_api_grpc_ts`: Generate TypeScript gRPC clients
- `web_api_cleanup`: Cleanup temp files

### Go Dependencies
- [vue3kratos](https://github.com/orzkratos/vue3kratos) - gRPC to HTTP conversion
- [yyle88 packages](https://github.com/yyle88) - Path handling and checks

## Core Dependencies

```go
github.com/orzkratos/vue3kratos  // gRPC → HTTP conversion core
github.com/yyle88/runpath        // Smart path resolution
github.com/yyle88/osexec         // Command execution
github.com/yyle88/zaplog         // Logging output
```

## Execution Log Example

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

## Main Points

1. **Auto Path Find**: Use runpath to auto locate project DIR, no hardcoded paths
2. **Pre-check**: Check Makefile targets exist before execution to avoid mid-run issues
3. **Detailed Logs**: Each step has detailed log output to track progress
4. **Quick Abort**: Use must/rese pattern to expose exceptions at once

## Notes

- **Project Specific**: Hardcoded paths fit the demo project structure
- **Not Generic**: Logic is tailored to demo1kratos and vue3kratos-demo1x paths, not reusable
- **As Reference**: Adapt the logic to main.go/test files in own projects
- Auto clean previous generation output
- Must build demo1kratos Makefile targets first
- Generated code overwrites vue3kratos-demo1x/src/rpc DIR contents
- Recommend running when proto files change

## Related Projects

- [vue3kratos](https://github.com/orzkratos/vue3kratos) - Vue3 + Kratos integration
- [demo1kratos](https://github.com/orzkratos/vue3kratos-demos/tree/main/demo1kratos) - Kratos backend demo project
- [vue3kratos-demo1x](https://github.com/orzkratos/vue3kratos-demos/tree/main/vue3kratos-demo1x) - Vue3 frontend demo project

---

**Note**: Demo-specific code with hardcoded paths. Not intended as a generic solution. Adapt the logic to fit own projects.
