package generate

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/orzkratos/demokratos/demo1kratos"
	"github.com/orzkratos/vue3kratos"
	"github.com/yyle88/eroticgo"
	"github.com/yyle88/must"
	"github.com/yyle88/osexec"
	"github.com/yyle88/osexistpath/osmustexist"
	"github.com/yyle88/rese"
)

//go:generate go test -v -run ^TestGenerateVue3Client$
func TestGenerateVue3Client(t *testing.T) {
	sourceRoot := demo1kratos.SourceRoot()
	t.Log(sourceRoot)

	clientRoot := filepath.Join(sourceRoot, "bin", "web_api_grpc_ts.out")
	t.Log(clientRoot)
	must.Done(os.RemoveAll(clientRoot))

	execConfig := osexec.NewExecConfig().WithPath(sourceRoot).WithDebug()
	out := rese.A1(execConfig.Exec("make", "web_api_grpc_ts"))
	t.Log(string(out))
	osmustexist.MustRoot(clientRoot)

	vue3kratos.GenGrpcViaHttpInRoot(clientRoot)

	eroticgo.GREEN.ShowMessage("vue3client code:", clientRoot, "generate success")
}
