# Changes

## Overview

Sibling projects:

- [vue3gen](#vue3gen)
- [vue3kratos-demo1x](#vue3kratos-demo1x)

## Project Structures

### vue3gen

**Location**: [vue3gen](../vue3gen)

```bash
cd vue3gen && tree --noreport
```

```
.
|-- README.md
|-- README.zh.md
|-- go.mod
|-- go.sum
|-- main.go
`-- vue3gen
```

---

### vue3kratos-demo1x

**Location**: [vue3kratos-demo1x](../vue3kratos-demo1x)

```bash
cd vue3kratos-demo1x && tree --noreport
```

```
.
|-- Makefile
|-- README.md
|-- README.zh.md
|-- package-lock.json
|-- package.json
|-- src
|   |-- demo-boom.ts
|   |-- demo-crud.ts
|   |-- demo-epic.ts
|   |-- demo-ping.ts
|   |-- demo-wise.ts
|   `-- rpc
|       |-- google
|       |   |-- api
|       |   |   |-- field_behavior.ts
|       |   |   |-- http.ts
|       |   |   `-- httpbody.ts
|       |   `-- protobuf
|       |       |-- any.ts
|       |       |-- descriptor.ts
|       |       |-- empty.ts
|       |       `-- wrappers.ts
|       |-- helloworld
|       |   `-- v1
|       |       |-- error_reason.ts
|       |       |-- greeter.client.ts
|       |       `-- greeter.ts
|       |-- rpcboom
|       |   |-- rpcboom.client.ts
|       |   `-- rpcboom.ts
|       |-- rpcdemo
|       |   |-- rpcdemo.client.ts
|       |   `-- rpcdemo.ts
|       `-- rpcping
|           |-- rpcping.client.ts
|           `-- rpcping.ts
`-- tsconfig.json
```

