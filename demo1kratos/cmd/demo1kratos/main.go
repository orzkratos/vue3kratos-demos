package main

import (
	"flag"
	"os"

	"github.com/go-kratos/kratos/v2"
	"github.com/go-kratos/kratos/v2/config"
	"github.com/go-kratos/kratos/v2/config/file"
	"github.com/go-kratos/kratos/v2/encoding/json"
	"github.com/go-kratos/kratos/v2/log"
	"github.com/go-kratos/kratos/v2/middleware/tracing"
	"github.com/go-kratos/kratos/v2/transport/grpc"
	"github.com/go-kratos/kratos/v2/transport/http"
	"github.com/orzkratos/demokratos/demo1kratos/internal/conf"
	"github.com/orzkratos/errkratos/newerk"
	"github.com/yyle88/done"
	"github.com/yyle88/must"
	"github.com/yyle88/rese"
)

// go build -ldflags "-X main.Version=x.y.z"
var (
	// Name is the name of the compiled software.
	Name string
	// Version is the version of the compiled software.
	Version string
	// flagconf is the config flag.
	flagconf string
)

func init() {
	flag.StringVar(&flagconf, "conf", "./configs", "config path, eg: -conf config.yaml")

	// Configure JSON field naming style for HTTP responses
	// UseProtoNames=true uses exact proto field names, UseProtoNames=false uses lowerCamelCase
	// Recommended to keep default false to work across different languages
	// This avoids extra configuration in other language clients
	//
	// 配置 HTTP 响应的 JSON 字段命名风格
	// UseProtoNames=true 使用 proto 定义的原始字段名，UseProtoNames=false 使用小写驼峰命名
	// 推荐保持默认 false 以确保跨语言兼容性
	// 这样可以避免在其他语言客户端中进行额外配置
	json.MarshalOptions.UseProtoNames = false // Use lowerCamelCase to work across different languages // 使用小写驼峰命名确保跨语言兼容性

	// Set UseEnumNumbers to true to serialize enums as numbers instead of strings
	// This matches TypeScript generated code from proto, ensuring frontend works correct
	// Frontend receives numeric enum values that match proto definitions
	//
	// 设置 UseEnumNumbers 为 true 使枚举序列化为数字而非字符串
	// 这与 proto 生成的 TypeScript 代码保持一致，确保前端兼容性
	// 前端接收的枚举数值与 proto 定义匹配
	json.MarshalOptions.UseEnumNumbers = true // Return enums as numbers to match TypeScript generated code // 返回枚举数字以匹配 TypeScript 生成代码

	// Set metadata field name to pass numeric enum value to frontend
	// Kratos error reason is string, but frontend TypeScript uses numeric enum
	// This field bridges the gap by storing numeric value in error metadata
	//
	// 设置 metadata 字段名用于传递枚举数值给前端
	// Kratos 错误 reason 是字符串，但前端 TypeScript 使用数字枚举
	// 此字段通过在错误 metadata 中存储数值来桥接这个差异
	newerk.SetReasonCodeFieldName("numeric_reason_code_enum") // Store numeric error code for frontend enum matching // 存储数字错误码以匹配前端枚举
}

func newApp(logger log.Logger, gs *grpc.Server, hs *http.Server) *kratos.App {
	return kratos.New(
		kratos.ID(done.VCE(os.Hostname()).Omit()),
		kratos.Name(Name),
		kratos.Version(Version),
		kratos.Metadata(map[string]string{}),
		kratos.Logger(logger),
		kratos.Server(
			gs,
			hs,
		),
	)
}

func main() {
	flag.Parse()
	logger := log.With(log.NewStdLogger(os.Stdout),
		"ts", log.DefaultTimestamp,
		"caller", log.DefaultCaller,
		"service.id", kratos.ID(done.VCE(os.Hostname()).Omit()),
		"service.name", Name,
		"service.version", Version,
		"trace.id", tracing.TraceID(),
		"span.id", tracing.SpanID(),
	)
	c := config.New(
		config.WithSource(
			file.NewSource(flagconf),
		),
	)
	defer rese.F0(c.Close)

	must.Done(c.Load())

	var cfg conf.Bootstrap
	must.Done(c.Scan(&cfg))

	app, cleanup := rese.V2(wireApp(cfg.Server, cfg.Data, logger))
	defer cleanup()

	// start and wait for stop signal
	must.Done(app.Run())
}
