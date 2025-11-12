package service

import (
	"context"

	v1 "github.com/orzkratos/demokratos/demo1kratos/api/helloworld/v1"
	pb "github.com/orzkratos/demokratos/demo1kratos/api/rpcboom"
	"google.golang.org/protobuf/types/known/emptypb"
)

type RpcboomService struct {
	pb.UnimplementedRpcboomServer
}

func NewRpcboomService() *RpcboomService {
	return &RpcboomService{}
}

func (s *RpcboomService) BoomUnknown(ctx context.Context, req *emptypb.Empty) (*emptypb.Empty, error) {
	return nil, v1.ErrorUnknown("unknown error boom")
}

func (s *RpcboomService) BoomNotFound(ctx context.Context, req *emptypb.Empty) (*emptypb.Empty, error) {
	return nil, v1.ErrorUserNotFound("user not found boom")
}

func (s *RpcboomService) BoomVague(ctx context.Context, req *emptypb.Empty) (*emptypb.Empty, error) {
	return nil, v1.ErrorGreeterUnspecified("greeter unspecified boom")
}

func (s *RpcboomService) BoomTxError(ctx context.Context, req *emptypb.Empty) (*emptypb.Empty, error) {
	return nil, v1.ErrorTxError("transaction error boom")
}

func (s *RpcboomService) BoomDbError(ctx context.Context, req *emptypb.Empty) (*emptypb.Empty, error) {
	return nil, v1.ErrorDbError("database error boom")
}
