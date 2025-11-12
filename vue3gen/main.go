package main

import (
	"bytes"
	"os"
	"path/filepath"

	"github.com/orzkratos/vue3kratos"
	"github.com/yyle88/done"
	"github.com/yyle88/must"
	"github.com/yyle88/osexec"
	"github.com/yyle88/osexistpath/osmustexist"
	"github.com/yyle88/rese"
	"github.com/yyle88/runpath"
	"github.com/yyle88/zaplog"
	"go.uber.org/zap"
)

func main() {
	zaplog.SUG.Infoln("=== Vue3 Client Code Gen Workflow Start ===")

	// Locate project roots
	// 定位项目根目录
	kratosRoot := runpath.PARENT.UpTo(1, "demo1kratos")
	frontendRoot := runpath.PARENT.UpTo(1, "vue3kratos-demo1x")
	zaplog.LOG.Debug("Project roots located", zap.String("backend", kratosRoot), zap.String("frontend", frontendRoot))

	// Execute complete workflow
	// 执行完整工作流
	runGenerate(kratosRoot, frontendRoot)

	zaplog.SUG.Infoln("=== WORKFLOW FINISHED SUCCESS! ===")
}

func runGenerate(kratosRoot string, frontendRoot string) {
	// Step 1: Validate backend project
	// 步骤 1: 验证后端项目
	zaplog.SUG.Infoln("📂 Backend project:", kratosRoot)
	osmustexist.ROOT(kratosRoot)

	// Step 2: Check Makefile exists and contains required targets
	// 步骤 2: 检查 Makefile 是否存在并包含所需目标
	makefilePath := filepath.Join(kratosRoot, "Makefile")
	osmustexist.FILE(makefilePath)

	makefileData := rese.A1(os.ReadFile(makefilePath))
	must.True(bytes.Contains(makefileData, []byte("web_api_grpc_ts:")))
	must.True(bytes.Contains(makefileData, []byte("web_api_cleanup:")))
	zaplog.SUG.Infoln("✅ Makefile targets verified")

	// Step 3: Generate TypeScript gRPC clients from proto files
	// 步骤 3: 从 proto 文件生成 TypeScript gRPC 客户端
	grpcTsOutput := filepath.Join(kratosRoot, "bin", "web_api_grpc_ts.out")
	zaplog.SUG.Infoln("🔨 Generating TypeScript gRPC clients...")
	zaplog.SUG.Infoln("   Output DIR:", grpcTsOutput)

	if osmustexist.IsRootExist(filepath.Join(kratosRoot, "bin")) {
		zaplog.SUG.Infoln("   Cleaning previous output...")
		done.Done(os.RemoveAll(grpcTsOutput))
	}

	rese.A1(osexec.ExecInPath(kratosRoot, "make", "web_api_grpc_ts"))
	osmustexist.ROOT(grpcTsOutput)
	zaplog.SUG.Infoln("✅ TypeScript gRPC clients generated")

	// Step 4: Sync generated files to frontend project
	// 步骤 4: 将生成的文件同步到前端项目
	zaplog.SUG.Infoln("📂 Frontend project:", frontendRoot)
	osmustexist.ROOT(frontendRoot)

	clientCodeDest := filepath.Join(frontendRoot, "src/rpc")
	osmustexist.ROOT(clientCodeDest)

	zaplog.SUG.Infoln("📦 Syncing generated files...")
	zaplog.SUG.Infoln("   From:", grpcTsOutput)
	zaplog.SUG.Infoln("   To:  ", clientCodeDest)
	vue3kratos.CloneFilesToDestRoot(grpcTsOutput, clientCodeDest)
	zaplog.SUG.Infoln("✅ File sync completed")

	// Step 5: Convert gRPC clients to HTTP clients
	// 步骤 5: 将 gRPC 客户端转换为 HTTP 客户端
	zaplog.SUG.Infoln("🔄 Converting gRPC clients to HTTP clients...")
	vue3kratos.GenGrpcViaHttpInRoot(clientCodeDest)
	zaplog.SUG.Infoln("✅ Conversion completed")

	// Step 6: Cleanup temp files
	// 步骤 6: 清理临时文件
	zaplog.SUG.Infoln("🧹 Cleaning up temp files...")
	rese.A1(osexec.ExecInPath(kratosRoot, "make", "web_api_cleanup"))
	zaplog.SUG.Infoln("✅ Cleanup completed")
}
