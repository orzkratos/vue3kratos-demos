package server

import (
	"github.com/go-kratos/kratos/v2/log"
	"github.com/go-kratos/kratos/v2/middleware/recovery"
	"github.com/go-kratos/kratos/v2/transport/http"
	v1 "github.com/orzkratos/demokratos/demo1kratos/api/helloworld/v1"
	"github.com/orzkratos/demokratos/demo1kratos/api/rpcboom"
	"github.com/orzkratos/demokratos/demo1kratos/api/rpcdemo"
	"github.com/orzkratos/demokratos/demo1kratos/api/rpcping"
	"github.com/orzkratos/demokratos/demo1kratos/internal/conf"
	"github.com/orzkratos/demokratos/demo1kratos/internal/service"
)

// NewHTTPServer new an HTTP server.
func NewHTTPServer(
	c *conf.Server,
	greeter *service.GreeterService,
	demoService *service.RpcdemoService,
	pingService *service.RpcpingService,
	boomService *service.RpcboomService,
	logger log.Logger,
) *http.Server {
	var opts = []http.ServerOption{
		http.Middleware(
			recovery.Recovery(),
		),
	}
	if c.Http.Network != "" {
		opts = append(opts, http.Network(c.Http.Network))
	}
	if c.Http.Addr != "" {
		opts = append(opts, http.Address(c.Http.Addr))
	}
	if c.Http.Timeout != nil {
		opts = append(opts, http.Timeout(c.Http.Timeout.AsDuration()))
	}
	srv := http.NewServer(opts...)
	v1.RegisterGreeterHTTPServer(srv, greeter)
	rpcdemo.RegisterRpcdemoHTTPServer(srv, demoService)
	rpcping.RegisterRpcpingHTTPServer(srv, pingService)
	rpcboom.RegisterRpcboomHTTPServer(srv, boomService)
	return srv
}
